"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { TrendingUp } from "lucide-react";

type CardItemProps = {
  title?: string;
  content?: string;
  avatarUrl?: string;
  trend?: string;
};

export default function CardItem({ title, avatarUrl, content, trend }: CardItemProps) {
  return (
    <Card className="w-full relative overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl">
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#086ACE]/5 -translate-y-6 translate-x-6 pointer-events-none" />
      <CardContent className="pt-5 pb-4 px-5">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-[#EBF4FF]">
            <Avatar className="size-5">
              <AvatarImage src={avatarUrl} alt={title} />
              <AvatarFallback className="text-[10px] text-[#086ACE]">
                {title?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <TrendingUp className="size-3" />
            {trend ?? "+0%"}
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-900 mb-0.5">{content}</p>
        <p className="text-xs font-medium text-gray-500 tracking-wide uppercase">{title}</p>
      </CardContent>
    </Card>
  );
}
