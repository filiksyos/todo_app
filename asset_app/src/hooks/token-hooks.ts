import { useCallback } from "react";

import { createAmount, op } from "@chromia/ft4";
import {
  useFtAccounts,
  useFtSession,
  useGetAllAssets,
  useGetBalances,
  usePostchainClient,
} from "@chromia/react";
import { useAccount } from "wagmi";

import { ensureBuffer } from "@/utils/ensure-buffer";
import { publicClientConfig as clientConfig } from "@/utils/generate-client-config";

interface MintTokenParams {
  ticker: string;
  name: string;
  amount: number;
}

export function useMintToken({
  onSuccess,
  onError,
}: {
  onSuccess?: (token: MintTokenParams) => void;
  onError?: (token: MintTokenParams) => void;
} = {}) {
  const { address: ethAddress } = useAccount();
  const { data: client } = usePostchainClient({ config: clientConfig });
  const { mutate: mutateAllAssets } = useGetAllAssets({
    clientConfig,
    params: [],
  });

  const { data: ftAccounts } = useFtAccounts({ clientConfig });

  const { data: session } = useFtSession(
    ftAccounts?.length ? { clientConfig, account: ftAccounts[0] } : null,
  );

  const registerAsset = useCallback(
    async (token: MintTokenParams) => {
      if (!client || !ethAddress || !session) return;

      try {
        await session
          .transactionBuilder()
          .add(
            op(
              "register_and_mint_asset",
              token.name,
              token.ticker,
              8,
              BigInt(token.amount),
              "https://cdn-icons-png.flaticon.com/512/4863/4863873.png",
            ),
          )
          .buildAndSend();

        await mutateAllAssets();

        onSuccess?.(token);
      } catch (error) {
        console.error(error);

        onError?.(token);
      }
    },
    [client, ethAddress, mutateAllAssets, onError, onSuccess, session],
  );

  return registerAsset;
}

export function useTransferTokens({
  onSuccess,
  onError,
}: {
  onSuccess?: (token: MintTokenParams) => void;
  onError?: (token: MintTokenParams) => void;
}) {
  const { data: ftAccounts } = useFtAccounts({ clientConfig });

  const { data: session } = useFtSession(
    ftAccounts?.length ? { clientConfig, account: ftAccounts[0] } : null,
  );

  const { flatData: balances } = useGetBalances(
    ftAccounts?.length
      ? {
          clientConfig,
          account: ftAccounts[0],
          params: [10],
          swrInfiniteConfiguration: {
            refreshInterval: 20_000,
          },
        }
      : null,
  );

  const transferTokens = useCallback(
    async (recipient: string, amount: number) => {
      if (!balances?.length) {
        return;
      }
      const asset = balances[0].asset;

      try {
        await session?.account.transfer(
          ensureBuffer(recipient),
          ensureBuffer(asset.id),
          createAmount(amount),
        );

        onSuccess?.({ ticker: asset.symbol, name: asset.name, amount });
      } catch (error) {
        console.error(error);

        onError?.({ ticker: asset.symbol, name: asset.name, amount });
      }
    },
    [balances, onError, onSuccess, session?.account],
  );

  return transferTokens;
}

export function useBurnTokens({
  onSuccess,
  onError,
}: {
  onSuccess?: (token: MintTokenParams) => void;
  onError?: (token: MintTokenParams) => void;
}) {
  const { data: ftAccounts } = useFtAccounts({ clientConfig });

  const { data: session } = useFtSession(
    ftAccounts?.length ? { clientConfig, account: ftAccounts[0] } : null,
  );

  const { flatData: balances } = useGetBalances(
    ftAccounts?.length
      ? {
          clientConfig,
          account: ftAccounts[0],
          params: [10],
          swrInfiniteConfiguration: {
            refreshInterval: 20_000,
          },
        }
      : null,
  );

  const burnTokens = useCallback(
    async (amount: number) => {
      if (!balances?.length) {
        return;
      }
      const asset = balances[0].asset;

      try {
        await session?.account.burn(asset.id, createAmount(amount));

        onSuccess?.({ ticker: asset.symbol, name: asset.name, amount });
      } catch (error) {
        console.error(error);

        onError?.({ ticker: asset.symbol, name: asset.name, amount });
      }
    },
    [balances, onError, onSuccess, session?.account],
  );

  return burnTokens;
}

