import { useState, useEffect } from "react";
import { Clock, MapPin } from "lucide-react";

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
      hour12: true,
    });
  };

  const formatSeconds = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
      second: "2-digit",
    }).slice(-2);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div 
      className="relative overflow-visible rounded-md bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 px-4 py-2 shadow-sm"
      data-testid="realtime-clock"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20">
          <Clock className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold tabular-nums tracking-tight" data-testid="text-current-time">
              {formatTime(time)}
            </span>
            <span className="text-xs font-medium text-primary tabular-nums">
              :{formatSeconds(time)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span data-testid="text-current-date">Erie, PA</span>
            <span className="text-muted-foreground/50">|</span>
            <span>{formatDate(time)}</span>
          </div>
        </div>
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
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20">
      <Clock className="h-4 w-4 text-primary" />
      <span className="text-sm font-semibold tabular-nums" data-testid="text-compact-time">
        {formatTime(time)}
      </span>
    </div>
  );
}

export function HeroClock() {
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

  const formatSeconds = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
      second: "2-digit",
    }).slice(-2);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      timeZone: "America/New_York",
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div 
      className="inline-flex flex-col items-center gap-2 px-6 py-4 rounded-md bg-black/30 backdrop-blur-md border border-white/20 shadow-lg"
      data-testid="hero-clock"
    >
      <div className="flex items-center gap-2 text-white/70">
        <MapPin className="h-4 w-4" />
        <span className="text-sm font-medium">Erie, Pennsylvania</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold tabular-nums tracking-tight text-white">
          {formatTime(time)}
        </span>
        <span className="text-lg font-medium text-white/60 tabular-nums">
          :{formatSeconds(time)}
        </span>
      </div>
      <div className="flex items-center gap-2 text-white/60">
        <Clock className="h-3.5 w-3.5" />
        <span className="text-sm">{formatDate(time)}</span>
        <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 font-medium">EST</span>
      </div>
    </div>
  );
}
