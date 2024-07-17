import { useEffect, useState } from "react";
import { useTimer } from "../../context/PomodoroContext";
import "./Timer.css";

const Timer = () => {
	const { pomodoroTime, setPomodoroTime } = useTimer();
	// const [time, setTime] = useState(pomodoroTime);
	const [isActive, setIsActive] = useState(false);

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
        <button onClick={() => setPomodoroTime(0)}>Reset</button>
			</div>
		</div>
	);
};

export default Timer;
