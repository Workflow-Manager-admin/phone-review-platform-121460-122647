import {FC, ReactNode, createContext, useContext} from "react";

// Theme context interface and default values
interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

const theme: Theme = {
  primary: "#1976D2",
  secondary: "#424242",
  accent: "#FFC107",
  background: "#FFFFFF",
  surface: "#F5F5F5",
  text: "#222222",
};

const ThemeContext = createContext<Theme>(theme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: FC<{children: ReactNode}> = ({children}) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);
