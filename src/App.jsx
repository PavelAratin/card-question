import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage";
import { AddQuestionPageLazy } from "./pages/AddQuestionPage";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import ForbiddenPage from "./pages/ForbiddenPage/ForbiddenPage";
import { EdditQuestionPageLazy } from "./pages/EdditQuestionPage";
import { ThemeProvider } from "./theme/ThemeProvider";

const ProtectedRoutes = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  return isAuth ? (
    <Outlet></Outlet>
  ) : (
    <Navigate
      to="/forbidden"
      state={{ from: location.pathname }}
      replace></Navigate>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout></MainLayout>}>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              <Route
                path="/forbidden"
                element={<ForbiddenPage></ForbiddenPage>}></Route>

              <Route element={<ProtectedRoutes></ProtectedRoutes>}>
                <Route
                  path="/addquestion"
                  element={<AddQuestionPageLazy></AddQuestionPageLazy>}></Route>
                <Route
                  path="/editquestion/:id"
                  element={
                    <EdditQuestionPageLazy></EdditQuestionPageLazy>
                  }></Route>
              </Route>

              <Route
                path="/question/:id"
                element={<QuestionPage></QuestionPage>}></Route>

              <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
