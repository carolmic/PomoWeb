import './App.css';
import Timer from './components/Timer/Timer';

export default function App() {
  return (
    <div className="container">
      <img src="src/assets/Tomate.svg" alt="tomato icon" />
      <Timer initialTime={1500}/>
    </div>
  );
}