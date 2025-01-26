import Link from "next/link";

import { cn } from "@/lib/utils";

import { ConnectWallet } from "./wallet";
import Title from "./title";
import Theme from "./theme";

const Header = () => {
  const classNameLeftCube = cn(
    "before:cube before:bottom-[-4px] before:left-[-4px] before:hidden sm:before:block",
  );
  const classNameRightCube = cn(
    "after:cube after:bottom-[-4px] after:right-[-4px] after:hidden sm:after:block",
  );

  return (
    <div className="sticky left-0 right-0 top-0 z-50 h-20 border-0 border-b border-solid border-border/20 bg-popover/10 backdrop-blur-md">
      <div
        className={cn(
          "container relative flex h-full items-center justify-between border-0 border-l border-r border-border/20 sm:border-solid",
          classNameLeftCube,
          classNameRightCube,
        )}
      >
        <Link href="/" className="flex items-center">
          <Title />
        </Link>
        <div className="flex items-center gap-4">
          <Theme />
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
};

export default Header;
