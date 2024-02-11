import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { FirebaseError } from 'firebase/app';

interface TimerProps {
    onTimerComplete: () => void;
    onSetComplete: () => void;
    isCompleted: boolean;
}


const Timer: React.FC<TimerProps> = ( {onTimerComplete, onSetComplete, isCompleted} ) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggleTimer() {
    setIsActive(!isActive);
  }

  function resetTimer() {
    setSeconds(0);
    setIsActive(false);
  }


  const navigate = useNavigate();
  const { logout } = UserAuth();

  const handleLogout = async () => {
      try {
          await logout();
          navigate('/');
          console.log('Logged out')
      } catch (error: unknown) {
          if(error instanceof FirebaseError){
              console.log(error.code, error.message)
          } else {            
              console.log(error)
          }
      }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {!isCompleted ? (
      <>
        <div className="text-2xl font-semibold">{new Date(seconds * 1000).toISOString().substr(11, 8)}</div>
            <div className="space-x-2">
            <button
            onClick={toggleTimer}
            className="px-4 py-2 bg-[#aab1be] text-white rounded-md hover:bg-blue-700"
            >
            {isActive ? 'Pause' : 'Start'}
            </button>
            <button
            onClick={resetTimer}
            className="px-4 py-2 bg-[#778582] text-white rounded-md"
            >
            Reset
            </button>
            <button
            onClick={() => {
                onSetComplete()
                resetTimer()
            }}
            className="px-4 py-2 bg-[#788577] text-white rounded-md hover:bg-green-700"
            >
            Next Set
            </button>
            <button
            onClick={() => {
                onTimerComplete()
                resetTimer()
            }}
            className="px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-700"
            >
            Next Exercise
            </button>
        </div> 
    </>
        ): 
        (<div className='pt-56 flex flex-col items-center gap-16'>
            <p className='font-bold text-3xl text-center'> You have completed all exercises!</p>
            <p> 
            <button 
                className="bg-[#877878] mt-4 text-white font-bold py-2 px-4 rounded" 
                onClick={handleLogout}
                >Logout
                </button>
            </p>
        
        </div>)}
    </div>
  );
};

export default Timer;