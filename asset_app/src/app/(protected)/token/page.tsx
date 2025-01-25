"use client";

import React from "react";
import Link from "next/link";
import { useFtAccounts, useGetBalances } from "@chromia/react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { FlameIcon, CoinsIcon, HistoryIcon, GiftIcon } from "lucide-react";
import { Chr } from "@/components/chromia-ui-kit/icons";
import LinkButton from "@/components/chromia-ui-kit/link-button";
import { CardLoading } from "@/components/layout/card-loading";
import { Card, CardTitle } from "@/components/ui/card";
import MintToken from "@/forms/mint-token";
import { publicClientConfig as clientConfig } from "@/utils/generate-client-config";
import { TaskList } from "@/components/tasks/task-list";

export default function TokenPage() {
  const { data: ftAccounts } = useFtAccounts({ clientConfig });

  const {
    flatData: balances,
    isLoading,
    mutate,
  } = useGetBalances(
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

  const hasBalances = !!balances?.length;

  return (
    <div className="flex flex-1 flex-col items-center justify-start gap-6 py-6">
      {isLoading ? (
        <CardLoading />
      ) : !hasBalances ? (
        <Card className="w-full max-w-lg p-6">
          <CardTitle className="mb-4 text-center text-xl">
            Mint your own token
          </CardTitle>
          <MintToken onMinted={() => mutate()} />
        </Card>
      ) : (
        <>
          <Card className="w-full max-w-lg space-y-6 overflow-visible px-10 pb-6">
            <Chr className="mx-auto -mt-10 h-20 w-20" />
            <div className="space-y-1">
              <h2 className="mb-1 text-center font-serif text-3xl font-bold text-white">
                {Intl.NumberFormat().format(balances[0].amount.value)}{" "}
                {balances[0].asset.symbol.toUpperCase()}
              </h2>
              <h3 className="text-center text-muted-foreground">
                {balances[0].asset.name}
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-4 md:gap-10">
              <Link href="/token/transfer" passHref legacyBehavior>
                <LinkButton variant="secondary">
                  <PaperPlaneIcon />
                  Transfer
                </LinkButton>
              </Link>
              <Link href="/token/burn" passHref legacyBehavior>
                <LinkButton variant="secondary">
                  <FlameIcon />
                  Burn
                </LinkButton>
              </Link>
              <Link href="/token/stake" passHref legacyBehavior>
                <LinkButton variant="secondary">
                  <CoinsIcon />
                  Stake
                </LinkButton>
              </Link>
              <Link href="/token/unstake" passHref legacyBehavior>
                <LinkButton variant="secondary">
                  <CoinsIcon />
                  Unstake
                </LinkButton>
              </Link>
              <Link href="/token/my-stakes" passHref legacyBehavior>
                <LinkButton variant="secondary">
                  <HistoryIcon />
                  My Stakes
                </LinkButton>
              </Link>
              <Link href="/token/claim-yield" passHref legacyBehavior>
                <LinkButton variant="secondary">
                  <GiftIcon />
                  Claim Yield
                </LinkButton>
              </Link>
            </div>
          </Card>
          <TaskList />
        </>
      )}
    </div>
  );
}
