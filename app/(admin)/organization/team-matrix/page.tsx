import React from 'react'
import TeamSkillStrength from '@/components/organization-dashboard-components/teamSkillStrength';
import ProjectReadiness from '@/components/organization-dashboard-components/projectReadiness';

export default function TeamMatrixPage() {
  return (
    <>
      <section>
        <TeamSkillStrength />
        <ProjectReadiness />
      </section>
    </>
  );
}
