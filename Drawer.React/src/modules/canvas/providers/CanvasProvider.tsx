import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type CanvasContextData = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  lineWidth: number;
  setLineWidth: React.Dispatch<React.SetStateAction<number>>;
};

const CanvasContext = createContext<CanvasContextData | null>(null);

const CanvasProvider: FC<PropsWithChildren> = ({ children }) => {
  const [color, setColor] = useState<string>("#000000");
  const [lineWidth, setLineWidth] = useState<number>(8);
  return (
    <CanvasContext.Provider
      value={{
        color,
        setColor,
        lineWidth,
        setLineWidth,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasProvider;

export const useCanvas = () => {
  const context = useContext<CanvasContextData | null>(CanvasContext);

  if (!context) {
    throw new Error("useCanvas can only be used inside CanvasContext");
  }

  return context;
};
