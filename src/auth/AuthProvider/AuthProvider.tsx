import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { AUTH_STORAGE } from "../../constants";

// Интерфейс для контекста
interface AuthContextType {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

// Интерфейс для пропсов провайдера
interface AuthProviderProps {
  children: ReactNode;
}

// Создаем контекст с правильным типом и начальным значением
export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => { } // заглушка
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Безопасное получение из localStorage
  const storedAuth = localStorage.getItem(AUTH_STORAGE);
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : false;

  const [isAuth, setIsAuth] = useState<boolean>(initialAuth);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};