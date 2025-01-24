"use client";

import { PropsWithChildren } from "react";

import NiceModal from "@ebay/nice-modal-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { WagmiProvider } from "wagmi";

import { config } from "../wagmi-config";
import { FtProvider } from "./ft-provider";
import ClientStyles from "./styles-provider";

const queryClient = new QueryClient();

export function Providers(props: PropsWithChildren) {
  return (
    <ClientStyles>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>
            <FtProvider>
              <NiceModal.Provider>{props.children}</NiceModal.Provider>
            </FtProvider>
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ClientStyles>
  );
}
