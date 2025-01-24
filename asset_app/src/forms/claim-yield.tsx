import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/chromia-ui-kit/button";
import { Card } from "@/components/ui/card";
import { useClaimYieldSuccessModal } from "@/modals/claim-yield-success-modal";
import { useClaimYield, useYieldInfo } from "@/hooks/token-hooks";

export function ClaimYieldForm() {
  const router = useRouter();
  const [yieldAmount, setYieldAmount] = useState(0);
  const modal = useClaimYieldSuccessModal();
  const { getYieldInfo } = useYieldInfo();
  const { claimYield } = useClaimYield({
    onSuccess: () => {
      modal.show({ amount: yieldAmount });
      router.push("/token");
    },
    onError: (error) => {
      alert("Failed to claim yield");
    },
  });

  useEffect(() => {
    const fetchYieldInfo = async () => {
      const info = await getYieldInfo();
      setYieldAmount(info.amount);
    };

    fetchYieldInfo();
    const interval = setInterval(fetchYieldInfo, 5000);
    return () => clearInterval(interval);
  }, [getYieldInfo]);

  if (yieldAmount === 0) {
    return (
      <Card className="p-4">
        <p className="text-center text-gray-500">No yield available to claim</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-secondary rounded-lg">
        <p className="text-sm text-gray-500">Available Yield</p>
        <p className="text-2xl font-bold">{yieldAmount}</p>
      </div>
      <Button
        className="w-full"
        onClick={() => claimYield()}
      >
        Claim Yield
      </Button>
    </div>
  );
} 