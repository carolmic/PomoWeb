import { useState } from "react";
import Task from "../types/Task";

const useTasks = () => {
	const [tasks, setTasks] = useState<Task[]>([]);

	const addTask = (task: Task) => {
		setTasks([...tasks, task]);
	};

	const removeTask = (id: string) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	const updateTask = (id: string, updatedTask: Task) => {
		setTasks(
			tasks.map((task) => {
				if (task.id === id) {
					task = updatedTask;
				}
				return task;
			})
		);
	};

	const getTask = (id: string) => {
		return tasks.find((task) => task.id === id);
	};

	const getAllTasks = () => {
		return tasks;
	};

	return { tasks, addTask, removeTask, updateTask, getTask, getAllTasks };
};

export default useTasks;
