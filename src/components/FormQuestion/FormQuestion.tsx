import cls from "./Form.module.css";
import { OPTIONS_LEVELS_VALUE } from "../../constants";
import { Select } from "../Select/Select";
import { Button } from "../Button/Button";
import { FormState } from "../../types/types";

interface FormQuestionProps {
  formAction: (formData: FormData) => void,
  formState: FormState,
  isPending: boolean,
  submitBtnText: string,
}

export const FormQuestion = ({
  formAction,
  formState,
  isPending,
  submitBtnText,
}: FormQuestionProps) => {

  return (
    <form action={formAction} className={cls.form}>
      <input type="text" name="questionId" defaultValue={formState.id} hidden />
      <div className={cls.formControl}>
        <label htmlFor="questionField">Question</label>
        <textarea
          defaultValue={formState.question?.question}
          name="question"
          id="questionField"
          cols={30}
          rows={2}
          required
          placeholder="Please enter question"></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor="answerField">Short answer:</label>
        <textarea
          defaultValue={formState.answer}
          name="answer"
          id="answerField"
          cols={30}
          rows={2}
          required
          placeholder="Please enter a shoer answer"></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor="descriptionField">Description:</label>
        <textarea
          defaultValue={formState.description}
          name="description"
          id="descriptionField"
          cols={30}
          rows={5}
          required
          placeholder="Please enter a full description"></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor="ResoursesField">Resourses:</label>
        <textarea
          defaultValue={formState.resources}
          name="resources"
          id="ResoursesField"
          cols={30}
          rows={5}
          required
          placeholder="Please enter a resourses separated a commas"></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor="levelField">Level:</label>
        <Select
          id="levelField"
          name="level"
          options={OPTIONS_LEVELS_VALUE}
          defaultValue={formState.level}></Select>
      </div>
      <label htmlFor="clearFormField" className={cls.clearFormControl}>
        <input
          className={cls.checkbox}
          type="checkbox"
          name="clearForm"
          id="clearFormField"
          defaultChecked={formState.clearForm}
        />
        <span>Clear form after submitting?</span>
      </label>
      <Button isDisabled={isPending}>{submitBtnText}</Button>
    </form>
  );
};
