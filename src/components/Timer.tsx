import { useEffect, useState } from "react";

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  
  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds((previousSeconds) => previousSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div>
      <h1>Cronómetro</h1>

      <h2>{seconds} segundos</h2>

      <button onClick={() => setIsRunning(true)}>
        Start
      </button>

      <button onClick={stop}>
        Stop
      </button>

      <button onClick={reset}>
        Reset
      </button>
    </div>
  );
}