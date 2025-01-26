import React from "react";
import Link from "next/link";
import LinkButton from "@/components/chromia-ui-kit/link-button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">
      <Link href="/token" passHref legacyBehavior>
        <LinkButton className="w-44">Get Started</LinkButton>
      </Link>
    </div>
  );
}
