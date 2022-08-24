import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/emotion_cache/createEmotionCache";
import theme from "../themes/theme";
import AppBar from "../components/appbar/AppBar";
// import Footer from "../components/footer/Footer";

// Client-side cache shared for the whole session
// of the user in the browser.
import { Provider } from "../contexts/user-context/UserContext";
import LoginChecker from "../components/LoginChecker";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <Provider>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>CCRT Clinic</title>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="description" content="dummy" />
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar />

          <LoginChecker>
            {/* <Grid container style={{ minHeight: "100vh" }}> */}
            <Component {...pageProps} />
            {/* </Grid> */}
          </LoginChecker>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
