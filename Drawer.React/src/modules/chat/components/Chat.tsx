import { FC } from "react";
import MessagesList from "./MessagesList";
import SubmitMessageForm from "./SubmitMessageForm";

const Chat: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <MessagesList />
      <SubmitMessageForm
        onSubmit={function (values: { text: string }): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default Chat;
