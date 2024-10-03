export const routes: Array<RouteProps> = [
  {
    name: "Dashboard",
    icon: "LayoutDashboard",
    href: "/dashboard",
  },
  {
    name: "Courses",
    icon: "BookOpen",
    href: "/courses",
  },
  {
    name: "Communities",
    icon: "Users",
    href: "/communities",
  },
  {
    name: "Blogs",
    icon: "Newspaper",
    href: "/blogs",
  },
];

export interface RouteProps {
  name: string;
  icon: string;
  href: string;
}
