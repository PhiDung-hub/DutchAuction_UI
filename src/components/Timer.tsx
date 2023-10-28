import { useState, useEffect } from "react";

export default function Timer({ duration }: { duration: number }) {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        }
        clearInterval(interval);
        return 0;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  // const hours = formatTime(Math.floor(seconds / 3600));
  const minutes = formatTime(Math.floor((seconds % 3600) / 60));
  const remainingSeconds = formatTime(seconds % 60);

  return (
    <div aria-label="auction-timer" className="text-right">
      <p className="text-white/50 text-xl ">Time Left</p>
      <p className="text-v3-primary text-2xl">{minutes}:{remainingSeconds}</p>
    </div>
  );

}
