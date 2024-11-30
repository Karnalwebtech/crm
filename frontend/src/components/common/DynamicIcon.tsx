import React, { useEffect, useState } from "react";
import type { SVGProps, ComponentType } from "react";

// Extend the SVGProps to include 'size', which is specific to Lucide icons
interface LucideIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

interface DynamicIconProps {
  icon: string;
  size?: number; // Allow passing size as a prop
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ icon, size = 16 }) => {
  const [IconComponent, setIconComponent] =
    useState<ComponentType<LucideIconProps> | null>(null);

  useEffect(() => {
    // Dynamic import of Lucide icon based on the provided icon name
    import("lucide-react")
      .then((module) => {
        if (module[icon]) {
          // Cast to a component that accepts LucideIconProps
          setIconComponent(
            () => module[icon] as ComponentType<LucideIconProps>
          );
        } else {
          // console.error(`Icon '${icon}' not found in lucide-react`);
        }
      })
      .catch((error) => {
        // console.error("Error importing the icon:", error);
      });
  }, [icon]);

  return IconComponent ? (
    <IconComponent size={size} className="text-sm dark:text-red-500" /> // Passing className and size here
  ) : null;
};

export default DynamicIcon;
