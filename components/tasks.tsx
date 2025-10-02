import Image from "next/image";
import React from "react";

const columns = [
	{ key: "backlog", title: "Backlog Tasks", count: 6 },
	{ key: "todo", title: "To Do Tasks", count: 3 },
	{ key: "inprocess", title: "In Process", count: 2 },
	{ key: "done", title: "Done", count: 5 },
];

const sampleTasks = {
	backlog: [
		{
			title: "Model Answer",
			tags: ["Design", "Backlog"],
			users: ["/images/avatar.jpg", "/images/avatar2.jpg"],
			comments: 2,
			files: 4,
			id: "#T003",
		},
	],
	todo: [
		{
			title: "Model Answer",
			tags: ["To Do"],
			users: ["/images/avatar.jpg", "/images/avatar2.jpg"],
			comments: 2,
			files: 4,
			id: "#T002",
		},
	],
	inprocess: [
		{
			title: "Model Answer",
			tags: ["In Process"],
			users: ["/images/avatar.jpg", "/images/avatar2.jpg"],
			comments: 2,
			files: 4,
			id: "#T002",
		},
	],
	done: [
		{
			title: "Model Answer",
			tags: ["Done"],
			users: ["/images/avatar.jpg", "/images/avatar2.jpg"],
			comments: 2,
			files: 4,
			id: "#T002",
		},
	],
};

export default function Tasks() {
	return (
		<div className="tasks-layout">
			{/* Main Content */}
			<main className="tasks-main">
				<div className="tasks-controls">
					<input className="search-bar" placeholder="Search for a task" />
					<select className="filter-select">
						<option>Date</option>
					</select>
					<select className="filter-select">
						<option>All Tasks</option>
					</select>
				</div>
				<div className="kanban-board">
					{columns.map((col) => (
						<div className="kanban-column" key={col.key}>
							<div className="kanban-column-header">
								{col.title}{" "}
								<span className="count">{col.count}</span>
							</div>
							<div className="kanban-tasks">
								{(sampleTasks[col.key as keyof typeof sampleTasks] || []).map((task, idx) => (
									<div className="task-card" key={idx}>
										<div className="task-title">{task.title}</div>
										<div className="task-tags">
											{task.tags.map((tag) => (
												<span className="task-tag" key={tag}>
													{tag}
												</span>
											))}
										</div>
										<div className="task-meta">
											<span className="task-id">{task.id}</span>
											<span className="task-users">
												{task.users.map((u, i) => (
													<Image
														src={u}
														key={i}
														className="task-avatar"
														width={24}
														height={24}
														alt="user"
													/>
												))}
											</span>
											<span className="task-comments">
												{task.comments} 💬
											</span>
											<span className="task-files">
												{task.files} 📄
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</main>
		
			<style >{`
				.tasks-layout {
					display: flex;
					height: 100vh;
				}
				.sidebar {
					width: 220px;
					background: #f7f8fa;
					border-right: 1.5px solid #e0e0e0;
					padding: 32px 0 0 0;
				}
				.logo {
					font-weight: bold;
					font-size: 1.2em;
					margin-left: 32px;
					margin-bottom: 32px;
				}
				.sidebar-nav ul {
					list-style: none;
					padding: 0;
					margin: 0;
				}
				.nav-section {
					font-size: 0.95em;
					color: #888;
					margin: 0 0 12px 32px;
					font-weight: 500;
				}
				.nav-item {
					padding: 10px 0 10px 32px;
					font-size: 1.05em;
					color: #222;
					cursor: pointer;
					transition: background 0.2s;
				}
				.nav-item.active,
				.nav-item:hover {
					background: #e3f1fd;
					color: #2196f3;
				}
				.tasks-main {
					flex: 1;
					padding: 32px 40px;
					overflow-y: auto;
				}
				.tasks-header h1 {
					margin: 0 0 8px 0;
				}
				.tasks-tabs {
					display: flex;
					gap: 32px;
					border-bottom: 1.5px solid #e0e0e0;
					margin-bottom: 16px;
				}
				.tab {
					padding: 12px 0 8px 0;
					font-size: 1.05em;
					color: #757575;
					cursor: pointer;
					border-bottom: 2px solid transparent;
				}
				.tab.active {
					color: #2196f3;
					font-weight: 600;
					border-bottom: 2.5px solid #2196f3;
				}
				.tasks-controls {
					display: flex;
					gap: 16px;
					margin-bottom: 24px;
				}
				.search-bar {
					width: 320px;
					padding: 8px 16px;
					border: 1.5px solid #e0e0e0;
					border-radius: 6px;
					font-size: 1em;
				}
				.filter-select {
					padding: 8px 12px;
					border: 1.5px solid #e0e0e0;
					border-radius: 6px;
					font-size: 1em;
				}
				.kanban-board {
					display: flex;
					gap: 24px;
				}
				.kanban-column {
					background: #f9fafb;
					border-radius: 10px;
					padding: 16px;
					flex: 1;
					min-width: 260px;
				}
				.kanban-column-header {
					font-weight: 600;
					margin-bottom: 12px;
				}
				.count {
					background: #e3f1fd;
					color: #2196f3;
					border-radius: 50%;
					padding: 2px 8px;
					font-size: 0.9em;
					margin-left: 6px;
				}
				.kanban-tasks {
					display: flex;
					flex-direction: column;
					gap: 16px;
				}
				.task-card {
					background: #fff;
					border-radius: 8px;
					box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
					padding: 16px;
					margin-bottom: 8px;
				}
				.task-title {
					font-weight: 600;
					margin-bottom: 8px;
				}
				.task-tags {
					margin-bottom: 8px;
				}
				.task-tag {
					background: #e3f1fd;
					color: #2196f3;
					border-radius: 8px;
					padding: 2px 8px;
					font-size: 0.85em;
					margin-right: 6px;
				}
				.task-meta {
					display: flex;
					align-items: center;
					gap: 10px;
					font-size: 0.95em;
				}
				.task-id {
					color: #888;
				}
				.task-avatar {
					border-radius: 50%;
					border: 1.5px solid #fff;
					margin-right: -8px;
				}
				.notifications {
					width: 270px;
					background: #fff;
					border-left: 1.5px solid #e0e0e0;
					padding: 32px 18px 0 18px;
				}
				.notif-title {
					font-weight: 600;
					margin-bottom: 18px;
				}
				.notif-list {
					list-style: none;
					padding: 0;
					margin: 0;
				}
				.notif-list li {
					margin-bottom: 14px;
					color: #444;
					font-size: 0.98em;
				}
			`}</style>
		</div>
	);
}
