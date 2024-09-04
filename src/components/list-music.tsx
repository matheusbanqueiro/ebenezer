"use client";
import { ReactNode, memo, useEffect, useRef, useState } from "react";
type ListMusicProps = {
  listMusic: {
    number: number;
    name: string;
  }[];
};

const ListMusic = ({ listMusic }: ListMusicProps) => {
  return (
    <div className="flex flex-col gap-4 lg:ml-5 px-0 md:px-10 ml-5 mb-5">
      <h1 className="mt-4 font-bold dark:text-slate-100 text-slate-600 tracking-wide">
        Lista Músicas
      </h1>
      {listMusic.map((music) => (
        <div
          key={music.number}
          className="flex gap-7 items-center justify-start"
        >
          <h2 className="font-semibold sm:text-xl text-lg text-red-600">
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
