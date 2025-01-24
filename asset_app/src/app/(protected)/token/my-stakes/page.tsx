"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import LinkIconButton from "@/components/chromia-ui-kit/link-icon-button";
import { MyStakesForm } from "@/forms/my-stakes";

export default function MyStakesPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-lg p-6">
        <div className="mb-8 flex items-center">
          <Link href="/token" passHref legacyBehavior>
            <LinkIconButton Icon={<ArrowLeft />} variant="ghost" />
          </Link>
          <h2 className="mx-auto text-center text-xl">My Stakes</h2>
        </div>
        <MyStakesForm />
      </Card>
    </div>
  );
} 