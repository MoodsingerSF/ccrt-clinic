import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../themes/theme";
import AppBar from "../components/appbar/AppBar";
import { Provider } from "../contexts/user-context/UserContext";
import { Provider as LoginPromptProvider } from "../contexts/LoginPromptContext";

import LoginChecker from "../components/LoginChecker";
import MyErrorBoundary from "../components/MyErrorBoundary";
import LoginPromptComp from "../components/misc/LoginPromptComp";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const memoizedTheme = React.useMemo(() => createTheme(theme), []);
  return (
    <Provider>
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

      <ThemeProvider theme={memoizedTheme}>
        <LoginPromptProvider>
          <MyErrorBoundary>
            <>
              <LoginPromptComp />
              <CssBaseline />

              <AppBar />

              <LoginChecker>
                <Component {...pageProps} />
              </LoginChecker>
            </>
          </MyErrorBoundary>
        </LoginPromptProvider>
      </ThemeProvider>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
