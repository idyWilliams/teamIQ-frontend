import { projectOverviewData } from '@/components/project-overview';

export default function ProjectOverview() {
  return (
    <main style={{ display: 'flex', gap: 32 }}>
      <section style={{ flex: 2, background: '#fff', borderRadius: 12, padding: 32, marginTop: 24 }}>
        <h1 style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>Project Overview</h1>
        <nav style={{ display: 'flex', gap: 32, borderBottom: '2px solid #e5e7eb', marginBottom: 24 }}>
          <span style={{ color: '#2563eb', borderBottom: '2px solid #2563eb', paddingBottom: 4, fontWeight: 500 }}>Project Overview</span>
          <span style={{ color: '#222' }}>Tasks</span>
          <span style={{ color: '#222' }}>Assigned Team Members</span>
        </nav>
        <div style={{ marginBottom: 18 }}>
          <b>Description</b>
          {projectOverviewData.description.map((desc, i) => (
            <p key={i} style={{ margin: '8px 0', color: '#222', fontSize: 15 }}>{desc}</p>
          ))}
        </div>
        <div style={{ marginBottom: 18 }}>
          <b>Project Timeline</b>
          <div style={{ background: '#e3f1fd', borderRadius: 8, padding: 8, marginTop: 8, color: '#2563eb', fontWeight: 500, width: 'fit-content' }}>
            {projectOverviewData.timeline.start} - {projectOverviewData.timeline.end}
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <b>Required Stacks</b>
          <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
            {projectOverviewData.stacks.map((stack) => (
              <div key={stack.name} style={{ textAlign: 'center' }}>
                <img src={stack.icon} alt={stack.name} width={32} height={32} />
                <div style={{ fontSize: 13, marginTop: 4 }}>{stack.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <b>Integrated Apps</b>
          <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
            {projectOverviewData.apps.map((app) => (
              <div key={app.name} style={{ textAlign: 'center' }}>
                <img src={app.icon} alt={app.name} width={32} height={32} />
                <div style={{ fontSize: 13, marginTop: 4 }}>{app.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <b>Linked Documents</b>
          <div style={{ marginTop: 8 }}>
            {projectOverviewData.documents.map((doc, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>📄</span>
                <a href={doc.url} style={{ color: '#222', textDecoration: 'underline', fontSize: 15 }}>{doc.name}</a>
                <span style={{ marginLeft: 'auto', fontSize: 18, cursor: 'pointer' }}>⋮</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <aside style={{ flex: 1, marginTop: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <b>AI Summary</b>
          <p style={{ fontSize: 14, color: '#444', margin: '12px 0' }}>Generate summary for your project with a single click</p>
          <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500, cursor: 'pointer' }}>Generate AI Summary</button>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <b>Activities</b>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: 12 }}>
            {projectOverviewData.activities.map((act, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ background: '#e3e0fd', color: '#7c3aed', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>P</span>
                <span style={{ fontSize: 15 }}>{act.text}</span>
                <span style={{ marginLeft: 'auto', color: '#888', fontSize: 13 }}>{act.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </main>
  );
}
