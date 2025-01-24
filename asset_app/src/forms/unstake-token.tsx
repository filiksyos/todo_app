"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Button from "@/components/chromia-ui-kit/button";
import { LoaderCubes, Plus } from "@/components/chromia-ui-kit/icons";
import Input from "@/components/chromia-ui-kit/input";
import { useStakeInfo, useUnstakeToken } from "@/hooks/token-hooks";
import { useUnstakeSuccessModal } from "@/modals/unstake-success-modal";
import { useTransactionFailedModal } from "@/modals/transaction-failed-modal";

const unstakeTokenSchema = z.object({
  amount: z
    .number({
      message: "Amount is required",
    })
    .min(1, {
      message: "Amount should be greater than 0",
    })
    .max(100_000, {
      message: "Max possible to unstake 100,000 tokens",
    }),
});

type UnstakeTokenForm = z.infer<typeof unstakeTokenSchema>;

export default function UnstakeToken({ onUnstaked }: { onUnstaked: () => void }) {
  const [currentStake, setCurrentStake] = useState(0);
  const { getStakeInfo } = useStakeInfo();

  useEffect(() => {
    const fetchStakeAmount = async () => {
      const info = await getStakeInfo();
      setCurrentStake(info.amount);
    };
    fetchStakeAmount();
  }, [getStakeInfo]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<UnstakeTokenForm>({
    resolver: zodResolver(unstakeTokenSchema),
    defaultValues: {
      amount: undefined,
    },
  });

  const { show: showUnstakeSuccessModal } = useUnstakeSuccessModal();
  const { show: showMintedErrorModal } = useTransactionFailedModal();

  const unstakeTokens = useUnstakeToken({
    onSuccess: (token) => {
      showUnstakeSuccessModal({ amount: token.amount });
      onUnstaked();
    },
    onError: showMintedErrorModal,
  });

  const onSubmit = async (values: UnstakeTokenForm) => {
    if (values.amount > currentStake) {
      showMintedErrorModal({
        ticker: "Token",
        amount: values.amount,
      });
      return;
    }
    await unstakeTokens(values.amount);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        {...register("amount", { valueAsNumber: true })}
        label="Enter amount to unstake"
        error={!!errors.amount}
        rightElement={
          <Button
            variant="secondary"
            size="s"
            onClick={() => setValue("amount", currentStake)}
          >
            Max
          </Button>
        }
        info={errors.amount?.message ?? `Available to unstake: ${currentStake} tokens`}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting || currentStake === 0}>
        {isSubmitting ? (
          <LoaderCubes />
        ) : (
          <>
            Unstake
            <Plus className="h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
} 