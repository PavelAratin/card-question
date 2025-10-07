import { createContext, ReactNode, useLayoutEffect, useState, Dispatch, SetStateAction } from "react";
import { THEME_STORAGE } from "../constants";

// Интерфейс для контекста
interface ThemeContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

// Создаем контекст с правильным типом и начальным значением
export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => { } // заглушка
});

// export const ThemeContext = createContext(null);

interface ThemeProviderProps {
  children: ReactNode
}

// // Создаем контекст с правильным типом и начальным значением
// export const ThemContext = createContext<AuthContextType>({
//   theme: string,
//   setTheme: () => { } // заглушка
// });

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const savedTheme = localStorage.getItem(THEME_STORAGE) || "light";
  const [theme, setTheme] = useState<string>(savedTheme);

  useLayoutEffect(() => {
    const detectTheme = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) {
        setTheme("dark");
        document.body.classList.remove("darkLayout");
      } else {
        savedTheme === "dark" && document.body.classList.add("darkLayout");
        setTheme(savedTheme);
      }
    };
    detectTheme();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", detectTheme);
    return () => {
      mediaQuery.removeEventListener("change", detectTheme);
    };
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
