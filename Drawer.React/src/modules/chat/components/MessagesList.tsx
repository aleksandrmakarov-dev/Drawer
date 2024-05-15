import List from "@/components/common/List";
import { FC } from "react";
import MessagesListItem from "./MessagesListItem";

type MessagesListItemData = {
  name?: string;
  text: string;
};

const mockMessagesList: MessagesListItemData[] = [
  { name: "Player1", text: "Hey, I'm thinking of a word. Can you guess it?" },
  { name: "Player2", text: "Sure, give me a hint." },
  { text: "Player3 joined." },
  { name: "Player2", text: "Hmm, is it apple?" },
  { name: "Player1", text: "Nope, try again." },
  { name: "Player2", text: "Okay, orange?" },
  { name: "Player3", text: "Bingo! You got it." },
  { text: "Player3 left." },
  { name: "Player1", text: "Alright, my turn. Guess the animal." },
  { name: "Player2", text: "Shoot, I'm ready." },
  { name: "Player1", text: "It's a domestic pet." },
  { name: "Player2", text: "Is it a cat?" },
  { name: "Player1", text: "Nope, keep guessing." },
  { name: "Player2", text: "Dog?" },
  { name: "Player1", text: "Correct! You're good at this." },
  { name: "Player1", text: "Let's switch to movies. Guess the film." },
  { name: "Player2", text: "Okay, I'm ready." },
  { name: "Player1", text: "It's a classic science fiction." },
  { name: "Player2", text: "Blade Runner?" },
  { name: "Player1", text: "Close, but nope." },
  { name: "Player2", text: "Hmm, 2001: A Space Odyssey?" },
  { name: "Player1", text: "Yes! You got it. Great job!" },
];

const MessagesList: FC = () => {
  return (
    <List
      className="max-h-[28rem] gap-y-2 overflow-auto"
      data={mockMessagesList}
      render={(item) => <MessagesListItem key={item.text} {...item} />}
    />
  );
};

export default MessagesList;
