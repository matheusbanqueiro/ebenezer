"use client";
import ListMusic from "@/components/list-music";
import PlayerMusic from "@/components/player-music";
import { ModeToggle } from "@/components/ui/toggle-mode";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-1">
        <div className="lg:flex flex-1">
          <div className="flex flex-col flex-1">
            <div className="gap-6 flex flex-col mx-auto justify-center items-center my-4">
              <ModeToggle />
              <h1 className="text-sky-600 dark:text-sky-500 font-bold text-3xl">
                Playlist Ebenézer
              </h1>
            </div>
            <PlayerMusic />
          </div>
          <div className="lg:border-l">
            <ListMusic />
          </div>
        </div>
      </main>

      <footer className="bg-sky-900 dark:bg-slate-900 py-2 text-xs sm:gap-5 flex items-center justify-center text-slate-100 text-center">
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
    </div>
  );
}
