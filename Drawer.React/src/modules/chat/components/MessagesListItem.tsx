import { cn } from "@/lib/utils";
import { FC } from "react";
import { MessagesListItemData } from "../types";

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
      {message.caller && <span className="font-medium">{message.caller}</span>}{" "}
      {message.text}
    </p>
  );
};

export default MessagesListItem;
