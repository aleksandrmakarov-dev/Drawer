import { cn } from "@/lib/utils";
import { MessagesListItemData } from "@/types";
import { FC } from "react";

interface MessagesListItemProps {
  message: MessagesListItemData;
}

const MessagesListItem: FC<MessagesListItemProps> = ({ message }) => {
  return (
    <p
      className={cn("text-sm", {
        "text-red-500 font-medium": message.variant === "negative",
        "text-green-600 font-medium": message.variant === "positive",
      })}
    >
      {message.sender && <span className="font-medium">{message.sender}</span>}{" "}
      {message.text}
    </p>
  );
};

export default MessagesListItem;
