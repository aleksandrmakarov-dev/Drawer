import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card: FC<PropsWithChildren<CardProps>> = ({
  children,
  className,
  ...other
}) => {
  return (
    <div
      className={cn("bg-white border border-border p-3 rounded-sm", className)}
      {...other}
    >
      {children}
    </div>
  );
};

export default Card;
