import { FC } from "react";
import { UsersListItemData } from "../types";
import { UserRound } from "lucide-react";

interface UsersListItemProps {
  user: UsersListItemData;
}

const UsersListItem: FC<UsersListItemProps> = ({ user }) => {
  return (
    <div className="flex items-center">
      <UserRound className="mr-1.5" />
      <p className="text-sm font-medium">{user.username}</p>
    </div>
  );
};

export default UsersListItem;
