import { Checkbox } from "@mui/material";
import { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "./TaskComponent.css";

interface TaskProps {
	task: {
		text: string;
		completed: boolean;
	};
	onSave: (task: { text: string; completed: boolean }) => void;
}

const Task = ({ task, onSave }: TaskProps) => {
	const [isEditing, setIsEditing] = useState(!task);
	const [text, setText] = useState(task ? task.text : "");
	const [isCompleted, setIsCompleted] = useState(task ? task.completed : false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleSave = () => {
		setIsEditing(false);
		onSave({ text, completed: isCompleted });
	};

	const handleCheckboxChange = () => {
		setIsCompleted(!isCompleted);
	};

	const handleEditTask = () => {
		setIsMenuOpen(false);
		setIsEditing(true);
	};

	return (
		<div className="task_conteiner">
			<div className="task">
				<div className="task_content">
					<Checkbox
						checked={isCompleted}
						onChange={handleCheckboxChange}
						color="default"
					/>
					{isEditing ? (
						<Input
							type="text"
							value={text}
							onChange={(e) => setText(e.target.value)}
							onBlur={handleSave}
							onKeyDown={(e) => {
								if (e.key === "Enter") handleSave();
							}}
							autoFocus
						/>
					) : (
						<span
							onDoubleClick={() => setIsEditing(true)}
							style={{ textDecoration: isCompleted ? "line-through" : "none" }}
						>
							{text}
						</span>
					)}
				</div>
				<SlOptionsVertical
					className="task_menu_icon"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				/>
			</div>
			{isMenuOpen && (
				<div className="task_menu">
					<Button text="Edit task" onClick={handleEditTask} />
				</div>
			)}
			{isEditing && <Button text="Save" onClick={handleSave} />}
		</div>
	);
};

export default Task;
