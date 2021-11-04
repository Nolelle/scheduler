import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(nextMode, replace = false) {
    if (replace) {
      setMode((prevMode) => nextMode);
      setHistory((prevHistory) => {
        prevHistory[prevHistory.length - 1] = nextMode;
        prevHistory.pop();
        return prevHistory;
      });
    }

    setMode((prevMode) => nextMode);

    setHistory((prevHistory) => {
      prevHistory.push(nextMode);

      return prevHistory;
    });
  }

  function back() {
    setHistory((prevHistory) => {
      if (prevHistory.length === 1) {
        return prevHistory;
      }
      const copyOfHistory = [...prevHistory];
      copyOfHistory.pop();
      setMode(copyOfHistory[copyOfHistory.length - 1]);

      return copyOfHistory;
    });
  }
  return { mode, transition, back };
}
