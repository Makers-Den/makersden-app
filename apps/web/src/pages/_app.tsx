import type { AppProps } from "next/app";
import { ContentWrapper } from "ui/src/components/ContentWrapper";
import { ThemeProvider } from "ui/src/components/providers/ThemeProvider";

import { api } from "../utils/api";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider isSSR>
    <ContentWrapper>
      <Component {...pageProps} />
    </ContentWrapper>
  </ThemeProvider>
);

export default api.withTRPC(MyApp);
