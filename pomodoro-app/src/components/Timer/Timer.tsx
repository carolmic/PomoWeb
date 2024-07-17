import { useEffect, useState } from "react";
import "./Timer.css";

interface TimerProps {
  initialTime?: number;
}

const Timer = ({initialTime}: TimerProps) => {
	const [time, setTime] = useState(initialTime || 0);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		if (isActive) {
			interval = setInterval(() => {
				setTime((prevTime) => {
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
			<h1>{convertTime(time)}</h1>
			<div className="start_buttons">
				<button className="start" onClick={startTimer}>Start</button>
				<button onClick={() => setIsActive(false)}>Stop</button>
        <button onClick={() => setTime(0)}>Reset</button>
			</div>
			{/* <div className="time_buttons">
				<button>-</button>
				<button onClick={() => setTime((prev) => prev + 1)}>+</button>
			</div> */}
		</div>
	);
};

export default Timer;
