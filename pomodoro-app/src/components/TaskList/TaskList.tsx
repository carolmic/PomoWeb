import TaskComponent from "./TaskComponent/TaskComponent";

const TaskList = () => {
	const task = { text: "teste", completed: false };
	return (
		<div>
			<TaskComponent task={task} onSave={(task) => {}}/>
		</div>
	);
};

export default TaskList;
