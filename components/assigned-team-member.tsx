import Image from 'next/image';

const teamMembers = [
	{
		name: 'Jenny Wilson',
		role: 'Product Designer',
		avatar: '/images/avatar.jpg',
	},
	{
		name: 'Mercy Ochieng',
		role: 'Software Engineer',
		avatar: '/images/avatar2.jpg',
	},
	{
		name: 'Robert Fox',
		role: 'Backend Developer',
		avatar: '/images/avatar2.jpg',
	},
	{
		name: 'Darrell Steward',
		role: 'Product Manager',
		avatar: '/images/avatar2.jpg',
	},
	{
		name: 'Lesile Alexander',
		role: 'Frontend Developer',
		avatar: '/images/avatar2.jpg',
	},
	{
		name: 'Esther Howard',
		role: 'Product Designer',
		avatar: '/images/avatar2.jpg',
	},
	{
		name: 'Jacob Jones',
		role: 'QA Tester',
		avatar: '/images/avatar2.jpg',
	},
	{
		name: 'Floyd Miles',
		role: 'Content Writer',
		avatar: '/images/avatar2.jpg',
	},
];

export default function AssignedTeamMembers() {
	return (
		<div className="assigned-team-container">
			{/* Team Grid */}
			<div className="team-grid-outer">
				<div className="team-grid">
					{teamMembers.map((member) => (
						<div className="team-card" key={member.name}>
							<Image
								src={member.avatar}
								alt={member.name}
								width={64}
								height={64}
								className="avatar"
							/>
							<div className="name">{member.name}</div>
							<div className="role-badge">
								<span className="dot" />
								{member.role}
							</div>
						</div>
					))}
				</div>
			</div>
			<style jsx>{`
				.assigned-team-container {
					width: 100%;
				}

				}
				.tab.active {
					color: #2196f3;
					font-weight: 600;
					border-bottom: 2.5px solid #2196f3;
				}
				.search-bar-wrapper {
					margin: 18px 0 8px 0;
				}
				.search-bar {
					width: 320px;
					padding: 8px 16px;
					border: 1.5px solid #e0e0e0;
					border-radius: 6px;
					font-size: 1em;
				}
				.team-grid {
					display: grid;
					grid-template-columns: repeat(5, 1fr);
					gap: 28px 24px;
				}
				.team-card {
					border: 1.5px solid gray;
					padding: 18px 12px 14px 12px;
					text-align: center;
					border-radius: 8px;
					background: #fff;
					min-width: 160px;
				}
				.avatar {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 64px;
					height: 64px;
					border-radius: 50%;
					border: 2px solid #e0e0e0;
					overflow: hidden;
					margin: 0 auto 8px auto;
				}
				.name {
					font-weight: 600;
					margin-top: 2px;
					margin-bottom: 4px;
				}
				.role-badge {
					display: inline-flex;
					align-items: center;
					background: #f4f8fe;
					color: #2196f3;
					font-size: 0.95em;
					border-radius: 12px;
					padding: 2.5px 12px 2.5px 8px;
					margin-top: 2px;
					font-weight: 500;
				}
				.dot {
					width: 8px;
					height: 8px;
					background: #2196f3;
					border-radius: 50%;
					display: inline-block;
					margin-right: 7px;
				}
			`}</style>
		</div>
	);
}