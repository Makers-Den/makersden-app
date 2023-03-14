import "../styles/global.css";

import { ThemeProvider } from "@md/ui/src/components/providers/ThemeProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { api } from "../utils/api";

const MakersDenApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Makers&apos; Den App</title>
      </Head>
      <ThemeProvider isSSR>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MakersDenApp);
