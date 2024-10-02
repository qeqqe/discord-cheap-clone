// File: Page.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import SidebarSection from "./SidebarSection";
import SmallProfileBar from "./SmallProfileBar";
import { Hash, PlusCircle, Gift, ImagePlay, Smile } from "lucide-react";
import axios from "axios";
import Image from "next/image";

export interface Message {
  username: string;
  message: string;
  time: string;
  pfp: string;
}

export interface Channel {
  name: string;
  messages: Message[];
}

export interface User {
  userId: number;
  userName: string;
  status: "online" | "offline";
  pfp: string;
}

export interface Server {
  id: number;
  name: string;
  icon: string;
  users: User[];
  channels: { channel: Channel }[];
}

export default function Page() {
  const [serverData, setServerData] = useState<Server[]>([]);
  const [activeChannelData, setActiveChannelData] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentServer, setCurrentServer] = useState<Server | null>(null);
  const [currentChannel, setCurrentChannel] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Server[]>("http://localhost:5000/");
        setServerData(response.data);
        if (response.data.length > 0) {
          setCurrentServer(response.data[0]);
          setUsers(response.data[0].users);
          if (response.data[0].channels.length > 0) {
            setActiveChannelData(response.data[0].channels[0].channel.messages);
            setCurrentChannel(response.data[0].channels[0].channel.name);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChannelData]);

  const handleClick = (data: Channel) => {
    setActiveChannelData(data.messages);
    setCurrentChannel(data.name);
  };

  const handleServerChange = (server: Server) => {
    setCurrentServer(server);
    setUsers(server.users);
    if (server.channels.length > 0) {
      setActiveChannelData(server.channels[0].channel.messages);
      setCurrentChannel(server.channels[0].channel.name);
    } else {
      setActiveChannelData([]);
      setCurrentChannel("");
    }
  };

  return (
    <div className="flex flex-row h-screen bg-[#36393f] text-[#dcddde] overflow-hidden relative">
      <SidebarSection
        serverData={serverData}
        onServerChange={handleServerChange}
      />

      <div className="w-60 bg-gradient-to-b from-[#1e181f] to-[#2b313e] flex flex-col">
        <div className="p-4 shadow-[50px]">
          <h2 className="font-bold text-white">{currentServer?.name}</h2>
        </div>
        <div className="w-[100%] h-[.5vh] bg-black bg-opacity-15"></div>
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#1e181f] to-[#2b313e]">
          <div className="px-2 py-3">
            <h3 className="text-xs font-semibold text-[#8e9297] uppercase mb-1">
              Text Channels
            </h3>
            <div className="space-y-1">
              {currentServer?.channels.map((channel, index) => (
                <div
                  key={index}
                  className="flex items-center px-2 py-1 rounded hover:bg-[#42464d] cursor-pointer"
                  onClick={() => handleClick(channel.channel)}
                >
                  <Hash size={20} className="mr-2" />
                  <span>{channel.channel.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <SmallProfileBar />
      </div>

      <div className="flex-1 flex flex-col bg-gradient-to-br from-[rgb(17,17,17)] to-[#394461] max-w-[63.4vw]">
        <div className="h-12 flex items-center px-4 shadow-md">
          <Hash size={24} className="mr-2" />
          <h2 className="font-bold">{currentChannel}</h2>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {activeChannelData.map((message, index) => (
              <div key={index} className="flex items-start space-x-4 mb-4">
                <Image
                  src={message.pfp}
                  alt={message.username}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-semibold">{message.username}</span>
                    <span className="text-xs text-gray-400">
                      {message.time}
                    </span>
                  </div>
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4">
            <div className="bg-[rgb(153,182,255)] bg-opacity-20 rounded-lg flex items-center p-2 mr-2">
              <PlusCircle
                size={24}
                className="text-[#b9bbbe] mr-4 cursor-pointer"
              />
              <input
                type="text"
                placeholder={`Message #${currentChannel}`}
                className="bg-transparent flex-1 outline-none text-[#dcddde]"
              />
              <div className="flex space-x-2 ml-2">
                <Gift size={24} className="text-[#b9bbbe] cursor-pointer" />
                <ImagePlay
                  size={24}
                  className="text-[#b9bbbe] cursor-pointer"
                />
                <Smile size={24} className="text-[#b9bbbe] cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[15vw] pl-4 pt-4 min-h-screen absolute right-0 bg-gradient-to-b from-[rgb(17,17,17)] to-[#394461] border-l-2 border-white border-opacity-20">
        <div className="flex flex-col">
          <h1 className="font-thin">ONLINE-{users.length}</h1>
          {users.map((user) => (
            <div key={user.userId} className="flex flex-row items-center my-2">
              <div className="w-[4vw] min-h-[5vh]">
                <Image
                  src={user.pfp}
                  width={22}
                  height={22}
                  alt={user.userName}
                  className="w-[2.5vw] min-h-[3vh] rounded-full"
                />
              </div>
              <div>{user.userName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
