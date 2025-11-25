import { createTheme } from "@mantine/core";

const theme = createTheme({
  colors: {
    "pale-blue": [
      "#ecf4ff",
      "#dce4f5",
      "#b9c7e2",
      "#94a8d0",
      "#748dc0",
      "#5f7cb7",
      "#5474b4",
      "#44639f",
      "#3a5890",
      "#2c4b80"
    ],
    "deep-blue": [
      "#ecefff",
      "#d5dafb",
      "#a9b1f1",
      "#7a87e9",
      "#5362e1",
      "#3a4bdd",
      "#2c40dc",
      "#1f32c4",
      "#182cb0",
      "#0a259c"
    ],
     "dark": [
      "#c2c8d4",
      "#969eac",
      "#6c7484",
      "#474c56",
      "#222428",
      "#222428",
      "#1d1e21",
      "#17181a",
      "#121213",
      "#0c0c0d"
    ],
  },

  white: "#FFFAFA",
  black: "#1B1B1B",
  primaryColor: "dark",

  autoContrast: true,
  luminanceThreshold: 0.3,
  focusRing: "auto",
  defaultRadius: "md",
  fontFamily: "Lato, Open sans, Arial",
  fontFamilyMonospace: "Space mono, Consolas",
  scale: 1
});

export default theme