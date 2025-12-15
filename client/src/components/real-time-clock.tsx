import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export function RealTimeClock() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      timeZone: "America/New_York",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex items-center gap-2 text-sm" data-testid="realtime-clock">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <div className="flex flex-col items-end">
        <span className="font-semibold tabular-nums" data-testid="text-current-time">
          {formatTime(time)} EST
        </span>
        <span className="text-xs text-muted-foreground" data-testid="text-current-date">
          {formatDate(time)}
        </span>
      </div>
    </div>
  );
}

export function CompactClock() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <span className="text-sm font-medium tabular-nums" data-testid="text-compact-time">
      {formatTime(time)} EST
    </span>
  );
}
