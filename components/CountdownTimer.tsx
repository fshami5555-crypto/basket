
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endTime: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft: any = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents: any[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && interval !== 'seconds') {
      return;
    }

    timerComponents.push(
      <span key={interval} className="flex flex-col items-center">
        <span className="text-xl font-black">{timeLeft[interval] < 10 ? `0${timeLeft[interval]}` : timeLeft[interval]}</span>
        <span className="text-[10px] uppercase opacity-60">
          {interval === 'days' ? 'يوم' : interval === 'hours' ? 'ساعة' : interval === 'minutes' ? 'دقيقة' : 'ثانية'}
        </span>
      </span>
    );
  });

  return (
    <div className="flex gap-4 bg-black/80 text-white p-3 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20">
      {timerComponents.length ? timerComponents : <span className="text-sm font-bold">انتهى العرض!</span>}
    </div>
  );
};

export default CountdownTimer;
