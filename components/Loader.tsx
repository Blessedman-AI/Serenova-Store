import { useEffect, useState } from 'react';

const Loader = () => {
  const [animationDelays, setAnimationDelays] = useState([200, 400, 600]); // Initial animation delays in milliseconds

  useEffect(() => {
    // Set a new set of delays every 1.5 seconds
    const interval = setInterval(() => {
      // Shift the first delay to the end of the array
      setAnimationDelays((prevDelays) => {
        const newDelays = [...prevDelays];
        const firstDelay = newDelays.shift();
        if (firstDelay) {
          newDelays.push(firstDelay + 600); // Add 600ms to the shifted delay
        }
        return newDelays;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen space-x-2">
      {animationDelays.map((delay, index) => (
        <div
          key={index}
          style={{ animationDelay: `${delay}ms` }}
          className="animate-bounce w-4 h-4 bg-orange-1 rounded-full"
        ></div>
      ))}
    </div>
  );
};

export default Loader;
