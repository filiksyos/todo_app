"use client";

import type React from "react";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

import Button from "@/components/chromia-ui-kit/button";
import { CardLoading } from "@/components/layout/card-loading";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useChromiaAccount } from "@/hooks/chromia-hooks";
import { useAccountCreatedModal } from "@/modals/account-created-modal";
import Header from "@/components/layout/header";
import BackgroundProvider from "@/app/background-provider";

export function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isConnected } = useAccount();
  const { show } = useAccountCreatedModal();
  const { hasAccount, createAccount, isLoading, tried } = useChromiaAccount({
    onAccountCreated: show,
  });

  return (
    <div suppressHydrationWarning className="relative flex min-h-screen flex-col">
      <BackgroundProvider />
      <Header />
      <main className="container flex flex-1 flex-col">
        <AuthContent
          isConnected={isConnected}
          hasAccount={hasAccount}
          isLoading={isLoading}
          createAccount={createAccount}
          tried={tried}
        >
          {children}
        </AuthContent>
      </main>
    </div>
  );
}

function AuthContent({
  children,
  isConnected,
  hasAccount,
  isLoading,
  createAccount,
  tried,
}: {
  children: React.ReactNode;
  isConnected: boolean;
  hasAccount: boolean;
  isLoading: boolean;
  createAccount: () => void;
  tried: boolean;
}) {
  if (isConnected) {
    if (hasAccount) {
      return children;
    }

    return (
      <div className="flex flex-1 items-center justify-center">
        {isLoading ? (
          <CardLoading />
        ) : (
          <Card className="min-w-52 p-6 text-center">
            <CardTitle>Account not found</CardTitle>
            <CardDescription className="mt-2">
              You need to create a Chromia account first to manage your tasks.
            </CardDescription>
            <Button onClick={createAccount} className="mx-auto mt-4 min-w-44">
              {tried ? "Retry creating account" : "Create account"}
            </Button>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <ConnectKitButton.Custom>
        {({ show, isConnecting }) => {
          if (isConnecting) {
            return <CardLoading />;
          }

          return (
            <Card className="min-w-52 p-6 text-center">
              <CardTitle>Connect to your wallet</CardTitle>
              <CardDescription className="mt-2">
                You need to connect your wallet to manage your tasks.
              </CardDescription>
              <Button onClick={show} className="mx-auto mt-4 w-44">
                Connect wallet
              </Button>
            </Card>
          );
        }}
      </ConnectKitButton.Custom>
    </div>
  );
} 