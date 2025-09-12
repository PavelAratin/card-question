import cls from "./Button.module.css";

export const Button = ({ onClick, isDisabled, children, isActive }) => {
  return (
    <button
      className={`${cls.btn} ${isActive ? cls.active : ""}`}
      onClick={onClick}
      disabled={isDisabled}>
      {children}
    </button>
  );
};
