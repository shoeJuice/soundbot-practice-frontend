import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import SocketProvider from "../context/sockets.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <NotificationsProvider position="bottom-right">
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;