// Hook for staking tokens on the Chromia blockchain
// Allows users to lock up their tokens in a staking contract
export function useStakeToken({
  onSuccess,
  onError,
}: {
  onSuccess?: (token: MintTokenParams) => void;
  onError?: (token: MintTokenParams) => void;
} = {}) {
  // Get the user's FT4 accounts
  const { data: ftAccounts } = useFtAccounts({ clientConfig });

  // Get the current session for the first account
  // This is needed to sign and send transactions
  const { data: session } = useFtSession(
    ftAccounts?.length ? { clientConfig, account: ftAccounts[0] } : null,
  );

  // Get the user's token balances
  // Refreshes every 20 seconds to stay up to date
  const { flatData: balances } = useGetBalances(
    ftAccounts?.length
      ? {
          clientConfig,
          account: ftAccounts[0],
          params: [10],
          swrInfiniteConfiguration: {
            refreshInterval: 20_000,
          },
        }
      : null,
  );

  // Callback function that handles the staking process
  const stakeTokens = useCallback(
    async (amount: number) => {
      // Check if user has any tokens to stake
      if (!balances?.length) {
        return;
      }
      // Get the first asset from balances (currently only supporting one token)
      const asset = balances[0].asset;

      try {
        // Build and send the stake_asset transaction
        // This calls the stake_asset operation on the blockchain which:
        // 1. Authenticates the user
        // 2. Validates the stake amount
        // 3. Checks if user has sufficient balance
        // 4. Deducts tokens from user's balance
        // 5. Creates or updates the stake record
        await session
          ?.transactionBuilder()
          .add(
            op(
              "stake_asset",
              asset.id,
              BigInt(amount),
            ),
          )
          .buildAndSend();

        // Call success callback with staked token details
        onSuccess?.({ ticker: asset.symbol, name: asset.name, amount });
      } catch (error) {
        // Log and handle any errors during staking
        console.error(error);
        onError?.({ ticker: asset.symbol, name: asset.name, amount });
      }
    },
    [balances, onError, onSuccess, session],
  );

  return stakeTokens;
}

// Hook for unstaking tokens from the Chromia blockchain
export function useUnstakeToken({
  onSuccess,
  onError,
}: {
  onSuccess?: (token: MintTokenParams) => void;
  onError?: (token: MintTokenParams) => void;
} = {}) {
  const { data: ftAccounts } = useFtAccounts({ clientConfig });
  const { data: session, mutate: mutateSession } = useFtSession(
    ftAccounts?.length ? { clientConfig, account: ftAccounts[0] } : null,
  );
  const { flatData: balances, mutate: mutateBalances } = useGetBalances(
    ftAccounts?.length
      ? {
          clientConfig,
          account: ftAccounts[0],
          params: [10],
          swrInfiniteConfiguration: {
            refreshInterval: 5_000,
            revalidateOnFocus: true,
            dedupingInterval: 1000,
          },
        }
      : null,
  );

  const unstakeTokens = useCallback(
    async (amount: number) => {
      if (!balances?.length || !session) {
        return;
      }
      const asset = balances[0].asset;

      try {
        // Refresh session before transaction
        await mutateSession();
        
        await session
          .transactionBuilder()
          .add(
            op(
              "unstake_asset",
              asset.id,
              BigInt(amount),
            ),
          )
          .buildAndSend();

        // Force immediate revalidation of all states
        await Promise.all([
          mutateBalances(),
          mutateSession(),
          // Small delay to ensure blockchain state is updated
          new Promise(resolve => setTimeout(resolve, 1000))
        ]);
        
        onSuccess?.({ ticker: asset.symbol, name: asset.symbol, amount });
      } catch (error) {
        console.error(error);
        onError?.({ ticker: asset.symbol, name: asset.symbol, amount });
      }
    },
    [balances, mutateBalances, mutateSession, onError, onSuccess, session],
  );

  return unstakeTokens;
}

