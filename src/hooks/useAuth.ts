import { useContext, Dispatch, SetStateAction } from "react"
import { AuthContext } from "../auth/AuthProvider"

interface AuthContextType {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Контекст не обнаружен")
  }
  return (
    context
  )
}