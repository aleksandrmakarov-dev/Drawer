import { FC, useEffect, useState } from "react";
import List from "../../../components/common/List";
import { useDrawerHub } from "@/providers/DrawerHubProvider";
import UsersListItem from "./UsersListItem";
import { UsersListItemData } from "../types";

const UsersList: FC = () => {
  const hub = useDrawerHub();
  const [users, setUsers] = useState<UsersListItemData[]>([]);

  useEffect(() => {
    hub.onJoinCallerGroup((args) =>
      setUsers((prev) => prev.concat(args.users))
    );

    hub.onJoinGroup((args) =>
      setUsers((prev) =>
        prev.concat({ id: args.caller.id, username: args.caller.username })
      )
    );

    hub.onLeaveGroup((args) =>
      setUsers((prev) => prev.filter((item) => item.id !== args.caller.id))
    );
  }, []);

  return (
    <List
      className="gap-2"
      data={users}
      render={(item) => <UsersListItem key={item.id} user={item} />}
    />
  );
};

export default UsersList;
