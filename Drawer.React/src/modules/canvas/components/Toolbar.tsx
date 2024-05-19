import { FC } from "react";
import { useCanvas } from "../providers/CanvasProvider";
import { cn } from "@/lib/utils";

const hexColors = [
  "#ffffff",
  "#c1c1c1",
  "#ef130b",
  "#ff7100",
  "#ffe400",
  "#00cc00",
  "#00ff91",
  "#00b2ff",
  "#231fd3",
  "#a300ba",
  "#df69a7",
  "#ffac8e",
  "#a0522d",
  "#000000",
  "#505050",
  "#740b07",
  "#c23800",
  "#e8a200",
  "#004619",
  "#00785d",
  "#00569e",
  "#0e0865",
  "#550069",
  "#873554",
  "#cc774d",
  "#632c0d",
];

const lineWidthList = [2, 4, 8, 16, 24];

const Toolbar: FC = () => {
  const { color, setColor, lineWidth, setLineWidth } = useCanvas();

  const onChangeColor = (newColor: string) => {
    setColor(newColor);
  };

  const onChangeLineWidth = (newLineWidth: number) => {
    setLineWidth(newLineWidth);
  };

  return (
    <div className="flex items-start gap-3">
      <div className="grid grid-cols-13 gap-1 shrink-0">
        {hexColors.map((c) => (
          <div
            key={c}
            className={cn(
              "w-5 h-5 cursor-pointer hover:ring-4 hover:ring-gray-800",
              { "ring-4 ring-gray-800": c === color }
            )}
            style={{ backgroundColor: c }}
            onClick={() => onChangeColor(c)}
          />
        ))}
      </div>
      <div className="grid grid-cols-8 gap-1 shrink-0">
        {lineWidthList.map((width) => (
          <div
            className={cn(
              "flex items-center justify-center w-11 h-11 cursor-pointer bg-gray-200 hover:ring-4 hover:ring-gray-800",
              { "ring-4 ring-gray-800": width === lineWidth }
            )}
            onClick={() => onChangeLineWidth(width)}
          >
            <div
              className="bg-black rounded-full"
              style={{
                width: width,
                height: width,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
