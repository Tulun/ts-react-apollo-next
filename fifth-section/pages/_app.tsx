import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useApollo } from "../lib/client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initializeApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
