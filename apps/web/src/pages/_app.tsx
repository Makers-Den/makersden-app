import type { AppProps } from "next/app";
import "../styles/global.css";
import { api } from "../utils/api";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default api.withTRPC(MyApp);
