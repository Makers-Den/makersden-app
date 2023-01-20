import type { AppProps } from "next/app";
import { ThemeProvider } from "ui";
import { api } from "../utils/api";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider isSSR>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default api.withTRPC(MyApp);
