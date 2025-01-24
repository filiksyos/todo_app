import { create, useModal } from "@ebay/nice-modal-react";

import Button from "@/components/chromia-ui-kit/button";
import SuccessIcon from "@/components/icons/success";
import { DrawerDialog } from "@/components/ui/drawer-dialog";
import TadaBg from "@/components/ui/tada-bg";

const ClaimYieldSuccessModal = create<{ amount: number }>(
  ({ amount }) => {
    const modal = useModal();

    return (
      <DrawerDialog
        visuallyHiddenTitle
        DialogContentProps={{ "aria-describedby": undefined }}
        footer={
          <Button variant="secondary" onClick={modal.hide}>
            Great 🎉
          </Button>
        }
        open={modal.visible}
        title="You have successfully claimed yield"
        onOpenChange={modal.hide}
      >
        <div className="space-y-6">
          <div className="grid place-items-center">
            <TadaBg className="max-w-full" />
            <SuccessIcon className="absolute scale-y-75 text-[6rem] opacity-60 blur-2xl" />
            <SuccessIcon className="absolute text-[6rem]" />
          </div>
          <div>
            <p className="text-center text-xs text-muted-foreground">
              You have successfully claimed
            </p>
            <p className="text-center font-serif text-3xl font-bold text-accent">
              {Intl.NumberFormat().format(amount)} tokens
            </p>
          </div>
        </div>
      </DrawerDialog>
    );
  },
);

export const useClaimYieldSuccessModal = () => {
  const modal = useModal(ClaimYieldSuccessModal);
  return modal;
}; 