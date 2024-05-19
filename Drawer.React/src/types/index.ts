import { Point } from "@/modules/canvas/types";

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

export type UserModel = {
  id: string;
  username: string;
};

export type JoinGroupMessage = {
  caller: UserModel;
};

export type JoinGroupCallerMessage = {
  groupId: string;
  caller: UserModel;
  users: UserModel[];
};

export type ReceiveTextMessage = {
  text: string;
  caller?: UserModel;
};

export type LeaveGroupMessage = {
  caller: UserModel;
};

export type MousePositionMessage = {
  x: number;
  y: number;
};

export type MouseDownMessage = {
  x: number;
  y: number;
  lineWidth: number;
  color: string;
};
