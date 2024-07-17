import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useTimer } from "../../context/PomodoroContext";
import "./MenuSettings.css";

const MenuSettings = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [time, setTime] = useState(25);
	const { setPomodoroTime } = useTimer();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setPomodoroTime(convertTime);
    setIsOpen(false);
	};

	const convertTime = () => {
		const newTime = time * 60;
		return newTime;
	};

	useEffect(() => {
		setPomodoroTime(convertTime);
	}, []);

	return (
		<>
			<div className="settings_container">
				<button onClick={() => setIsOpen(!isOpen)} className="settings_button">
					<IoSettingsOutline size={24} />
				</button>
			</div>
			{isOpen && (
				<div className="menu">
					<h1>Settings</h1>
          <div className="line"></div>
					<form className="form" onSubmit={handleSubmit}>
            <p>Pomodoro</p>
						<input
							type="number"
							value={time}
							onChange={(e) => setTime(e.target.valueAsNumber)}
							placeholder="pomodoro"
						/>
						<button type="submit">Enviar</button>
					</form>
				</div>
			)}
		</>
	);
};

export default MenuSettings;
