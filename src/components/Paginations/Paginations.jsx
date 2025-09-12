import { Button } from "../Button";
import cls from "./Paginations.module.css";

export const Paginations = (props) => {
  const getActivePageNumber = () => {
    return props.questions.next === null
      ? props.questions.last
      : props.questions.next - 1;
  };
  return (
    <div className={cls.paginationContainer} onClick={props.onClick}>
      {props.pagination.map((value) => {
        return (
          <Button key={value} isActive={value === getActivePageNumber()}>
            {value}
          </Button>
        );
      })}
    </div>
  );
};
