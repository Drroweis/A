import React from 'react';
import { Gift, Users, Target } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 p-4">
      <div className="flex justify-around">
        <button className="flex flex-col items-center text-green-500">
          <Gift size={24} />
          <span className="text-xs mt-1">LOTTERY</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <Users size={24} />
          <span className="text-xs mt-1">REFERRAL</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <Target size={24} />
          <span className="text-xs mt-1">QUEST</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;