const mainItemsSidebarMenu = {
  Dashboard: 'Dashboard',
  Members: 'Members',
  Entries: 'Entries',
  Membership: 'Membership',
  Register: 'Register',
  Customer:'Customer',
  Settings:'Settings'
} as const;


export type mainItemsSidebarMenuType = typeof mainItemsSidebarMenu[keyof typeof mainItemsSidebarMenu];

import type { LucideIcon } from "lucide-react";

export type SidebarMenuItemType = {
  label: string;
  url: string;
  icon: LucideIcon;
  name: mainItemsSidebarMenuType;
};


export {
  mainItemsSidebarMenu
}