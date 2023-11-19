import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { NextPage } from "next";
import { Auth0DataDogIntegration } from "../components/auth0-datadog";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@chakra-ui/pro-theme";
import "@fontsource/inter/variable.css";
import { useRouter } from "next/router";
import { useRouteChangeLoading } from "../state/loading";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, props: any) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { user } = pageProps;
  const { setLoading } = useRouteChangeLoading();
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
    const handleStart = (url: string) => {
      setLoading(true);
    };

    const handleStop = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router, setLoading]);

  useEffect(() => {
    datadogRum.init({
      applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID || "",
      clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || "",
      site: process.env.NEXT_PUBLIC_DATADOG_SITE || "",
      service: "internal-nextjs",
      env: process.env.NEXT_PUBLIC_ENV_NAME || "",
      version: process.env.NEXT_PUBLIC_DATADOG_VERSION || "",
      sampleRate: 100,
      sessionReplaySampleRate: 20,
      trackInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "allow",
    });

    datadogLogs.init({
      clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || "",
      site: process.env.NEXT_PUBLIC_DATADOG_SITE || "",
      service: "internal-nextjs",
      env: process.env.NEXT_PUBLIC_ENV_NAME || "",
      forwardErrorsToLogs: true,
      forwardConsoleLogs: "all",
      forwardReports: "all",
      sampleRate: 100,
    });
    datadogRum.startSessionReplayRecording();
  });
  return (
    <UserProvider user={user}>
      <Auth0DataDogIntegration>
        <ChakraProvider theme={theme}>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </ChakraProvider>
      </Auth0DataDogIntegration>
    </UserProvider>
  );
}
