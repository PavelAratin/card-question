import cls from "../EdditQuestionPage.module.css";
import { useActionState } from "react";
import { Loader } from "../../../components/Loader/Loader";
import { FormQuestion } from "../../../components/FormQuestion/FormQuestion";
import { delayFn } from "../../../helpers/delayFn";
import { dateFormat } from "../../../helpers/dateFormat";
import { API_URL } from "../../../constants";
import { toast } from "react-toastify";
import { useFetch } from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const editCardAction = async (_prevState, formData) => {
  console.log(formData);
  {
    try {
      await delayFn();
      const newQuestion = Object.fromEntries(formData);
      const resources = newQuestion.resources.trim();
      const questionId = newQuestion.questionId;
      const isClearForm = newQuestion.clearForm;

      const response = await fetch(`${API_URL}/react/${questionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Добавляем заголовок
        },
        body: JSON.stringify({
          question: newQuestion.question,
          answer: newQuestion.answer,
          description: newQuestion.description,
          resources: resources.length ? resources.split(",") : [],
          level: Number(newQuestion.level),
          completed: false,
          editDate: dateFormat(new Date()),
        }),
      });
      if (response.status === 404) {
        throw new Error(response.statusText);
      }

      const question = response.json();
      toast.success("New question is edited successfully created");
      return isClearForm ? {} : question;
    } catch (error) {
      toast.error(error.message);
      return {};
    }
  }
};

const EditQuestion = ({ initialState = {} }) => {
  const navigate = useNavigate();
  const [formState, formAction, isPending] = useActionState(editCardAction, {
    ...initialState,
    clearForm: false,
  });

  const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
    await fetch(`${API_URL}/react/${initialState.id}`, {
      method: "DELETE",
    });
    toast.success("New question is edited successfully deleted");
    navigate("/");
  });

  const onRemoveQuestionHandler = () => {
    const isRemove = confirm("Are you sure?");
    isRemove && removeQuestion();
  };

  return (
    <>
      {(isPending || isQuestionRemoving) && <Loader></Loader>}
      <h1 className={cls.formTitle}>Edit Question</h1>
      <div className={cls.formContainer}>
        <button
          className={cls.removeBtn}
          disabled={isPending || isQuestionRemoving}
          onClick={onRemoveQuestionHandler}>
          X
        </button>
        <FormQuestion
          formState={formState}
          formAction={formAction}
          isPending={isPending}
          submitBtnText="Edit question"></FormQuestion>
      </div>
    </>
  );
};

export default EditQuestion;
