export const routes: Array<RouteProps> = [
  {
    name: "Dashboard",
    icon: "LayoutDashboard",
    href: "/dashboard",
    description: "Manage your learning all in one place",
  },
  {
    name: "Courses",
    icon: "BookOpen",
    href: "/courses",
    description: "Browse, enroll, and learn at your pace.",
  },
  {
    name: "Communities",
    icon: "Users",
    href: "/communities",
    description: "Connect, share, and grow with fellow learners.",
  },
  {
    name: "Blogs",
    icon: "Newspaper",
    href: "/blogs",
    description:
      "Discover insights, tips, and stories to enhance your learning.",
  },
];

export interface RouteProps {
  name: string;
  icon: string;
  href: string;
  description: string;
}
