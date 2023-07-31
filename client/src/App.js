import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@mui/styles";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Routes from "./routes/index";

const jss = create({ plugin: [...jssPreset().plugins, rtl()] });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <Routes />
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
