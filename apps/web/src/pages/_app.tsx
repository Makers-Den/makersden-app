import "../styles/global.css";

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
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default api.withTRPC(MyApp);
