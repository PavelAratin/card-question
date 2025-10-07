import { API_URL } from "../../constants";
import cls from "./AddQuestionPage.module.css";
import { useActionState } from "react";
import { delayFn } from "../../helpers/delayFn";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader/Loader";
import { FormQuestion } from "../../components/FormQuestion";
import { FormState } from "../../types/types";

const createCardAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
  {
    try {
      await delayFn();
      const newQuestion = Object.fromEntries(formData) as FormState;
      const resources = newQuestion.resources?.trim();
      const isClearForm = newQuestion.clearForm;

      const response = await fetch(`${API_URL}/react`, {
        method: "POST",
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
          editDate: undefined,
        }),
      });
      if (response.status === 404) {
        throw new Error(response.statusText);
      }

      const question = response.json();
      toast.success("New question is successfully created");
      return isClearForm ? {} : question;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error(errorMessage);
      return {};
    }
  }
};

const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(createCardAction, {
    clearForm: true,
  });

  return (
    <>
      {isPending && <Loader></Loader>}
      <h1 className={cls.formTitle}>add newquestion</h1>
      <div className={cls.formContainer}>
        <FormQuestion
          formState={formState}
          formAction={formAction}
          isPending={isPending}
          submitBtnText="Add question"></FormQuestion>
      </div>
    </>
  );
};

export default AddQuestionPage;
