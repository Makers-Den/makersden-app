import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "ui/src/components/providers/ThemeProvider";
import { api } from "../utils/api";
import { ContentWrapper } from "ui/src/components/ContentWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Makers' Den App</title>
      </Head>
      <ThemeProvider isSSR>
        <ContentWrapper>
          <Component {...pageProps} />
        </ContentWrapper>
      </ThemeProvider>
    </>
  );
}

export default api.withTRPC(MyApp);
