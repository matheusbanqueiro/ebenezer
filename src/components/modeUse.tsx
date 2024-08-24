"use client";
import { memo } from "react";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarShortcut } from "./ui/menu-bar";
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
              Repetir a Música <MenubarShortcut><LoopIcon /></MenubarShortcut>
            </MenubarItem>
            <MenubarItem>Silenciar <MenubarShortcut><SpeakerLoudIcon /></MenubarShortcut></MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default memo(modeUse);
