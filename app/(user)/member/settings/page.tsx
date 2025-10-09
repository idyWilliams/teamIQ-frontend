import NotificationsSettings from "@/components/notification ";
import PlanSettings from "@/components/plan";
import SettingsTabs from "@/components/settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function SettingsPage() {
  return (
    <section className="p-6 sm:p-10">
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          {SettingsTabDetails.map((tab) => (
            <TabsTrigger key={tab.key} value={tab.key}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {SettingsTabDetails.map((tab) => (
          <TabsContent key={tab.key} value={tab.key}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>

      <h1 className="text-3xl font-bold mb-6"></h1>
      <SettingsTabs />
    </section>
  );
}

const SettingsTabDetails = [
  { key: "details", label: "My Details", content: <>My Details</> },
  {
    key: "notifications",
    label: "Notifications",
    content: <NotificationsSettings />,
  },
  { key: "password", label: "Password", content: <>Password</> },
  { key: "plan", label: "Plan", content: <PlanSettings /> },
];
