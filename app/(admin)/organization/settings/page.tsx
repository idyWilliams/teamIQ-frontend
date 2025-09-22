import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function SettingsPage() {
  return <div> <Button className="" variant="outline">Get started</Button>
  
    <Tabs>
      <TabsList className="">
        <TabsTrigger className="" value="login"> 
          Login
        </TabsTrigger>
         <TabsTrigger value="signup"> 
          Signup
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        Login
      </TabsContent>
  </Tabs>
  </div>;
}
