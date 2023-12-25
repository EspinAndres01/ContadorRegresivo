import React, { useRef, useEffect, useState, useMemo } from 'react';
import './App.css';
import Countdown from './components/Countdown';
import Rick from './source/Rick.mp3';
import Gravity from './source/Gravity.mp3';

function App() {
  const targetDate = '2024-01-01T00:00:00Z';
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const audioFiles = useMemo(() => [Rick, Gravity], []);

  const playAudio = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(error => {
        console.error('Error al reproducir el audio:', error);
      });
      setIsPlaying(true);
    }
  };

  const changeSong = direction => {
    let newIndex = direction === 'next' ? currentSong + 1 : currentSong - 1;
    if (newIndex < 0) {
      newIndex = audioFiles.length - 1;
    } else if (newIndex >= audioFiles.length) {
      newIndex = 0;
    }
    setCurrentSong(newIndex);
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = audioFiles[currentSong];
    audio.load();
    if (isPlaying) {
      audio.play().catch(error => {
        console.error('Error al reproducir el audio:', error);
      });
    }
  }, [currentSong, audioFiles, isPlaying]);

  return (
    <div className="App">
      <h1 className="titulo-fijo">CUENTA REGRESIVA PARA AÑO NUEVO</h1>
      <Countdown targetDate={targetDate} />
      <audio ref={audioRef} style={{ display: 'none' }} />

      <div className="button-container">
        <button onClick={() => changeSong('previous')} className="button-style-previous">
          Anterior
        </button>
        <button onClick={playAudio} className="button-style">
          {isPlaying ? 'Pausar audio' : 'Reproducir audio'}
        </button>
        <button onClick={() => changeSong('next')} className="button-style-next">
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default App;
