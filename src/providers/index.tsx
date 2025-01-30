"use client";

import { PropsWithChildren } from "react";

import NiceModal from "@ebay/nice-modal-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { ThemeProvider } from "next-themes";
import { WagmiProvider } from "wagmi";

import { FtProvider } from "./ft-provider";
import ClientStyles from "./styles-provider";
import { config } from "../wagmi-config";

const queryClient = new QueryClient();

export function Providers(props: PropsWithChildren) {
  return (
    <ClientStyles>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ConnectKitProvider>
              <FtProvider>
                <NiceModal.Provider>{props.children}</NiceModal.Provider>
              </FtProvider>
            </ConnectKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ThemeProvider>
    </ClientStyles>
  );
}
