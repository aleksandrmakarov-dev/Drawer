import {
  JoinGroupCallerMessage,
  JoinGroupMessage,
  LeaveGroupMessage,
  MouseDownMessage,
  MousePositionMessage,
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
  onJoinCallerGroup: (
    newMethod: (args: JoinGroupCallerMessage) => void
  ) => void;
  sendText: (text: string) => void;
  onReceiveText: (newMethod: (args: ReceiveTextMessage) => void) => void;
  onLeaveGroup: (newMethod: (args: LeaveGroupMessage) => void) => void;
  mouseDown: (position: MouseDownMessage) => void;
  mouseMove: (position: MousePositionMessage) => void;
  mouseUp: () => void;
  onMouseDown: (newMethod: (args: MouseDownMessage) => void) => void;
  onMouseUp: (newMethod: () => void) => void;
  onMouseMove: (newMethod: (args: MousePositionMessage) => void) => void;
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

  const mouseDown = (position: MouseDownMessage) => {
    hub.invoke("MouseDown", position);
  };

  const mouseUp = () => {
    hub.invoke("MouseUp");
  };

  const mouseMove = (position: MousePositionMessage) => {
    hub.invoke("MouseMove", position);
  };

  const onJoinGroup = (newMethod: (args: JoinGroupMessage) => void) => {
    hub.on("JoinGroupMessage", newMethod);
  };

  const onJoinGroupCaller = (
    newMethod: (args: JoinGroupCallerMessage) => void
  ) => {
    hub.on("JoinGroupCallerMessage", newMethod);
  };

  const onReceiveText = (newMethod: (args: ReceiveTextMessage) => void) => {
    hub.on("ReceiveTextMessage", newMethod);
  };

  const onLeaveGroup = (newMethod: (args: LeaveGroupMessage) => void) => {
    hub.on("LeaveGroupMessage", newMethod);
  };

  const onMouseDown = (newMethod: (args: MouseDownMessage) => void) => {
    hub.on("MouseDownMessage", newMethod);
  };

  const onMouseMove = (newMethod: (args: MousePositionMessage) => void) => {
    hub.on("MouseMoveMessage", newMethod);
  };

  const onMouseUp = (newMethod: () => void) => {
    hub.on("MouseUpMessage", newMethod);
  };

  return (
    <DrawerHubContext.Provider
      value={{
        state: state,
        joinGroup: joinGroup,
        onJoinGroup: onJoinGroup,
        onJoinCallerGroup: onJoinGroupCaller,
        sendText: sendText,
        onReceiveText: onReceiveText,
        onLeaveGroup: onLeaveGroup,
        mouseDown: mouseDown,
        mouseUp: mouseUp,
        mouseMove: mouseMove,
        onMouseDown: onMouseDown,
        onMouseMove: onMouseMove,
        onMouseUp: onMouseUp,
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
    throw new Error("useDrawerHub can only be used inside DrawerHubContext");
  }

  return context;
};
