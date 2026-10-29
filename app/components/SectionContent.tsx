import { ReactNode } from "react";
import { clsx } from "clsx";

interface SectionContentProps {
  children: ReactNode;
  className?: string;
}

const SectionContent = ({ children, className }: SectionContentProps) => {
  return (
    <div className={clsx("mx-auto w-full max-w-7xl gutter py-16 md:py-24", className)}>
      {children}
    </div>
  );
};

export default SectionContent;
