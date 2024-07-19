interface TaskMenuProps {
	menuMessage: string;
	onClick?: () => void;
}

const TaskMenu = ({ menuMessage, onClick }: TaskMenuProps) => {
	return (
		<div>
			<button onClick={onClick}>
				{menuMessage}
			</button>
		</div>
	);
};

export default TaskMenu;
