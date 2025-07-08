import { ChevronsUpDown } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import logoFitWinner from '../assets/logo.webp'

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <img src={logoFitWinner}/>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {import.meta.env.VITE_APP_ENTERPRISE_NAME}
            </span>
            <span className="truncate text-xs">{import.meta.env.VITE_APP_VERSION}</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
