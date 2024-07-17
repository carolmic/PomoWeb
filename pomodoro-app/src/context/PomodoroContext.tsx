import React, { createContext, ReactNode, useContext, useState } from "react";

interface PomodoroContextProps {
  pomodoroTime: number;
  setPomodoroTime: React.Dispatch<React.SetStateAction<number>>;
}

const PomodoroContext = createContext<PomodoroContextProps | undefined>(undefined);

export const PomodoroProvider: React.FC<{ children: ReactNode}> = ({ children }) => {
  const [pomodoroTime, setPomodoroTime] = useState(1500);

  return (
    <PomodoroContext.Provider value={{ pomodoroTime, setPomodoroTime }}>
      {children}
    </PomodoroContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};