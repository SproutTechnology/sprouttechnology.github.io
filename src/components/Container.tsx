import { ReactNode } from "react";

interface Props {
    children: ReactNode;
  }

function Container({ children }: Props) {
  return (
    <div className="xl:mr-60 xl:ml-60 flex flex-col h-full">
        {children}
    </div>
  );
}

export default Container;
