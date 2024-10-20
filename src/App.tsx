import React, { useState, useEffect } from 'react';
import LuckyWheel from './components/LuckyWheel';
import Header from './components/Header';
import Footer from './components/Footer';
import { getLuckyWheelData, spinWheel, getUserBalance, getLastWinner, getMoreChances, getUserAssets } from './api/luckyWheelApi';

function App() {
  const [balance, setBalance] = useState(0);
  const [lastWinner, setLastWinner] = useState('');
  const [lastWinAmount, setLastWinAmount] = useState('');
  const [recoveringTime, setRecoveringTime] = useState(0);
  const [wheelPrizes, setWheelPrizes] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (recoveringTime > 0) {
        setRecoveringTime(prevTime => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [recoveringTime]);

  const fetchInitialData = async () => {
    try {
      const [wheelData, balanceData, lastWinnerData] = await Promise.all([
        getLuckyWheelData(),
        getUserBalance(),
        getLastWinner()
      ]);

      setWheelPrizes(wheelData.prizes);
      setRecoveringTime(wheelData.recoveringTime);
      setBalance(balanceData.balance);
      setLastWinner(lastWinnerData.winner);
      setLastWinAmount(lastWinnerData.amount);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const handleSpin = async () => {
    try {
      const result = await spinWheel();
      setRecoveringTime(result.recoveringTime);
      setBalance(result.newBalance);
      // Handle the spin result (e.g., show a modal with the prize)
      alert(`You won: ${result.prize}`);
    } catch (error) {
      console.error('Error spinning the wheel:', error);
    }
  };

  const handleGetMoreChances = async () => {
    try {
      const result = await getMoreChances();
      setBalance(result.newBalance);
      setRecoveringTime(result.recoveringTime);
      alert(`You got ${result.additionalChances} more chances!`);
    } catch (error) {
      console.error('Error getting more chances:', error);
    }
  };

  const handleViewAssets = async () => {
    try {
      const assets = await getUserAssets();
      // Handle displaying the assets (e.g., open a modal with the asset list)
      alert(`Your assets: ${JSON.stringify(assets)}`);
    } catch (error) {
      console.error('Error fetching user assets:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header balance={balance} lastWinner={lastWinner} lastWinAmount={lastWinAmount} />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <LuckyWheel onSpin={handleSpin} prizes={wheelPrizes} />
        <div className="mt-4 text-center">
          <p>Lucky Draw: 17/10</p>
          <p>Recovering: {recoveringTime > 0 ? `${Math.floor(recoveringTime / 60)}:${recoveringTime % 60 < 10 ? '0' : ''}${recoveringTime % 60}` : '- : - : -'}</p>
        </div>
        <div className="mt-4 flex space-x-4">
          <button onClick={handleGetMoreChances} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Get More Chances
          </button>
          <button onClick={handleViewAssets} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
            My Assets
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;