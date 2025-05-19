import { useState, useEffect } from 'react'
import './App.css'
import { RandomNumberService } from './services/randomNumber'

interface AppProps {
  title?: string;
  initialCount?: number;
}

function App({ title = 'Adivina el Número', initialCount = 5 }: AppProps) {
  const [count, setCount] = useState(initialCount);
  const [message, setMessage] = useState('Intenta adivinar un número entre 1 y 10');
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [isCheckDisabled, setIsCheckDisabled] = useState(false);
  const [messageType, setMessageType] = useState<'neutral' | 'success' | 'error'>('neutral');
  
  useEffect(() => {
    // Generar un número aleatorio al inicio
    generateNewNumber();
  }, []);

  const generateNewNumber = () => {
    const randomNumber = RandomNumberService.getRandomNumber();
    setTargetNumber(randomNumber);
  };

  const increment = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleSubmit = () => {
    setIsCheckDisabled(true);
    
    if (count === targetNumber) {
      setMessage(`¡Felicidades! Has acertado el número ${targetNumber}! 🎉`);
      setMessageType('success');
    } else {
      setMessage(`Vaya, no era ese :( Sigue intentando.`);
      setMessageType('error');
    }
  };

  const handleReset = () => {
    generateNewNumber();
    setCount(initialCount);
    setMessage('Intenta adivinar un número entre 1 y 10');
    setMessageType('neutral');
    setIsCheckDisabled(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">{title}</h1>
      
      <div className="counter-container">
        <button 
          className="counter-button" 
          onClick={decrement}
          disabled={isCheckDisabled}
        >
          -
        </button>
        <span className="counter-value">{count}</span>
        <button 
          className="counter-button" 
          onClick={increment}
          disabled={isCheckDisabled}
        >
          +
        </button>
      </div>
      
      <div className="buttons-container">
        <button 
          className="submit-button" 
          onClick={handleSubmit}
          disabled={isCheckDisabled}
        >
          Comprobar
        </button>
        
        {isCheckDisabled && (
          <button 
            className="reset-button" 
            onClick={handleReset}
          >
            Reiniciar
          </button>
        )}
      </div>
      
      <p className={`result-message ${messageType}`}>{message}</p>
    </div>
  );
}

export default App
