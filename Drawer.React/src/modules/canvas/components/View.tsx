import { useDrawerHub } from "@/providers/DrawerHubProvider";
import { FC, useEffect, useRef, useState } from "react";

interface ViewProps {
  height: number;
  width: number;
}

const View: FC<ViewProps> = ({ height, width }) => {
  const hub = useDrawerHub();
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ctx) {
      hub.onMouseDown((args) => {
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = args.color;
        ctx.lineWidth = args.lineWidth;

        ctx.moveTo(args.x, args.y);
      });

      hub.onMouseMove((args) => {
        ctx.lineTo(args.x, args.y);
        ctx.stroke();
      });

      hub.onMouseUp(() => {
        ctx.closePath();
      });
    }
  }, [ctx]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current?.getContext("2d");

    setCtx(context);
  }, [canvasRef]);

  return (
    <canvas
      className="bg-red-50"
      ref={canvasRef}
      height={height}
      width={width}
    ></canvas>
  );
};

export default View;
