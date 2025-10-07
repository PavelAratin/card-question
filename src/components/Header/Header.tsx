import { useNavigate } from "react-router-dom";
import ReactLogo from "../../assets/react.svg";
import { Button } from "../Button";
import cls from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";
import { AUTH_STORAGE } from "../../constants";
import { ThemeToogler } from "../../features";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useAuth();

  const loginHandler = (): void => {
    localStorage.setItem(AUTH_STORAGE, String(!isAuth));
    setIsAuth(!isAuth);
  };

  const logoClickhandler = (): void => {
    navigate("/")
  }

  const addClickHandler = (): void => {
    navigate("/addquestion")
  }
  return (
    <header className={cls.header}>
      <p onClick={logoClickhandler}>
        <img src={ReactLogo} alt="react logo" />
        <span>React Cards</span>
      </p>
      <div className={cls.headerButtons}>
        <ThemeToogler></ThemeToogler>
        {isAuth && (
          <Button onClick={addClickHandler}>add</Button>
        )}
        <Button onClick={loginHandler} isActive={!isAuth}>
          {isAuth ? "Logout" : "Login"}
        </Button>
      </div>
    </header>
  );
};
