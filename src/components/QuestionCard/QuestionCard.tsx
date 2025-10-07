import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import cls from "./QuestionCard.module.css";
import { Badge } from "../Badge";
import { ExtendedQuestionsType } from "../../types/types";

interface QuestionCardProps {
  card: ExtendedQuestionsType; // карточка передается как объект
}

export const QuestionCard = ({ card }: QuestionCardProps) => {
  const navigate = useNavigate();
  const levelVariant =
    card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert";
  const completedVariant = card.completed ? "success" : "primary";
  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <Badge variant={levelVariant}>level:{card.level}</Badge>
        <Badge variant={completedVariant}>
          {card.completed ? "Completed" : "Non Completed"}
        </Badge>
      </div>
      <h5 className={cls.cardTitle}>{card.question}</h5>
      <div className={cls.cardAnswers}>
        <label htmlFor="">short answer:</label>
        <p className={cls.cardAnswer}>{card.answer}</p>
      </div>
      <Button onClick={() => navigate(`/question/${card.id}`)}>View</Button>
    </div>
  );
};
