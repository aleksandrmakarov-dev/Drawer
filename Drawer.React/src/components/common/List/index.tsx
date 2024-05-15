import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ListProps<T> extends HTMLAttributes<HTMLDivElement> {
  data?: Array<T>;
  render: (item: T) => React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  loadingView?: React.ReactNode;
  errorView?: React.ReactNode;
  emptyView?: React.ReactNode;
}

const List = <T,>({
  className,
  data,
  render,
  isLoading,
  isError,
  loadingView = null,
  errorView = null,
  emptyView = null,
  ...other
}: ListProps<T>) => {
  if (isLoading) return loadingView;

  if (isError) return errorView;

  if (data?.length === 0) return emptyView;

  return (
    <div className={cn("flex flex-col p-2", className)} {...other}>
      {data?.map((item) => render(item))}
    </div>
  );
};

export default List;
