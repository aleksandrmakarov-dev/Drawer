import { FC, useEffect, useState } from "react";
import List from "../common/List";
import { useDrawerHub } from "@/providers/DrawerHubProvider";
import { MessageVariant, MessagesListItemData } from "@/types";
import MessagesListItem from "./MessagesListItem";

const MessagesList: FC = () => {
  const hub = useDrawerHub();
  const [messages, setMessages] = useState<MessagesListItemData[]>([]);

  useEffect(() => {
    hub.onJoinGroup((args) => {
      handleAddMessage(
        `${args.sender.username} joined the room ${args.groupId}`,
        undefined,
        "positive"
      );
    });

    hub.onLeaveGroup((args) => {
      handleAddMessage(
        `${args.sender.username} left the room`,
        undefined,
        "negative"
      );
    });

    hub.onReceiveText((args) => {
      handleAddMessage(args.text, args.sender?.username);
    });
  }, []);

  const handleAddMessage = (
    text: string,
    sender?: string,
    variant: MessageVariant = "default"
  ) => {
    setMessages((prev) =>
      prev.concat({
        text: text,
        sender: sender,
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
