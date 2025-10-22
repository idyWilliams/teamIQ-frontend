"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";


type CardItemProps = {
 title?: string;
  content?: string;
  avatarUrl?: string;
  noMargin?: boolean;
}

export default function CardItem({ title, avatarUrl, content, noMargin = false }: CardItemProps) {
  return (
    <Card className={`w-full h-30 shadow-none ${noMargin ? '' : 'm-6'}`}>
      <CardHeader className="mb-[-20px]">      
        <CardTitle>
          <div>
            <p className="font-semibold text-[14px]">{title}</p>
          </div>
        </CardTitle>
        <CardAction>
          <Avatar className="size-7">
            <AvatarImage src={avatarUrl} alt={title}/>
            <AvatarFallback>{title?.charAt(0)}</AvatarFallback>
          </Avatar> 
        </CardAction>
       
      </CardHeader>
      <CardContent>
        <p className="font-bold text-2xl">{content}</p>
      </CardContent>
    </Card>
  );
}
