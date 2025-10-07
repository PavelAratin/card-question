import cls from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={cls.backdrop}>
      <div className={cls.loader}></div>
    </div>
  );
};

export const SmallLoader = () => {
  return <div className={cls.smallLoader}></div>;
};
