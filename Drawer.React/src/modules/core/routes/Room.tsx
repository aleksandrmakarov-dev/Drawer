import Card from "@/components/common/Card";
import Chat from "@/modules/chat/components/Chat";
import { FC } from "react";

const Room: FC = () => {
  return (
    <div className="grid grid-cols-[225px_1fr_300px] grid-rows-[auto_1fr] gap-2 w-full h-[36rem] max-h-[36rem]">
      <Card className="col-span-3">Toolbar</Card>
      <Card className="w-"></Card>
      <Card className="w-full"></Card>
      <Card>
        <Chat />
      </Card>
    </div>
  );
};

export default Room;
