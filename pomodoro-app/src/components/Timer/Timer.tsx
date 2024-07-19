import { useEffect, useState } from "react";
import { useMenu } from "../../context/MenuContext";
import { useTimer } from "../../context/PomodoroContext";
import { useTheme } from "../../context/ThemeContext";
import BackgroundMusic from "../BackgroundMusic/BackgroundMusic";
import Button from "../Button/Button";
import "./Timer.css";

const Timer = () => {
	const { pomodoroTime, setPomodoroTime } = useTimer();
	const [isActive, setIsActive] = useState(false);
	const { toggleTheme } = useTheme();
	const { checked } = useMenu();

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		if (isActive) {
			interval = setInterval(() => {
				setPomodoroTime((prevTime) => {
					if (prevTime <= 1) {
						clearInterval(interval);
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [isActive]);

	const startTimer = () => {
		if (checked) {
			toggleTheme();
		}
		setIsActive(true);
	};

	const stopTimer = () => {
		if (checked) {
			toggleTheme();
		}
		setIsActive(false);
	}

  const convertTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

	return (
		<div className="timer_container">
			<h1>{convertTime(pomodoroTime)}</h1>
			<div className="start_buttons">
				<Button text="Start" onClick={startTimer} />
				<Button text="Stop" onClick={stopTimer} />
			</div>
			{isActive && <BackgroundMusic play={isActive} />}
		</div>
	);
};

export default Timer;
