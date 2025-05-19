import { useState, useEffect } from 'react'
import './App.css'
import { RandomNumberService } from './services/randomNumber'

// Tipos para las props del componente
interface AppProps {
  title?: string;
  initialCount?: number;
}

// Definir tipos para los estados
type MessageType = 'neutral' | 'success' | 'error';

const App: React.FC<AppProps> = ({ title = 'Adivina el Número', initialCount = 5 }) => {
  const [count, setCount] = useState<number>(initialCount);
  const [message, setMessage] = useState<string>('Intenta adivinar un número entre 1 y 10');
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [isCheckDisabled, setIsCheckDisabled] = useState<boolean>(false);
  const [messageType, setMessageType] = useState<MessageType>('neutral');
  
  useEffect(() => {
    // Generar un número aleatorio al inicio
    generateNewNumber();
  }, []);

  const generateNewNumber = (): void => {
    const randomNumber = RandomNumberService.getRandomNumber();
    setTargetNumber(randomNumber);
  };

  const increment = (): void => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const decrement = (): void => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleSubmit = (): void => {
    setIsCheckDisabled(true);
    
    if (count === targetNumber) {
      setMessage(`¡Felicidades! Has acertado el número ${targetNumber}! 🎉`);
      setMessageType('success');
    } else {
      setMessage(`Vaya, no era ese :( Sigue intentando.`);
      setMessageType('error');
    }
  };

  const handleReset = (): void => {
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
};

export default App
