import { useCallback, useState } from "react";

import {
  AuthFlag,
  createSingleSigAuthDescriptorRegistration,
  registerAccount,
  registrationStrategy,
} from "@chromia/ft4";
import {
  createChromiaHooks,
  useEvmKeyStore,
  useFtAccounts,
  usePostchainClient,
} from "@chromia/react";
import { IClient } from "postchain-client";
import { useAccount } from "wagmi";

import { publicClientConfig as clientConfig } from "@/utils/generate-client-config";

// Initialize Chromia hooks with default blockchain configuration
const { useChromiaQuery, useChromiaImmutableQuery } = createChromiaHooks({
  defaultClientConfig: {
    blockchainRid: process.env.NEXT_PUBLIC_BRID,
    directoryNodeUrlPool: process.env.NEXT_PUBLIC_NODE_URL,
  },
});

export { useChromiaImmutableQuery, useChromiaQuery };

/**
 * Custom hook to manage Chromia account creation and status
 * @param onAccountCreated - Optional callback function to execute after account creation
 * @returns Object containing account management functions and status
 */
export const useChromiaAccount = ({
  onAccountCreated,
}: {
  onAccountCreated?: () => void;
} = {}) => {
  // State management for loading and account creation attempts
  const [isLoading, setIsLoading] = useState(false);
  const [tried, setTried] = useState(false);

  // Get Ethereum address from wagmi hook
  const { address: ethAddress } = useAccount();
  // Initialize Postchain client with configuration
  const { data: client } = usePostchainClient({ config: clientConfig });
  // Get EVM keystore for authentication
  const { data: keyStore } = useEvmKeyStore();
  // Get FT4 accounts and mutation function
  const { mutate, data: ftAccounts } = useFtAccounts({ clientConfig });

  /**
   * Creates a new Chromia account with transfer capabilities
   * Handles the account registration process with proper authentication
   */
  const createAccount = useCallback(async () => {
    try {
      setIsLoading(true);

      // Guard clause: ensure all required data is available
      if (!ethAddress || !keyStore || !client) return;

      // Create authentication descriptor with Account, Transfer, and Zero permissions
      const ad = createSingleSigAuthDescriptorRegistration(
        [AuthFlag.Account, AuthFlag.Transfer, "0"],
        keyStore.id,
      );

      // Register the account on the blockchain
      await registerAccount(
        client as IClient,
        keyStore,
        registrationStrategy.open(ad),
      );

      // Refresh the accounts list
      await mutate();

      // Execute callback if provided
      onAccountCreated?.();
    } catch (e) {
      console.error(e);
    } finally {
      // Update state to reflect completion
      setIsLoading(false);
      setTried(true);
    }
  }, [client, ethAddress, keyStore, mutate, onAccountCreated]);

  // Return account management interface
  return {
    createAccount,      // Function to create new account
    isLoading,         // Loading state indicator
    tried,            // Indicates if account creation was attempted
    account: ftAccounts?.[0],  // First account in the list (if any)
    hasAccount: !!ftAccounts?.length,  // Boolean indicating if user has any accounts
  };
};