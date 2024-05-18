export type MessageVariant = "default" | "positive" | "negative";

export type MessagesListItemData = {
  text: string;
  caller?: string;
  variant?: MessageVariant;
};

export type UsersListItemData = {
  id: string;
  username: string;
};
