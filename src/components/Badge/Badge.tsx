import { ReactNode } from "react";
import cls from "./Badge.module.css";
interface Badge { variant: string, children: ReactNode }

export const Badge = ({ variant, children }: Badge) => {
  switch (variant) {
    case "primary":
      return <div className={`${cls.badge} ${cls.primary}`}>{children}</div>;
    case "success":
      return <div className={`${cls.badge} ${cls.success}`}>{children}</div>;
    case "warning":
      return <div className={`${cls.badge} ${cls.warning}`}>{children}</div>;
    case "alert":
      return <div className={`${cls.badge} ${cls.alert}`}>{children}</div>;
    default:
      return <div className={cls.badge}>{children}</div>;
  }
};
