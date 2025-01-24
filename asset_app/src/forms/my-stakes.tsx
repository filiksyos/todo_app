import { useEffect, useState } from "react";
import { useStakeInfo } from "@/hooks/token-hooks";
import { Card } from "@/components/ui/card";

interface StakeInfo {
  amount: number;
  stakedAt: Date | null;
}

export function MyStakesForm() {
  const { getStakeInfo } = useStakeInfo();
  const [stakeInfo, setStakeInfo] = useState<StakeInfo>({ amount: 0, stakedAt: null });

  useEffect(() => {
    const fetchStakeInfo = async () => {
      const info = await getStakeInfo();
      setStakeInfo(info);
    };

    fetchStakeInfo();
    // Set up an interval to refresh stake info
    const interval = setInterval(fetchStakeInfo, 5000);
    return () => clearInterval(interval);
  }, [getStakeInfo]);

  if (!stakeInfo.stakedAt) {
    return (
      <Card className="p-4">
        <p className="text-center text-gray-500">No active stakes found</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-secondary rounded-lg">
          <p className="text-sm text-gray-500">Staked Amount</p>
          <p className="text-2xl font-bold">{stakeInfo.amount}</p>
        </div>
        <div className="p-4 bg-secondary rounded-lg">
          <p className="text-sm text-gray-500">Staked At</p>
          <p className="text-2xl font-bold">
            {stakeInfo.stakedAt.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
} 