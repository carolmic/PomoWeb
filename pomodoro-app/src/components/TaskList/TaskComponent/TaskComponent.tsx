import { Checkbox } from '@mui/material';
import './TaskComponent.css';
import { SlOptionsVertical } from "react-icons/sl";
import { useState } from 'react';
import TaskMenu from '../TaskMenu/TaskMenu';

const TaskComponent = () => {
	const [text, setText] = useState<string>('');
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	return (
		<>
			<div className="task_container">
				<Checkbox color='default'/>
				{isEditing ? 
				(
					<input
						type="text"
						value={text}
						onChange={(e) => 
							setText(e.target.value)
						} 
					/>
				) : 
				(
					<p>{text}</p>
				)
			}
				<SlOptionsVertical onClick={() => setIsMenuOpen(!isEditing)} />
			</div>
			{isMenuOpen && <TaskMenu isEditing={isEditing} setIsEditing={setIsEditing}/>}
		</>
	);
};

export default TaskComponent;