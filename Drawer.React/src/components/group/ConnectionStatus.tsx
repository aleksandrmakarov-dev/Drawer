import { cn } from "@/lib/utils";
import { useDrawerHub } from "@/providers/DrawerHubProvider";
import { HubConnectionState } from "@microsoft/signalr";

const ConnectionStatus = () => {
  const { state } = useDrawerHub();

  return (
    <div className="flex items-center">
      <span
        className={cn("w-4 h-4 bg-orange-500 rounded-full block mr-1", {
          "bg-red-500": state === HubConnectionState.Disconnected,
          "bg-green-500": state === HubConnectionState.Connected,
        })}
      />
      <span>{state}</span>
    </div>
  );
};

export default ConnectionStatus;
