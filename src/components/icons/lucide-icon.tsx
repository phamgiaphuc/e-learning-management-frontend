import { icons, LucideProps } from "lucide-react";

interface LucideIconProps extends LucideProps {
  name: string;
}

const LucideIcon = ({ name, ...props }: LucideIconProps) => {
  const Icon = icons[name as keyof typeof icons];
  return Icon ? <Icon {...props} /> : <span>No icon is avaliable</span>;
};

export default LucideIcon;
