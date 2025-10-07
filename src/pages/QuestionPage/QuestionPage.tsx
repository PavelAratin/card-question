import cls from "./QuestionPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { useEffect, useId, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../constants";
import { Loader, SmallLoader } from "../../components/Loader";
import { useAuth } from "../../hooks/useAuth";
import { ExtendedQuestionsType } from "../../types/types";

export const QuestionPage = () => {
  const { isAuth } = useAuth();
  const checkboxId = useId();
  const navigate = useNavigate();
  const params = useParams();
  const [isChecked, setIsCheked] = useState<boolean>(false);
  const [card, setCard] = useState<ExtendedQuestionsType | null>(null);

  const levelVariant = (): "primary" | "warning" | "alert" => {
    if (!card) return "primary"; // Защита от null
    return card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert";
  };

  const completedVariant = (): "success" | "primary" => {
    if (!card) return "primary"; // Защита от null
    return card.completed ? "success" : "primary"
  };

  const [fetchCard, isCardLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${params.id}`);
    const questionData = await response.json();
    setCard(questionData);
    return questionData;
  });

  const [updateCard, isCardUpdating] = useFetch(async (isChecked: boolean) => {
    const response = await fetch(`${API_URL}/react/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: isChecked }),
    });
    const questionData = await response.json();
    setCard(questionData);
    return questionData;
  });

  useEffect(() => {
    fetchCard();
  }, []);
  const onCheckBoxHandler = (): void => {
    setIsCheked(!isChecked);
    updateCard(!isChecked);
  };
  return (
    <>
      {isCardLoading && <Loader></Loader>}
      {card !== null && (
        <div className={cls.container}>
          <div className={cls.cardLabels}>
            <Badge variant={levelVariant()}>level:{card.level}</Badge>
            <Badge variant={completedVariant()}>
              {card.completed ? "Completed" : "Non Completed"}
            </Badge>
            {card?.editDate && (
              <p className={cls.editDte}>Edited:{card.editDate.toString()}</p>
            )}
          </div>
          <h5 className={cls.cardTitle}>{card.question}</h5>
          <p className={cls.cardDescription}>{card.description}</p>
          <div className={cls.cardAnswers}>
            <label htmlFor="">short answer:</label>
            <p className={cls.cardAnswer}>{card.answer}</p>
          </div>
          <ul className={cls.cardLinks}>
            Resouces:
            {card.resources.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link.trim()} target="_blank" rel="noreferrer">
                    {link.trim()}
                  </a>
                </li>
              );
            })}
          </ul>
          <label htmlFor="checkboxId" className={cls.cardCheckbox}>
            <input
              type="checkbox"
              id={checkboxId}
              className={cls.checkbox}
              checked={isChecked}
              onChange={onCheckBoxHandler}
              disabled={isCardUpdating}></input>
            <span>mark question as comleted</span>
            {isCardUpdating && <SmallLoader></SmallLoader>}
          </label>
          {isAuth && (
            <Button
              onClick={() => navigate(`/editquestion/${card.id}`)}
              isDisabled={isCardUpdating}>
              Edit
            </Button>
          )}
          <Button onClick={() => navigate("/")} isDisabled={isCardUpdating}>
            Back
          </Button>
        </div>
      )}
    </>
  );
};
