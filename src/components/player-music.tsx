"use client";
import { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLast } from "lucide-react";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";

type PlayerMusicProps = {};

const PlayerMusic = ({}: PlayerMusicProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0); // Estado para controlar o índice da música atual

  const musics = [
    {
      music: "/assets/music/hino18.mpga",
      name: "Hino 18",
    },
    {
      music: "/assets/music/hino257.mpga",
      name: "Hino 257",
    },
    {
      music: "/assets/music/jerico.mpga",
      name: "Jericó",
    },
    {
      music: "/assets/music/forca.mpga",
      name: "Ancient of Days ( Força e Honra)",
    },
    {
      music: "/assets/music/shine.mpga",
      name: "Shine, Jesus, Shine",
    },
    {
      music: "/assets/music/abertura7.mpga",
      name: "Abertura N°7",
    },
    {
      music: "/assets/music/sossegai.mpga",
      name: "578 Sossegai",
    },
    {
      music: "/assets/music/alone.mpga",
      name: "In Chist Alone",
    },
    {
      music: "/assets/music/blessed.mpga",
      name: "Blessed Assurance",
    },
  ];

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

    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateTime);
      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", updateTime);
        audioElement.removeEventListener("play", handlePlay);
        audioElement.removeEventListener("pause", handlePause);
      }
    };
  }, [currentMusicIndex, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentMusicIndex]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const playAudio = () => {
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    setIsPlaying(false);
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

  const nextMusic = () => {
    const newIndex = currentMusicIndex + 1;
    if (newIndex < musics.length) {
      setCurrentMusicIndex(newIndex);
    }
  };

  const prevMusic = () => {
    const newIndex = currentMusicIndex - 1;
    if (newIndex >= 0) {
      setCurrentMusicIndex(newIndex);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-md mx-auto mt-8 p-4">
        <audio key={currentMusicIndex} ref={audioRef} className="w-full">
          <source src={musics[currentMusicIndex].music} type="audio/mpeg" />
          Seu navegador não suporta o elemento de áudio.
        </audio>
        <div className="flex-col flex items-center justify-between">
          <div className="justify-center w-full text-slate-800 dark:text-slate-50 mt-3 mb-5">
            <p className="font-bold text-3xl md:text-4xl text-center">
              {musics[currentMusicIndex].name}
            </p>
          </div>
          <div className="mt-5 flex gap-4 items-center">
            <button onClick={prevMusic}>
              <ChevronLast className="w-6 h-6 text-sky-600 rotate-180" />
            </button>
            <button
              onClick={isPlaying ? pauseAudio : playAudio}
              className="bg-sky-600 hover:bg-sky-600/90 text-white p-4 rounded-full"
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6" />
              ) : (
                <PlayIcon className="w-6 h-6" />
              )}
            </button>
            <button onClick={nextMusic}>
              <ChevronLast className="w-6 h-6 text-sky-600" />
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
                background: `linear-gradient(to right, #0ea5e9 ${
                  (currentTime / duration) * 100
                }%, #ccc ${(currentTime / duration) * 100}%)`,
              }}
            />
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 16px;
                height: 16px;
                background: #0ea5e9;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
              }
              input[type="range"]::-moz-range-thumb {
                width: 16px;
                height: 16px;
                background: #f5e2ff;
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
