"use client";
import ListMusic from "@/components/list-music";
import PlayerMusic from "@/components/player-music";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ModeToggle } from "@/components/ui/toggle-mode";
import Image from "next/image";

export default function Home() {

  const musicsAdoracaoInConcert = [
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
  const listMusicAdoracaoInConcert = [
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
  const musicsCantataNatal = [];
  const listMusicCantataNatal = [];

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
            <Tabs defaultValue="cantata-natal">
              <div className="flex justify-center mt-5">
                <TabsList>
                  <TabsTrigger value="adoracao-concert">Adoracao in Concert</TabsTrigger>
                  <TabsTrigger value="cantata-natal">Cantata de Natal</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="adoracao-concert">
                <div className="flex md:flex-row flex-col">
                  <PlayerMusic musics={musicsAdoracaoInConcert} />
                  <div className="lg:border-l">
                    <ListMusic listMusic={listMusicAdoracaoInConcert} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="cantata-natal">
                <div className="flex md:flex-row flex-col gap-4 items-center justify-center font-bold text-sky-500 text-2xl md:text-4xl">
                  <Image
                    src={"/assets/storyset/cuate/time-cuate.svg"}
                    alt={"Timer"}
                    width={300}
                    height={300}
                    className=""
                  />
                  <p>Em Breve!</p>
                </div>
              </TabsContent>
            </Tabs>
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
