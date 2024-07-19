import { IoAdd } from "react-icons/io5";
import useTasks from "../../hooks/useTasks";
import TaskComponent from "./TaskComponent/TaskComponent";
import "./TaskList.css";

const TaskList = () => {
	const { tasks, addTask, updateTask, removeTask } =
		useTasks();
		
	const handleAddTask = () => {
		const newTask = {
			id: Math.random().toString(36).substr(2, 9),
      text: 'Insert task name',
      pomodorosRequired: 1,
      completedPomodoros: 0,
      completed: false,
		};
		addTask(newTask);
	}

	return (
		<div className="tasklist">
			{tasks.map((task) => (
				<TaskComponent key={task.id} task={task} onSave={() => updateTask} onDelete={() => removeTask(task.id)} />
			))}
			<div className="tasklist_addtask">
				<IoAdd />
				<span onClick={handleAddTask}>Create Task</span>
			</div>
		</div>
	);
};

export default TaskList;
