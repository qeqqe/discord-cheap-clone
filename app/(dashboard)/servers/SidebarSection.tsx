"use client";

import React from "react";
import { Home, Plus } from "lucide-react";
import Image from "next/image";

interface Message {
  username: string;
  message: string;
  time: string;
  pfp: string;
}

interface Channel {
  name: string;
  messages: Message[];
}

interface Server {
  id: number;
  name: string;
  icon: string;
  channels: { channel: Channel }[];
}

interface SidebarSectionProps {
  serverData: Server[];
  onServerChange: (server: Server) => void;
}

export default function SidebarSection({
  serverData,
  onServerChange,
}: SidebarSectionProps) {
  return (
    <div className="w-[72px] bg-gradient-to-b from-[#483a4b] to-[#55617a] h-screen flex flex-col items-center py-3 gap-2">
      <div
        className="w-12 h-12 bg-[#36393f] rounded-[24px] flex items-center justify-center hover:rounded-[16px] transition-all duration-300 cursor-pointer group"
        aria-label="Home"
      >
        <Home className="text-[#dcddde] group-hover:text-white" size={24} />
      </div>

      <div className="w-8 h-[2px] bg-[#36393f] rounded-full my-1" />

      {serverData.map((server) => (
        <div
          key={server.id}
          className="w-12 h-12 bg-[#36393f] rounded-[24px] flex items-center justify-center hover:rounded-[16px] transition-all duration-300 cursor-pointer group relative"
          aria-label={server.name}
          title={server.name}
          onClick={() => onServerChange(server)}
        >
          <span className="text-[#dcddde] group-hover:text-white">
            <Image
              src={`${server.icon}`}
              width={50}
              height={50}
              alt={`${server.name}`}
              className="bg-cover w-[6.8vh] h-[6.8vh] rounded-full hover:rounded-[16px] transition-all"
            />
          </span>
        </div>
      ))}

      <div
        className="w-12 h-12 bg-[#36393f] rounded-[24px] flex items-center justify-center hover:rounded-[16px] hover:bg-[#3ba55d] transition-all duration-300 cursor-pointer group mt-2"
        aria-label="Add Server"
      >
        <Plus className="text-[#3ba55d] group-hover:text-white" size={24} />
      </div>
    </div>
  );
}
