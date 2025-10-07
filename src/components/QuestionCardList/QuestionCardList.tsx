import { memo } from "react";
import cls from "./QuestionCardList.module.css";
import { QuestionCard } from "../QuestionCard";
import { ExtendedQuestionsType } from "../../types/types";

interface QuestionCardListProps {
  cards: ExtendedQuestionsType[]
}

export const QuestionCardList = memo(({ cards }: QuestionCardListProps) => {
  return (
    <div className={cls.cardList}>
      {cards.map((card, index) => {
        return <QuestionCard card={card} key={index}></QuestionCard>;
      })}
    </div>
  );
});
