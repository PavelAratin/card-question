import { ReactNode } from "react";
import cls from "./Button.module.css";

interface ButtonProps { onClick?: () => void, isDisabled?: boolean, children: ReactNode, isActive?: boolean }

export const Button = ({ onClick, isDisabled, children, isActive }: ButtonProps) => {
  return (
    <button
      className={`${cls.btn} ${isActive ? cls.active : ""}`}
      onClick={onClick}
      disabled={isDisabled}>
      {children}
    </button>
  );
};
