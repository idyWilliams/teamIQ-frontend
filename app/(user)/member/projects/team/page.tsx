import AssignedTeamMembers from "@/components/assigned-team-member";

export default function TeamPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Assigned Team Members</h1>
      <AssignedTeamMembers />
    </div>
  );
}