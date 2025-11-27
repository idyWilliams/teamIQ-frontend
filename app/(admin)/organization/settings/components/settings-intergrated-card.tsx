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
 name?: string;
  description?: string;
  logo?: string;
}

export default function IntgratedApps({ name, logo, description }: CardItemProps) {
  return (

    <Card  className="flex h-full shadow-none flex-col justify-between rounded-2xl p-6 ">
      <CardHeader className="mb-[-20px]  ">
        <CardTitle  className="mb-3 flex items-center gap-2">
          <Avatar >

            <AvatarImage src={logo} alt={name}/>
            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
          </Avatar>

            <p className="text-base font-semibold">{name}</p>



        </CardTitle>


      </CardHeader>
      <CardContent>
        <p className="text-black-400 text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>

  );
}
