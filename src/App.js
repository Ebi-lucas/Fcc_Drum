import { useEffect, useState } from 'react';
import './App.css';

const audioClips = [
  { key: 'Q', 
    id: 'Heater-1', 
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' 
  },
  { key: 'W', 
    id: 'Heater-2', 
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' 
  },
  { key: 'E', 
    id: 'Heater-3', 
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' 
  },
  { key: 'A', 
    id: 'Heater-4', 
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' 
  },
  { key: 'S', 
    id: 'Clap', 
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' 
  },
  { key: 'D', 
    id: 'Open-HH', 
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' 
  },
  { key: 'Z', 
    id: "Kick-n'-Hat", 
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' 
  },
  { key: 'X', 
    id: 'Kick', 
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' 
  },
  { key: 'C', 
    id: 'Closed-HH', 
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' 
  }
];

function App() {
  const [display, setDisplay] = useState('');

  const appStyle = {
    backgroundImage: 'url("/drums.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  const playSound = (clip) => {
    const audio = document.getElementById(clip.key);
    if (!audio) return;

    const playAudio = () => {
      audio.currentTime = 0;
      audio.play().catch((err) => {
        console.warn(`Playback failed for ${clip.id}:`, err);
      });
      setDisplay(clip.id);
    };

    if (audio.readyState >= 2) {
      playAudio();
    } else {
      audio.oncanplaythrough = () => {
        playAudio();
      };
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const clip = audioClips.find(c => c.key === e.key.toUpperCase());
      if (clip) {
        playSound(clip);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={appStyle}>
      <div id="drum-machine" className="container">
        <div id="display" className="display">{display}</div>
        <div className="pad-container">
          {audioClips.map(clip => (
            <div
              key={clip.key}
              id={clip.id}
              className="drum-pad"
              onClick={() => playSound(clip)}
            >
              {clip.key}
              <audio
                className="clip"
                id={clip.key}
                src={clip.url}
                preload="auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
