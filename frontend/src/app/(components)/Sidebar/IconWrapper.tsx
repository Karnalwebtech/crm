import { cn } from "@nextui-org/react";
import { ReactNode } from "react";
interface IconWrapperProps {
  children: ReactNode;
  isSidebarCollapsed?: boolean;
  className?: string; // Optional className, in case it’s not passed
}
export const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  className, isSidebarCollapsed
}) => (
  <div
    className={cn(
      className,
      `flex items-center rounded-small justify-center ${isSidebarCollapsed ? "w-[44px]" : "w-7px"} h-7`
    )}
  >
    {children}
  </div>
);
