import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface Prize {
  name: string;
  color: string;
  icon: string;
}

interface LuckyWheelProps {
  onSpin: () => void;
  prizes: Prize[];
}

const LuckyWheel: React.FC<LuckyWheelProps> = ({ onSpin, prizes }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      const newRotation = rotation + 1440 + Math.random() * 360;
      setRotation(newRotation);
      onSpin();
      setTimeout(() => setIsSpinning(false), 5000);
    }
  };

  return (
    <div className="relative w-64 h-64">
      <div
        className="absolute w-full h-full rounded-full border-8 border-lime-500 overflow-hidden transition-transform duration-5000 ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {prizes.map((prize, index) => (
          <div
            key={prize.name}
            className={`absolute w-1/2 h-1/2 ${prize.color} flex items-center justify-center transform origin-bottom-right`}
            style={{ transform: `rotate(${index * (360 / prizes.length)}deg) skew(${90 - (360 / prizes.length)}deg)` }}
          >
            <div className={`transform -rotate-${index * (360 / prizes.length)} -skew-x-12 -skew-y-12 text-xl`}>
              {prize.icon}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSpin}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center"
        disabled={isSpinning}
      >
        <Play size={24} />
      </button>
    </div>
  );
};

export default LuckyWheel;