import React from 'react';
import { X } from 'lucide-react';

interface HeaderProps {
  balance: number;
  lastWinner: string;
  lastWinAmount: string;
}

const Header: React.FC<HeaderProps> = ({ balance, lastWinner, lastWinAmount }) => {
  return (
    <header className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <button className="text-white">
          <X size={24} />
        </button>
        <h1 className="text-xl font-bold">Pumpad Official</h1>
        <div className="w-6"></div>
      </div>
      <div className="mt-2 bg-green-500 rounded-full py-1 px-4 text-center">
        <p className="text-sm">
          {lastWinner} has withdrawn {lastWinAmount} successfully
        </p>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <img src="/coin.png" alt="Coin" className="w-8 h-8 mr-2" />
        <span className="text-2xl font-bold">{balance.toLocaleString()}</span>
      </div>
    </header>
  );
};

export default Header;