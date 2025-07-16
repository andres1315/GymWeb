import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import { useSidebarMenuStore } from "@/store/useSidebarMenuStore";
import type { SidebarMenuItemType } from "@/features/Home/models/sidebar/itemsMenu";


interface Props {
  items: SidebarMenuItemType[];
  title: string;
}

export function NavItem({ items, title }: Props) {
  /* const { isMobile } = useSidebar(); */
  const currentMenuDisplayed = useSidebarMenuStore(
    (state) => state.currentMenu
  );
  const setNewSidebarMenu = useSidebarMenuStore(
    (state) => state.setCurrentSidebarMenu
  );
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              isActive={currentMenuDisplayed === item.name}
              onClick={() => setNewSidebarMenu(item.name)}
            >
              <NavLink to={item.url} end>
                <item.icon />
                <span className="group-data-[collapsible=icon]:hidden">
                  {item.label}
                </span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
       
      </SidebarMenu>
    </SidebarGroup>
  );
}
