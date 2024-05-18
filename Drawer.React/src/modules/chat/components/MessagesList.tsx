import { FC, useEffect, useState } from "react";
import List from "../../../components/common/List";
import { useDrawerHub } from "@/providers/DrawerHubProvider";
import MessagesListItem from "./MessagesListItem";
import { MessagesListItemData, MessageVariant } from "../types";

const MessagesList: FC = () => {
  const hub = useDrawerHub();
  const [messages, setMessages] = useState<MessagesListItemData[]>([]);

  useEffect(() => {
    hub.onJoinCallerGroup((args) => {
      handleAddMessage(
        `${args.caller.username} is owner of the ${args.groupId}`,
        undefined,
        "positive"
      );
    });

    hub.onJoinGroup((args) => {
      handleAddMessage(
        `${args.caller.username} joined the room`,
        undefined,
        "positive"
      );
    });

    hub.onLeaveGroup((args) => {
      handleAddMessage(
        `${args.caller.username} left the room`,
        undefined,
        "negative"
      );
    });

    hub.onReceiveText((args) => {
      handleAddMessage(args.text, args.caller?.username);
    });
  }, []);

  const handleAddMessage = (
    text: string,
    caller?: string,
    variant: MessageVariant = "default"
  ) => {
    setMessages((prev) =>
      prev.concat({
        text: text,
        caller: caller,
        variant: variant,
      })
    );
  };

  return (
    <List
      className="grow overflow-auto"
      data={messages}
      render={(item) => <MessagesListItem message={item} />}
    />
  );
};

export default MessagesList;
