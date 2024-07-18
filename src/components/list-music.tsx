"use client";
import { ReactNode, memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

type ListMusicProps = {};

const ListMusic = ({}: ListMusicProps) => {
  const musics = [
    {
      number: 1,
      name: "Hino 18",
    },
    {
      number: 2,
      name: "Hino 257",
    },
    {
      number: 3,
      name: "Jericó",
    },
    {
      number: 4,
      name: "Ancient of Days ( Força e Honra)",
    },
    {
      number: 5,
      name: "Shine, Jesus, Shine",
    },
    {
      number: 6,
      name: "Abertura N°7",
    },
    {
      number: 7,
      name: "578 Sossegai",
    },
    {
      number: 8,
      name: "In Chist Alone",
    },
    {
      number: 9,
      name: "Blessed Assurance",
    },
  ];

  return (
    <div className="flex flex-col gap-4 lg:ml-5 px-0 md:px-10 ml-5 mb-5">
      <h1 className="mt-4 font-bold dark:text-slate-100 text-slate-600 tracking-wide">
        Lista Músicas
      </h1>
      {musics.map((music) => (
        <div
          key={music.number}
          className="flex gap-7 items-center justify-start"
        >
          <h2 className="font-semibold sm:text-xl text-lg text-sky-600">
            {music.number}
          </h2>

          <div className="text-sm w-full text-slate-500">
            <p className="font-semibold">{music.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ListMusic);