// Hook to get current stake amount
export function useStakeInfo() {
  const { data: ftAccounts } = useFtAccounts({ clientConfig });
  const { data: session } = useFtSession(
    ftAccounts?.length ? { clientConfig, account: ftAccounts[0] } : null,
  );
  const { flatData: balances } = useGetBalances(
    ftAccounts?.length
      ? {
          clientConfig,
          account: ftAccounts[0],
          params: [10],
          swrInfiniteConfiguration: {
            refreshInterval: 5_000,
            revalidateOnFocus: true,
            dedupingInterval: 1000,
          },
        }
      : null,
  );

  const getStakeInfo = useCallback(async () => {
    if (!balances?.length || !session || !ftAccounts?.length) {
      return { amount: 0, stakedAt: null };
    }

    const asset = balances[0].asset;
    try {
      const result = await session.client.query("get_stake_info", {
        account_id: ftAccounts[0].id,
        asset_id: asset.id,
      }) as { amount: bigint; staked_at: number } | null;

      if (!result) {
        return { amount: 0, stakedAt: null };
      }

      return {
        amount: Number(result.amount),
        stakedAt: new Date(result.staked_at * 1000), // Convert Unix timestamp to Date
      };
    } catch (error) {
      console.error('Error fetching stake info:', error);
      return { amount: 0, stakedAt: null };
    }
  }, [balances, ftAccounts, session]);

  return { getStakeInfo };
}

// Hook to get yield information
export function useYieldInfo() {
  const { data: ftAccounts } = useFtAccounts({ clientConfig });
  const { data: session } = useFtSession(
    ftAccounts?.length ? { clientConfig, account: ftAccounts[0] } : null,
  );
  const { flatData: balances } = useGetBalances(
    ftAccounts?.length
      ? {
          clientConfig,
          account: ftAccounts[0],
          params: [10],
          swrInfiniteConfiguration: {
            refreshInterval: 5_000,
            revalidateOnFocus: true,
            dedupingInterval: 1000,
          },
        }
      : null,
  );

  const getYieldInfo = useCallback(async () => {
    if (!balances?.length || !session || !ftAccounts?.length) {
      return { amount: 0 };
    }

    const asset = balances[0].asset;
    try {
      const result = await session.client.query("get_yield_info", {
        account_id: ftAccounts[0].id,
        asset_id: asset.id,
      }) as { amount: bigint };

      return {
        amount: Number(result.amount),
      };
    } catch (error) {
      console.error('Error fetching yield info:', error);
      return { amount: 0 };
    }
  }, [balances, ftAccounts, session]);

  return { getYieldInfo };
}

// Hook for claiming yield
export function useClaimYield({
  onSuccess,
  onError,
}: {
  onSuccess?: (amount: number) => void;
  onError?: (error: any) => void;
} = {}) {
  const { data: ftAccounts } = useFtAccounts({ clientConfig });
  const { data: session } = useFtSession(
    ftAccounts?.length ? { clientConfig, account: ftAccounts[0] } : null,
  );
  const { flatData: balances, mutate: mutateBalances } = useGetBalances(
    ftAccounts?.length
      ? {
          clientConfig,
          account: ftAccounts[0],
          params: [10],
          swrInfiniteConfiguration: {
            refreshInterval: 5_000,
          },
        }
      : null,
  );

  const claimYield = useCallback(async () => {
    if (!balances?.length || !session) {
      return;
    }

    const asset = balances[0].asset;
    try {
      await session
        .transactionBuilder()
        .add(op("claim_yield", asset.id))
        .buildAndSend();

      await mutateBalances();
      onSuccess?.(0); // We'll update this with the actual claimed amount
    } catch (error) {
      console.error('Error claiming yield:', error);
      onError?.(error);
    }
  }, [balances, mutateBalances, onSuccess, onError, session]);

  return { claimYield };
}
