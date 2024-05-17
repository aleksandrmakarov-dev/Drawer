export type ObjectId = {
  id: string;
};

export type Message = {
  title: string;
  details?: string;
};

export type ProblemDetails = {
  title: string;
  status: number;
  detail?: string;
};

export type Sender = {
  id: string;
  username: string;
};

export type JoinGroupMessage = {
  groupId: string;
  sender: Sender;
};

export type ReceiveTextMessage = {
  text: string;
  sender?: Sender;
};

export type LeaveGroupMessage = {
  sender: Sender;
};

export type MessageVariant = "default" | "positive" | "negative";

export type MessagesListItemData = {
  text: string;
  sender?: string;
  variant?: MessageVariant;
};
