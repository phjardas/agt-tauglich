import "@fontsource/roboto";
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import {
  deepPurple as primary,
  deepOrange as secondary,
} from "@mui/material/colors";
import { type ReactNode } from "react";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary,
    secondary,
    background: {
      default: "#f5f5f5",
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
  },
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { minHeight: "100vh" },
          body: { minHeight: "100vh" },
        }}
      />
      {children}
    </MuiThemeProvider>
  );
}
