import type { AppProps } from "next/app";
import { ThemeProvider } from "ui";
import { api } from "../utils/api";
import { ContentWrapper } from "ui/src/components/ContentWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider isSSR>
      <ContentWrapper>
        <Component {...pageProps} />
      </ContentWrapper>
    </ThemeProvider>
  );
}

export default api.withTRPC(MyApp);
