import MessagesList from "@/modules/chat/components/MessagesList";
import PostMessageForm, {
  PostMessageSchema,
} from "@/modules/chat/components/PostMessageForm";
import Card from "@/components/common/Card";
import ConnectionStatus from "@/components/group/ConnectionStatus";
import { useDrawerHub } from "@/providers/DrawerHubProvider";
import { HubConnectionState } from "@microsoft/signalr";
import { FC, useEffect, useState } from "react";
import { UseFormReset } from "react-hook-form";
import { useParams } from "react-router-dom";
import UsersList from "@/modules/chat/components/UsersList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Group: FC = () => {
  const { id } = useParams<{ id: string }>();
  const hub = useDrawerHub();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    hub.onJoinCallerGroup((args) => {
      setUrl(`http://localhost:5173/${args.groupId}`);
    });
  }, []);

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
      <Card className="col-span-3 flex gap-3">
        <ConnectionStatus />
        <div className="flex gap-2">
          <Input className="grow" readOnly value={url} />
          <Button
            type="button"
            onClick={() => {
              if (url) {
                navigator.clipboard.writeText(url);
              }
            }}
          >
            Copy
          </Button>
        </div>
      </Card>
      <Card>
        <UsersList />
      </Card>
      <Card></Card>
      <Card className="h-[32rem] max-h-[32rem] flex flex-col gap-3">
        <MessagesList />
        <PostMessageForm onSubmit={onSubmit} />
      </Card>
    </div>
  );
};

export default Group;
