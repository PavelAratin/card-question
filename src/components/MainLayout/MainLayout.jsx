import { Outlet } from "react-router-dom";
import cls from "./MainLayout.module.css";
import { Header } from "../Header";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import { Loader } from "../Loader";

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className={cls.mainLayout}>
        <Header></Header>
        <div className={cls.mainWrapper}>
          <main className={cls.main}>
            <Suspense fallback={<Loader></Loader>}>
              <Outlet></Outlet>
            </Suspense>
          </main>
          <footer className={cls.footer}>
            react question Card Application | {currentYear}
            <br></br>
            by Aratin Pavel
          </footer>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};
