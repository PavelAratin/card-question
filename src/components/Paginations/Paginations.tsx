import { PaginationType } from "../../types/types";
import { Button } from "../Button";
import cls from "./Paginations.module.css";

interface PaginationPropsType { onClick: (pageNumber: number) => void; pagination: Array<number>; questions: PaginationType }

export const Paginations = ({ onClick, pagination, questions }: PaginationPropsType) => {

  const getActivePageNumber = () => {
    return questions.next === null
      ? questions.last
      : questions.next - 1;
  };

  return (
    <div className={cls.paginationContainer}>
      {pagination.map((value) => {
        return (
          <Button key={value} isActive={value === getActivePageNumber()} onClick={() => onClick(value)}>
            {value}
          </Button>
        );
      })}
    </div>
  );
};
