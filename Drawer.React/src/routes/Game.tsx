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
import UsersList from "@/modules/users/components/UsersList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Canvas from "@/modules/canvas/components/Canvas";
import View from "@/modules/canvas/components/View";
import Toolbar from "@/modules/canvas/components/Toolbar";
import CanvasProvider from "@/modules/canvas/providers/CanvasProvider";

const Game: FC = () => {
  const { id } = useParams<{ id: string }>();
  const hub = useDrawerHub();
  const [url, setUrl] = useState<string>();
  const [isDrawing, setIsDrawing] = useState<boolean>(true);

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
    <CanvasProvider>
      <div className="grid grid-cols-[225px_1fr_325px] grid-rows-[auto_1fr_auto] max-w-screen-xl w-full gap-2">
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
          <input
            type="checkbox"
            checked={isDrawing}
            onChange={() => setIsDrawing((prev) => !prev)}
          />
        </Card>
        <Card>
          <UsersList />
        </Card>
        <Card>
          {isDrawing ? (
            <Canvas width={685} height={475} />
          ) : (
            <View width={685} height={475} />
          )}
        </Card>
        <Card className="h-[32rem] max-h-[32rem] flex flex-col gap-3">
          <MessagesList />
          <PostMessageForm onSubmit={onSubmit} />
        </Card>
        <Card className="col-start-2">
          <Toolbar />
        </Card>
      </div>
    </CanvasProvider>
  );
};

export default Game;
