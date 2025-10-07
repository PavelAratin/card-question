import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import cls from "./ForbiddenPage.module.css";

const ForbiddenPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const fromPage = location.state?.from || "/";

  useEffect(() => {
    isAuth && navigate(fromPage, { replace: true });
  }, [isAuth]);

  return <h2 className={cls.title}>Page is Forbidden</h2>;
};

export default ForbiddenPage;
