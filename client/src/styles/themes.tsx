/* 
    The purpose of this file is to integrate all themes in one place 
    and use in ThemeProvider at the root of the app layout.
*/
import { Mode } from "../logic/types";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// Wrapper for the function in order to pass type and app parameter.
// Requires defining 'const theme' in components which make use of it. See Layout.tsx
const createTheme = (type: Mode, appId: string) => {
  // Define common elements used in all themes
  const common = {
    // Needed to define thinner breakpoints than the default ones to assure nice layout for tiles
    // See client/src/logic/materialUITypes.tsx for module augmentation.
    // See here for more info on material-ui breakpoints: https://material-ui.com/customization/breakpoints/
    breakpoints: {
      values: {
        xs: 0,
        sm: 480,
        md: 736,
        lg: 980,
        xl: 1280,
        xxl: 1690,
      },
    },
    palette: {
      type: type,
      error: {
        light: "#C71F37",
        main: "#B21E35",
        dark: "#6E1423",
        contrastText: "rgba(255, 255, 255, .87)",
      },
      info: {
        light: "#97ACD1",
        main: "#6A7CA9",
        dark: "#374872",
        contrastText: "rgba(255, 255, 255, .87)",
      },
      success: {
        light: "#007200",
        main: "#006400",
        dark: "#004B23",
        contrastText: "#rgba(0, 0, 0, 0.87)",
      },
    },
    typography: {
      fontSize: 13,
      h1: {
        "@media (max-width:960px)": {
          fontSize: "3.25rem",
        },
        "@media (max-width:600px)": {
          fontSize: "2.25rem",
        },
      },
      h2: {
        "@media (max-width:960px)": {
          fontSize: "2.75rem",
        },
        "@media (max-width:600px)": {
          fontSize: "1.75rem",
        },
      },
    },
    fontSizes: {
      primary: "3.25vh",
      secondary: "2.75vh",
      tertiary: "2.5vh",
      quaternary: "2.25vh",
      quinary: "2vh",
      senary: "1.75vh",
      septonary: "1.5vh",
      octonary: "1.25vh",
    },
  };

  // Need For Speed theme
  const themeNFS = {
    palette: {
      ...common.palette,
      primary: {
        light: "#000000",
        main: "#F72585",
        dark: "#000000",
        contrastText: "rgba(255, 255, 255, .87)",
      },
      secondary: {
        light: "#000000",
        main: "#2D00F7",
        dark: "#000000",
        contrastText: "rgba(255, 255, 255, .60)",
      },
      common: {
        black: "#000",
        white: "#fff",
      },
      background: {
        paper: type === "dark" ? "#272727" : "#F8F8F8",
        default: type === "dark" ? "#000000" : "#F4F4F4",
      },
      text: {
        primary: type === "dark" ? "rgba(255, 255, 255, 0.87)" : "#000000",
        secondary: type === "dark" ? "rgba(255, 255, 255, 0.60)" : "#000000",
        disabled: "rgba(0, 0, 0, 0.38)",
        hint: "rgba(0, 0, 0, 0.38)",
      },
    },
    typography: {
      ...common.typography,
      fontFamily: ["Open Sans", "Arial"].join(","),
    },
  };

  // Solar System theme
  const themeSS = {
    palette: {
      ...common.palette,
      primary: {
        light: "#343A40",
        main: "#000000",
        dark: "#000000",
        contrastText: "#F1FAEE",
      },
      secondary: {
        light: "#4895EF",
        main: "#4361EE",
        dark: "#3F37C9",
        contrastText: "#F1FAEE",
      },
      common: {
        black: "#000",
        white: "#fff",
      },
      background: {
        paper: type === "dark" ? "#272727" : "#F8F8F8",
        default: type === "dark" ? "#000000" : "#F4F4F4",
      },
      text: {
        primary: type === "dark" ? "rgba(255, 255, 255, 0.87)" : "#000000",
        secondary: type === "dark" ? "rgba(255, 255, 255, 0.60)" : "#495057",
        disabled: "rgba(0, 23, 79, 0.38)",
        hint: "rgba(0, 0, 0, 0.38)",
      },
    },
    typography: {
      ...common.typography,
      fontFamily: ["Goldman-Regular", "Open Sans", "Arial"].join(
        ","
      ),
    },
  };

  // Default uses the same colors as CK, only the font is different
  const themeDefault = {
    palette: {
      ...common.palette,
      primary: {
        light: "#000000",
        main: "#000000",
        dark: "#000000",
        contrastText: "rgba(255, 255, 255, .87)",
      },
      secondary: {
        light: "#3C096C",
        main: "#240046",
        dark: "#10002B",
        contrastText: "rgba(255, 255, 255, .60)",
      },
      common: {
        black: "#000",
        white: "#fff",
      },
      background: {
        paper: type === "dark" ? "#3C096C" : "#ffffff",
        default: type === "dark" ? "#10002B" : "#fafafa",
      },
      text: {
        primary: type === "dark" ? "rgba(255, 255, 255, 0.87)" : "#000000",
        secondary: type === "dark" ? "rgba(255, 255, 255, 0.60)" : "#7195A8",
        disabled: "rgba(0, 0, 0, 0.38)",
        hint: "rgba(0, 0, 0, 0.38)",
      },
    },
    typography: {
      ...common.typography,
      fontFamily: ["Open Sans", "Arial"].join(","),
    },
  };

  // Add responsive font sizes and create theme based on selected app
  // If app other than 'SS' or 'NFS' (for example 'undefined'), set DEFAULT theme
  const theme =
    appId === "solar-system"
      ? themeSS
      : appId === "need-for-speed"
      ? themeNFS
      : themeDefault;

  return responsiveFontSizes(
    createMuiTheme({
      breakpoints: {
        ...common.breakpoints,
      },
      fontSizes: {
        ...common.fontSizes,
      },
      ...theme,
    })
  );
};

const fontSizes = {
  primary: "3.25vh",
  secondary: "2.75vh",
  tertiary: "2.5vh",
  quaternary: "2.25vh",
  quinary: "2vh",
  senary: "1.75vh",
  septonary: "1.5vh",
  octonary: "1.25vh",
};

export { createTheme, fontSizes };
