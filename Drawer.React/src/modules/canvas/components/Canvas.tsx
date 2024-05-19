import { FC, useEffect, useRef, useState } from "react";
import { Point } from "../types";
import { useDrawerHub } from "@/providers/DrawerHubProvider";
import { useCanvas } from "../providers/CanvasProvider";

interface CanvasProps {
  width: number;
  height: number;
  canDraw?: boolean;
}

const Canvas: FC<CanvasProps> = ({ height, width }) => {
  const hub = useDrawerHub();
  const { color, lineWidth } = useCanvas();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current?.getContext("2d");

    setCtx(context);
  }, [canvasRef]);

  const getPosition = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return { x, y };
  };

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (ctx) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      const { x, y } = getPosition(e);

      ctx.moveTo(x, y);
      setIsMouseDown(true);

      hub.mouseDown({ x, y, lineWidth, color });
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (ctx && isMouseDown) {
      const { x, y } = getPosition(e);
      ctx.lineTo(x, y);
      ctx.stroke();

      hub.mouseMove({ x, y });
    }
  };

  const onMouseUp = () => {
    if (ctx) {
      ctx.closePath();
      hub.mouseUp();
    }
    setIsMouseDown(false);
  };

  return (
    <canvas
      className="bg-gray-100"
      width={width}
      height={height}
      ref={canvasRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
};

export default Canvas;
