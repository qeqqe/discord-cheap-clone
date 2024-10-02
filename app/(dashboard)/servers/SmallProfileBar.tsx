"use client";
import React, { useState } from "react";
import Image from "next/image";
import { HeadphoneOff, Headphones, Mic, MicOff, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import StatusBar from "./StatusBar";

type Status = "online" | "idle" | "dnd" | "invisible";

const SmallProfileBar: React.FC = () => {
  const [mic, setMic] = useState<boolean>(false);
  const [deaf, setDeaf] = useState<boolean>(false);
  const [statusBar, setStatusBar] = useState<Status>("online");
  const [statusIsOn, setStatusIsOn] = useState<boolean>(false);
  const router = useRouter();
  const handleClick = () => {
    router.push("/settings");
  };

  return (
    <>
      {statusIsOn && (
        <StatusBar setStatusBar={setStatusBar} setStatusIsOn={setStatusIsOn} />
      )}
      <div
        className="flex items-center p-[.5vh] min-h-[7vh] bottom-0 bg-[#14171d] w-60 shadow-2xl"
        id="small-bar"
      >
        <div className="flex flex-row gap-2 " id="image-and-name-container">
          <div
            className="flex flex-row gap-2 relative hover:bg-white hover:bg-opacity-25 p-[.5vh] rounded-xl active:scale-[0.98] transition-all duration-100"
            id="image-and-status-container"
            onClick={() => setStatusIsOn((e) => !e)}
          >
            <Image
              src={"/deco.png"}
              height={22}
              width={22}
              alt={"cat ears"}
              className="absolute bottom-0 left-0 z-[10] w-[3.8vw] h-[7vh] -translate-x-[.22vh]"
            />
            <div className="relative" id="img">
              <Image
                src={"/pfp.jpeg"}
                width={22}
                height={22}
                alt="pfp"
                className="rounded-full w-[3vw]"
              />
              <Image
                src={`/${statusBar}.png`}
                width={15}
                height={15}
                alt={`${statusBar}`}
                className={`absolute bottom-0 right-0 ${
                  statusBar === "idle" ? "" : "bg-black rounded-full"
                }`}
              />
            </div>
            <div
              className="flex flex-col items-start justify-center mr-[2vh]"
              id="name-and-id-scetion"
            >
              <p className="text-sm font-[discord]">qeqqer</p>
              <p className="text-gray-400 text-[2vh] ">#0000</p>
            </div>
          </div>
          <div
            className="flex flex-row items-center justify-center gap-3 p-[1vh]"
            id="icon-section"
          >
            <div
              onClick={() => setMic((cur) => !cur)}
              className="hover:scale-[1.05] transition-all duration-100 hover:shadow-2xl active:scale-95"
            >
              {mic ? <Mic size={18} /> : <MicOff size={18} />}
            </div>
            <div
              onClick={() => setDeaf((cur) => !cur)}
              className="hover:scale-[1.05] transition-all duration-100 hover:shadow-2xl active:scale-95"
            >
              {deaf ? <HeadphoneOff size={18} /> : <Headphones size={18} />}
            </div>
            <div>
              <Settings
                size={18}
                onClick={handleClick}
                className="hover:scale-[1.05] transition-all duration-100 hover:shadow-2xl active:scale-95"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallProfileBar;
