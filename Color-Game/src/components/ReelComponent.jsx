import { useState, useEffect } from "react";

const ReelComponent = ({ colors, isSpinning, finalValues }) => {
  const [tempColor1, setTempColor1] = useState(0);
  const [tempColor2, setTempColor2] = useState(0);
  const [tempColor3, setTempColor3] = useState(0);

  useEffect(() => {
    if (!colors || colors.length === 0) return;
    if (!isSpinning) return;

    // Shuffle colors while spinning
    const interval = setInterval(() => {
      setTempColor1(Math.floor(Math.random() * colors.length));
      setTempColor2(Math.floor(Math.random() * colors.length));
      setTempColor3(Math.floor(Math.random() * colors.length));
    }, 90);

    return () => clearInterval(interval);
  }, [colors, isSpinning]);

  // Determine what to display: shuffling values if spinning, final values if stopped
  const display1 = isSpinning ? tempColor1 : finalValues[0];
  const display2 = isSpinning ? tempColor2 : finalValues[1];
  const display3 = isSpinning ? tempColor3 : finalValues[2];

  return (
    <>
      <div className={`reel-1 ${colors[display1]}`} ></div>
      <div className={`reel-2 ${colors[display2]}`}></div>
      <div className={`reel-3 ${colors[display3]}`}></div>
    </>
  );
}

export default ReelComponent;