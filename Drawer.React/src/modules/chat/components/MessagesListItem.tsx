import { FC } from "react";

interface MessagesListItemProps {
  text: string;
  name?: string;
}

const MessagesListItem: FC<MessagesListItemProps> = ({ text, name }) => {
  return (
    <p className="text-sm">
      {name && <span className="font-medium">{name}: </span>}
      {text}
    </p>
  );
};

export default MessagesListItem;
