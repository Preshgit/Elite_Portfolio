"use client";
import { useEffect, useState } from "react";

const word = "Trader.";

const TypewriterText = () => {
  const [displayed, setDisplayed] = useState("");
  const done = displayed.length >= word.length;

  useEffect(() => {
    if (done) return;
    const timeout = setTimeout(() => {
      setDisplayed(word.slice(0, displayed.length + 1));
    }, 120);
    return () => clearTimeout(timeout);
  }, [displayed, done]);

  return (
    <span className="text-[#F8A308] relative">
      {displayed}
      <span
        className={`inline-block w-[2px] text-[50px] h-[1em] bg-[#F8A308] ml-[2px] align-middle ${done ? "animate-[blink_1s_step-end_infinite]" : "opacity-100"
          }`}
      />
    </span>
  );
};

export default TypewriterText;
