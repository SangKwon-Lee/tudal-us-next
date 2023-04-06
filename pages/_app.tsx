import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import Layout from "../src/commons/layout";
import { Provider } from "react-redux";
import { global } from "../src/commons/styles/GlobalStyles";
import { store } from "../src/store";
import Script from "next/script";
import { ReactElement, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import * as ga from "../src/commons/googleTag/index";
import { NextPage } from "next";
import { muiTheme } from "../src/commons/theme";
import { ThemeProvider } from "@mui/material";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-P6956RH3Z6"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-P6956RH3Z6', {
page_path: window.location.pathname,
});
`,
        }}
      />
      <Provider store={store}>
        <ThemeProvider theme={muiTheme}>
          <Global styles={global} />
          <NextNProgress
            color={"#ffa8b5"}
            startPosition={0.3}
            stopDelayMs={100}
            height={3}
            showOnShallow={true}
            options={{ easing: "ease", speed: 500 }}
          />
          <Toaster position="top-center" />
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        </ThemeProvider>
      </Provider>
    </>
  );
}
