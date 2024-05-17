import {
  JoinGroupMessage,
  LeaveGroupMessage,
  ReceiveTextMessage,
} from "@/types";
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from "@microsoft/signalr";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type DrawerHubContextData = {
  state: HubConnectionState;
  joinGroup: (groupId?: string) => Promise<any> | undefined;
  onJoinGroup: (newMethod: (args: JoinGroupMessage) => void) => void;
  sendText: (text: string) => void;
  onReceiveText: (newMethod: (args: ReceiveTextMessage) => void) => void;
  onLeaveGroup: (newMethod: (args: LeaveGroupMessage) => void) => void;
};

const DrawerHubContext = createContext<DrawerHubContextData | null>(null);

const DrawerHubProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<HubConnectionState>(
    HubConnectionState.Disconnected
  );

  const [hub] = useState<HubConnection>(
    new HubConnectionBuilder()
      .withUrl("http://localhost:5217/drawer-hub")
      .build()
  );

  useEffect(() => {
    const start = async () => {
      await hub.start();
      setState(hub.state);
    };

    start();
  }, []);

  const joinGroup = (groupId?: string) => {
    return hub.invoke("JoinGroup", groupId);
  };

  const sendText = (text: string) => {
    hub.invoke("SendText", text);
  };

  const onJoinGroup = (newMethod: (args: JoinGroupMessage) => void) => {
    hub.on("JoinGroupMessage", newMethod);
  };

  const onReceiveText = (newMethod: (args: ReceiveTextMessage) => void) => {
    hub.on("ReceiveTextMessage", newMethod);
  };

  const onLeaveGroup = (newMethod: (args: LeaveGroupMessage) => void) => {
    hub.on("LeaveGroupMessage", newMethod);
  };

  return (
    <DrawerHubContext.Provider
      value={{
        state: state,
        joinGroup: joinGroup,
        onJoinGroup: onJoinGroup,
        sendText: sendText,
        onReceiveText: onReceiveText,
        onLeaveGroup: onLeaveGroup,
      }}
    >
      {children}
    </DrawerHubContext.Provider>
  );
};

export default DrawerHubProvider;

export const useDrawerHub = () => {
  const context = useContext<DrawerHubContextData | null>(DrawerHubContext);

  if (!context) {
    throw new Error("useDrawerHub can only be used inside DrawerHubProvider");
  }

  return context;
};
