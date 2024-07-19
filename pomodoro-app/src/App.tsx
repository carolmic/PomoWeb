import "./App.css";
import tomatoIcon from './assets/Tomate.svg';
import MenuSettings from "./components/MenuSettings/MenuSettings";
import TaskList from "./components/TaskList/TaskList";
import Timer from "./components/Timer/Timer";
import { MenuProvider } from "./context/MenuContext";
import { PomodoroProvider } from "./context/PomodoroContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const App: React.FC = () => {
	return (
		<ThemeProvider>
			<PomodoroProvider>
				<MenuProvider>
					<MainApp />
				</MenuProvider>
			</PomodoroProvider>
		</ThemeProvider>
	);
};

const MainApp: React.FC = () => {
	const { theme } = useTheme();

	return (
		<div className={`App ${theme}`}>
			<div className="container">
				<MenuSettings />
				<img src={tomatoIcon} alt="tomato icon" />
				<Timer />
				<TaskList />
			</div>
		</div>
	);
};

export default App;
