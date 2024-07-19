interface TaskMenuProps {
	isEditing: boolean;
	setIsEditing: (isEditing: boolean) => void;
}

const TaskMenu = ({ isEditing, setIsEditing }: TaskMenuProps) => {
	return (
		<div>
			<button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Save' : 'Edit'}</button>
		</div>
	);
};

export default TaskMenu;