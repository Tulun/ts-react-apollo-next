import { AppProps } from "next/dist/next-server/lib/router/router";
import { AppPropsType } from "next/dist/next-server/lib/utils";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
