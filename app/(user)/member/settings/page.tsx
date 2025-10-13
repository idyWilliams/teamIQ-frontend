import React from "react";
import { redirect } from "next/navigation";

export default function SettingsPage() {
  redirect("/member/settings");
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}


//  shadcn tab component 