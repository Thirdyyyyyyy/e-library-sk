import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Providers from "./providers";
import Head from "next/head";
// import { Provider } from "react-redux";
// import { store } from "../redux-store/store";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      {/* <Provider store={store}> */}
        <Providers>
          <Head>
            <title>SK Cannery Site</title>
            <meta name="description" content="SK Cannery Site App" />
            <link rel="icon" href="/SKLogo.png" />
          </Head>
          <Component {...pageProps} />
        </Providers>
      {/* </Provider> */}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
