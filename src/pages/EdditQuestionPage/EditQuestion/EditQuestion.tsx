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
import { FormState, QuestionsType } from "../../../types/types";

interface EditQuestionProps {
  initialState?: FormState & { id?: string }; // Добавляем id к типу
}

const editCardAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
  {
    try {
      await delayFn();
      const newQuestion = Object.fromEntries(formData) as FormState;
      const resources = newQuestion.resources?.trim();
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
          resources: resources?.length ? resources.split(",") : [],
          level: Number(newQuestion.level),
          completed: false,
          editDate: dateFormat(new Date()),
        }),
      });
      if (response.status === 404) {
        throw new Error(response.statusText);
      }

      const question: QuestionsType = await response.json();
      toast.success("New question is edited successfully created");
      return isClearForm ? {} : { question };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(errorMessage);
      return {};
    }
  }
};


const EditQuestion = ({ initialState = {} }: EditQuestionProps) => {
  const navigate = useNavigate();
  const [formState, formAction, isPending] = useActionState(editCardAction, {
    ...initialState,
    clearForm: false,
  });

  const [removeQuestion, isQuestionRemoving] = useFetch(async () => {

    // Добавляем проверку на наличие id
    if (!initialState.id) {
      toast.error("Question ID is missing");
      return;
    }

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
