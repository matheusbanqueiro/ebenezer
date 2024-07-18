"use client";
import PlayerMusic from "@/components/player-music";
import { ModeToggle } from "@/components/ui/toggle-mode";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen justify-between">
      <div className="gap-6 flex flex-col mx-auto justify-center items-center my-4">
        <ModeToggle />
        <h1 className="text-sky-600 dark:text-sky-500 font-bold text-3xl">
          Playlist Ebenézer
        </h1>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <PlayerMusic />
      </div>
      
      <footer className="mt-8 bg-sky-900 dark:bg-slate-900 py-2 text-xs sm:gap-5 flex items-center justify-center text-slate-100 text-center">
        <p>Desenvolvido por</p>
        <Image
          src={"/assets/synchrony-studio.svg"}
          width={40}
          height={40}
          alt="logo desenvolvedor"
          className="sm:w-8 w-6"
        />
        <p>synchrony studio</p>
      </footer>
    </main>
  );
}
