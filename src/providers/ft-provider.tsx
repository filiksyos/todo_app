'use client';

import { PropsWithChildren, useCallback } from "react";
import dynamic from 'next/dynamic';

import type { createWeb3ProviderEvmKeyStore } from "@chromia/ft4";
import { useAccount } from "wagmi";

import { useEthereumProvider } from "@/hooks/use-ethereum-provider";
import { generateClientConfig } from "@/utils/generate-client-config";

// Dynamically import FtProvider with no SSR to avoid Node.js modules in client
const FtProviderChromia = dynamic(
  () => import('@chromia/react').then(mod => mod.FtProvider),
  { ssr: false }
);

const config = generateClientConfig();

// This needs to be a client component because it uses hooks
export function FtProvider({ children }: PropsWithChildren) {
  const ethProvider = useEthereumProvider();
  const getEthereumProvider = useCallback(() => {
    return ethProvider;
  }, [ethProvider]);

  return (
    <FtProviderChromia
      useEthereumProvider={
        getEthereumProvider as () => Promise<
          Parameters<typeof createWeb3ProviderEvmKeyStore>[0]
        >
      }
      useAccount={useAccount}
      defaultClientConfig={config}
    >
      {children}
    </FtProviderChromia>
  );
}
