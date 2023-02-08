import { ContentWrapper } from "@md/ui/src/components/ContentWrapper";
import { ThemeProvider } from "@md/ui/src/components/providers/ThemeProvider";
import type { AppProps } from "next/app";
import Head from "next/head";

import { api } from "../utils/api";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Makers&apos; Den App</title>
    </Head>
    <ThemeProvider isSSR>
      <ContentWrapper>
        <Component {...pageProps} />
      </ContentWrapper>
    </ThemeProvider>
  </>
);

export default api.withTRPC(MyApp);
