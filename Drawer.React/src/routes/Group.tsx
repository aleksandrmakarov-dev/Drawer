import MessagesList from "@/components/chat/MessagesList";
import PostMessageForm, {
  PostMessageSchema,
} from "@/components/chat/PostMessageForm";
import Card from "@/components/common/Card";
import ConnectionStatus from "@/components/group/ConnectionStatus";
import { useDrawerHub } from "@/providers/DrawerHubProvider";
import { HubConnectionState } from "@microsoft/signalr";
import { FC, useEffect } from "react";
import { UseFormReset } from "react-hook-form";
import { useParams } from "react-router-dom";

const Group: FC = () => {
  const { id } = useParams<{ id: string }>();
  const hub = useDrawerHub();

  useEffect(() => {
    if (hub.state === HubConnectionState.Connected) {
      hub.joinGroup(id);
    }
  }, [hub.state]);

  const onSubmit = (
    values: PostMessageSchema,
    reset: UseFormReset<PostMessageSchema>
  ) => {
    hub.sendText(values.text);
    reset();
  };

  return (
    <div className="grid grid-cols-[225px_1fr_325px] grid-rows-[auto_1fr] max-w-screen-xl w-full gap-2">
      <Card className="col-span-3">
        <ConnectionStatus />
      </Card>
      <Card></Card>
      <Card></Card>
      <Card className="h-[32rem] max-h-[32rem] flex flex-col gap-3">
        <MessagesList />
        <PostMessageForm onSubmit={onSubmit} />
      </Card>
    </div>
  );
};

export default Group;
