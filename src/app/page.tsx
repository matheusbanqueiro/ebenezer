"use client"
import ListMusic from "@/components/list-music";
import PlayerMusic from "@/components/player-music";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ModeToggle } from "@/components/ui/toggle-mode";
import type { Metadata } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentMusic, setCurrentMusic] = useState("Playlist Ebenézer");

  const handleMusicChange = (musicName: string) => {
    setCurrentMusic(musicName);
  };
  useEffect(() => {
    document.title = `Ebenézer: ${currentMusic}`;
  }, [currentMusic]);

  const musicsAdoracaoInConcert = [
    {
      music: "/assets/music/adoracaoInConcert/hino18.mpga",
      name: "Hino 18",
    },
    {
      music: "/assets/music/adoracaoInConcert/hino257.mpga",
      name: "Hino 257",
    },
    {
      music: "/assets/music/adoracaoInConcert/jerico.mpga",
      name: "Jericó",
    },
    {
      music: "/assets/music/adoracaoInConcert/forca.mpga",
      name: "Ancient of Days ( Força e Honra)",
    },
    {
      music: "/assets/music/adoracaoInConcert/shine.mpga",
      name: "Shine, Jesus, Shine",
    },
    {
      music: "/assets/music/adoracaoInConcert/abertura7.mpga",
      name: "Abertura N°7",
    },
    {
      music: "/assets/music/adoracaoInConcert/sossegai.mpga",
      name: "578 Sossegai",
    },
    {
      music: "/assets/music/adoracaoInConcert/alone.mpga",
      name: "In Chist Alone",
    },
    {
      music: "/assets/music/adoracaoInConcert/blessed.mpga",
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
  const musicsCantataNatal = [
    {
      music: "/assets/music/cantataNatal/euSoQueroEstar.mpga",
      name: "Eu Só Quero Estar Onde Estás",
    },
    {
      music: "/assets/music/cantataNatal/potPourri.mpga",
      name: "Pot-Pourri de Abertura",
    },
    {
      music: "/assets/music/cantataNatal/coroaiRei.mpga",
      name: "Coroai-o Rei dos Reis",
    },
    {
      music: "/assets/music/cantataNatal/comoOvelhas.mpga",
      name: "Como Ovelhas Perdidas",
    },
    {
      music: "/assets/music/cantataNatal/forteCorajoso.mpga",
      name: "Sê Forte e Corajoso",
    },
    {
      music: "/assets/music/cantataNatal/eleFiel.mpga",
      name: "Ele é Fiel",
    },
    {
      music: "/assets/music/cantataNatal/celebrarJesus.mpga",
      name: "Venha Celebrar a Jesus",
    },
    {
      music: "/assets/music/cantataNatal/deusCaminho.mpga",
      name: "Deus Nos Mostrará Um Caminho",
    },
    {
      music: "/assets/music/cantataNatal/sobreNome.mpga",
      name: "O Nome Sobre Todos os Nomes",
    },
    {
      music: "/assets/music/cantataNatal/daiGracas.mpga",
      name: "Dai Graças",
    },
  ];
  const listMusicCantataNatal = [
    {
      number: 1,
      name: "Eu Só Quero Estar Onde Estás",
    },
    {
      number: 2,
      name: "Pot-Pourri de Abertura",
    },
    {
      number: 3,
      name: "Coroai-o Rei dos Reis",
    },
    {
      number: 4,
      name: "Como Ovelhas Perdidas",
    },
    {
      number: 5,
      name: "Sê Forte e Corajoso",
    },
    {
      number: 6,
      name: "Ele É Fiel",
    },
    {
      number: 7,
      name: "Venha Celebrar a Jesus",
    },
    {
      number: 8,
      name: "Deus Nos Mostrará Um Caminho",
    },
    {
      number: 9,
      name: "O Nome Sobre Todos os Nomes",
    },
    {
      number: 10,
      name: "Dai Graças",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-1">
        <div className="lg:flex flex-1">
          <div className="flex flex-col flex-1">
            <div className="gap-6 flex flex-col mx-auto justify-center items-center my-4">
              <ModeToggle />
              <h1 className="text-red-600 dark:text-red-500 font-bold text-3xl">
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
                  <PlayerMusic musics={musicsAdoracaoInConcert} onMusicChange={handleMusicChange}/>
                  <div className="lg:border-l">
                    <ListMusic listMusic={listMusicAdoracaoInConcert} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="cantata-natal">
                <div className="flex md:flex-row flex-col">
                  <PlayerMusic musics={musicsCantataNatal} onMusicChange={handleMusicChange}/>
                  <div className="lg:border-l">
                    <ListMusic listMusic={listMusicCantataNatal} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="bg-red-900 dark:bg-slate-900 py-2 text-xs sm:gap-5 flex items-center justify-center text-slate-100 text-center">
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
