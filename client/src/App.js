import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Routes from "./routes/index";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <Routes />
      </CacheProvider>
    </ThemeProvider>
  );
}

export default App;
