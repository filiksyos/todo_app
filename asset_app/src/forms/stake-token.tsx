"use client";

import React from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Button from "@/components/chromia-ui-kit/button";
import { LoaderCubes, Plus } from "@/components/chromia-ui-kit/icons";
import Input from "@/components/chromia-ui-kit/input";
import { useStakeToken } from "@/hooks/token-hooks";
import { useStakeSuccessModal } from "@/modals/stake-success-modal";
import { useTransactionFailedModal } from "@/modals/transaction-failed-modal";

const stakeTokenSchema = z.object({
  amount: z
    .number({
      message: "Amount is required",
    })
    .min(1, {
      message: "Amount should be greater than 0",
    })
    .max(100_000, {
      message: "Max possible to stake 100,000 tokens",
    }),
});

type StakeTokenForm = z.infer<typeof stakeTokenSchema>;

export default function StakeToken({ onStaked }: { onStaked: () => void }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<StakeTokenForm>({
    resolver: zodResolver(stakeTokenSchema),
    defaultValues: {
      amount: undefined,
    },
  });

  const { show: showStakeSuccessModal } = useStakeSuccessModal();
  const { show: showMintedErrorModal } = useTransactionFailedModal();

  const stakeTokens = useStakeToken({
    onSuccess: (token) => {
      showStakeSuccessModal({ amount: token.amount });
      onStaked();
    },
    onError: showMintedErrorModal,
  });

  return (
    <form
      onSubmit={handleSubmit((values) => stakeTokens(values.amount))}
      className="space-y-6"
    >
      <Input
        {...register("amount", { valueAsNumber: true })}
        label="Enter amount to stake"
        error={!!errors.amount}
        info={errors.amount?.message ?? "Max possible to stake 100,000 tokens"}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <LoaderCubes />
        ) : (
          <>
            Stake
            <Plus className="h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
} 