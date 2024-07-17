import "./App.css";
import MenuSettings from "./components/MenuSettings/MenuSettings";
import Timer from "./components/Timer/Timer";
import { PomodoroProvider } from "./context/PomodoroContext";

export default function App() {
	return (
		<PomodoroProvider>
			<MenuSettings />
			<div className="container">
				<img src="src/assets/Tomate.svg" alt="tomato icon" />
				<Timer />
			</div>
		</PomodoroProvider>
	);
}
