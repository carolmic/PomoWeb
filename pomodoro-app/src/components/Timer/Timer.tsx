import { useEffect, useState } from "react";
import { useMenu } from "../../context/MenuContext";
import { useTimer } from "../../context/PomodoroContext";
import { useTheme } from "../../context/ThemeContext";
import "./Timer.css";

const Timer = () => {
	const { pomodoroTime, setPomodoroTime } = useTimer();
	const [isActive, setIsActive] = useState(false);
	const { theme, toggleTheme } = useTheme();
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
		console.log('Tema',theme);
		if (checked) {
			toggleTheme();
		}
		setIsActive(true);
	};

  const convertTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

	return (
		<div className="timer_container">
			<h1>{convertTime(pomodoroTime)}</h1>
			<div className="start_buttons">
				<button className="start" onClick={startTimer}>Start</button>
				<button onClick={() => setIsActive(false)}>Stop</button>
			</div>
		</div>
	);
};

export default Timer;
