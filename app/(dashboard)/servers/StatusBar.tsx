import React from "react";
import Image from "next/image";

type Status = "online" | "idle" | "dnd" | "invisible";

interface StatusBarProps {
  setStatusBar: (status: Status) => void;
  setStatusIsOn: (isOn: boolean) => void;
}

const StatusBar: React.FC<StatusBarProps> = ({
  setStatusBar,
  setStatusIsOn,
}) => {
  const statuses: { name: Status; icon: JSX.Element }[] = [
    {
      name: "online",
      icon: <Image src={"/online.png"} height={10} width={10} alt={"online"} />,
    },
    {
      name: "idle",
      icon: <Image src={"/idle.png"} height={10} width={10} alt={"idle"} />,
    },
    {
      name: "dnd",
      icon: <Image src={"/dnd.png"} height={10} width={10} alt={"dnd"} />,
    },
    {
      name: "invisible",
      icon: (
        <Image
          src={"/invisible.png"}
          height={10}
          width={10}
          alt={"invisible"}
        />
      ),
    },
  ];

  const handleStatusChange = (status: Status) => {
    setStatusBar(status);
    setStatusIsOn(false);
  };

  return (
    <div className=" m-[2vh] bg-[#41444b] rounded-md shadow-lg p-2 w-48 z-10 absolute bottom-[7vh]">
      <h3 className="text-white text-sm font-semibold mb-2 px-2">Set Status</h3>
      <div className="w-[100%] h-[2px] bg-[#6a707c] rounded-full my-[.5vh]"></div>
      {statuses.map((status) => (
        <button
          key={status.name}
          className="flex items-center w-full px-2 py-1.5 text-gray-300 hover:bg-[#393c42] rounded transition-colors"
          onClick={() => handleStatusChange(status.name)}
        >
          <span className="mr-2">{status.icon}</span>
          <span className="capitalize">{status.name}</span>
        </button>
      ))}
    </div>
  );
};

export default StatusBar;
