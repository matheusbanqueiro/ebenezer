"use client";
import { memo, useEffect, useRef, useState } from "react";
import { ChevronLast } from "lucide-react";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { LoopIcon, SpeakerLoudIcon, SpeakerOffIcon } from "@radix-ui/react-icons";
import ModeUse from "./modeUse";

type PlayerMusicProps = {
  musics: {
    music: string;
    name: string;
  }[];
  onMusicChange: (musicName: string) => void; // Adicione essa linha
};


const PlayerMusic = ({ musics, onMusicChange }: PlayerMusicProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);


  useEffect(() => {
    const audioElement = audioRef.current;

    const updateTime = () => {
      if (audioElement) {
        setCurrentTime(audioElement.currentTime);
        setDuration(audioElement.duration);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const repeatMusic = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    };

    // Adiciona a repetição à lógica de `handleEnded`
    const handleEnded = () => {
      if (isRepeating) {
        repeatMusic();
      } else {
        nextMusic();
      }
    };

    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateTime);
      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
      audioElement.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", updateTime);
        audioElement.removeEventListener("play", handlePlay);
        audioElement.removeEventListener("pause", handlePause);
        audioElement.removeEventListener("ended", handleEnded);
      }
    };
  }, [currentMusicIndex, isRepeating]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((error) => console.log("Error playing audio:", error));
      }
    }
    onMusicChange(musics[currentMusicIndex].name);
  }, [currentMusicIndex, musics, onMusicChange]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((error) => console.log("Error playing audio:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const playAudio = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((error) => console.log("Error playing audio:", error));
    }
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  const playNextMusic = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((error) => console.log("Error playing audio:", error));
    }
  };

  const nextMusic = () => {
    const newIndex = (currentMusicIndex + 1) % musics.length;
    setCurrentMusicIndex(newIndex);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true); // Adicionado para garantir que a música comece a tocar
    playNextMusic(); // Certifica-se de tocar a próxima música
  };

  const prevMusic = () => {
    const newIndex = (currentMusicIndex - 1 + musics.length) % musics.length;
    setCurrentMusicIndex(newIndex);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true); // Adicionado para garantir que a música comece a tocar
    playNextMusic(); // Certifica-se de tocar a música anterior
  };
  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <div className="w-full">

      <div className="max-w-md mx-auto mt-8 p-4">

        <audio key={currentMusicIndex} ref={audioRef} className="w-full" muted={isMuted}>
          <source src={musics[currentMusicIndex].music} type="audio/mpeg" />
          Seu navegador não suporta o elemento de áudio.
        </audio>
        <div className="flex-col flex items-center justify-between">
          <ModeUse />
          <div className="justify-center w-full text-slate-800 dark:text-slate-50 mt-3 mb-5">
            <p className="font-bold text-3xl md:text-4xl text-center">
              {musics[currentMusicIndex].name}
            </p>
          </div>
          <div className="mt-5 flex gap-4 items-center w-full justify-around">
            <button
              onClick={toggleMute}
              className={`${!isMuted ? 'dark:text-white text-slate-800' : 'text-red-500'} `}
            >
              {isMuted ? (
                <SpeakerOffIcon className="w-5 h-5" />
              ) : (
                <SpeakerLoudIcon className="w-5 h-5" />
              )}
            </button>

            <div className="flex gap-4">
              <button onClick={prevMusic}>
                <ChevronLast className="w-6 h-6 text-red-600 rotate-180" />
              </button>
              <button
                onClick={isPlaying ? pauseAudio : playAudio}
                className="bg-red-600 hover:bg-red-600/90 text-white p-4 rounded-full"
              >
                {isPlaying ? (
                  <PauseIcon className="w-6 h-6" />
                ) : (
                  <PlayIcon className="w-6 h-6" />
                )}
              </button>
              <button onClick={nextMusic}>
                <ChevronLast className="w-6 h-6 text-red-600" />
              </button>
            </div>
            <button
              onClick={() => setIsRepeating(!isRepeating)}
              className={`${isRepeating ? "text-red-500" : "dark:text-white text-slate-800"}`}
            >
              <LoopIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="relative w-full mt-4">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 dark:bg-slate-700 bg-slate-300 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #931616 ${(currentTime / duration) * 100
                  }%, #ccc ${(currentTime / duration) * 100}%)`,
              }}
            />
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 16px;
                height: 16px;
                background: #dc2626;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
              }
              input[type="range"]::-moz-range-thumb {
                width: 16px;
                height: 16px;
                background: #DC2626;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
              }
            `}</style>
          </div>
          <div className="text-xs flex justify-between w-full text-slate-400 mt-2">
            <p>{formatTime(currentTime)}</p>
            <p>{formatTime(duration)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PlayerMusic);
