"use client";
import { memo } from "react";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarShortcut,MenubarSeparator } from "./ui/menu-bar";
import { EllipsisVertical } from 'lucide-react';
import { LoopIcon, SpeakerLoudIcon } from "@radix-ui/react-icons";

const modeUse = () => {
  return (
    <div className="items-start w-full">
      <Menubar className="w-fit">
        <MenubarMenu>
          <MenubarTrigger><EllipsisVertical /></MenubarTrigger>
          <MenubarContent>
          <MenubarItem>
             Guia de Uso
            </MenubarItem>
            <MenubarSeparator></MenubarSeparator>
            <MenubarItem>
              Repete a Música <MenubarShortcut><LoopIcon /></MenubarShortcut>
            </MenubarItem>
            <MenubarItem>Silencia <MenubarShortcut><SpeakerLoudIcon /></MenubarShortcut></MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default memo(modeUse);
