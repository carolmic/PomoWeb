import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import { IoCloseOutline, IoSettingsOutline } from "react-icons/io5";
import { useMenu } from "../../context/MenuContext";
import { useTimer } from "../../context/PomodoroContext";
import "./MenuSettings.css";

const MenuSettings = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [time, setTime] = useState(25);
	const { setPomodoroTime } = useTimer();
	const { checked, setChecked } = useMenu();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setPomodoroTime(convertTime);
		setIsOpen(false);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
				<div className="menu_container">
					<div className="menu">
					<div className="title">
						<h1>Settings</h1>
						<IoCloseOutline onClick={() => setIsOpen(false)} size={24} />
					</div>
					<form className="form" onSubmit={handleSubmit}>
						<div className="line"></div>
						<p>Pomodoro</p>
						<input
							type="number"
							value={time}
							onChange={(e) => setTime(e.target.valueAsNumber)}
							placeholder="pomodoro"
						/>
						<div className="line"></div>
						<div className="form_component">
							<p>Dark Mode when running</p>
							<Switch checked={checked} onChange={handleChange} />
						</div>
					</form>
					</div>
					<button type="submit">
						Save
					</button>
				</div>
			)}
		</>
	);
};

export default MenuSettings;
