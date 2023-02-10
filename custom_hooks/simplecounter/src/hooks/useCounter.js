import { useEffect, useState } from "react";

export default function useCounter(type) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("effect")
    const interval = setInterval(() => {
      console.log("action")
      setCounter((prevCounter) => prevCounter + type);
    }, 1000);

    return () => clearInterval(interval);
  }, [type]);

  return counter
}
