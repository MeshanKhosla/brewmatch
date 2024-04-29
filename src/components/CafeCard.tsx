"use client";

import { type Cafe } from "@prisma/client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import CardHover from "~/components/CardHover";

type CafeCardProps = {
  cafe: Cafe;
};

export function CafeCard(props: CafeCardProps) {
  const { cafe } = props;

  return (
    <Card key={cafe.id} className="h-full">
      <div className="max-w group relative mx-auto h-full cursor-pointer overflow-hidden rounded-lg bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <CardHover />
        <CardHeader className="h-full">
          <div className="grid h-full grid-rows-[max-content_1fr]">
            <CardTitle>{cafe.name}</CardTitle>
            <CardDescription className="self-center pt-3">
              {cafe.description}
            </CardDescription>
          </div>
        </CardHeader>
      </div>
    </Card>
  );
}
