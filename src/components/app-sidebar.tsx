import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { useSidebarMenu } from "@/features/Home/hooks/useSidebarMenu"
import { NavItem } from "./nav-main"




// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const {sideBarMenu} =  useSidebarMenu()
  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <NavItem items={sideBarMenu.main.items} title={sideBarMenu.main.title} />
        <NavItem items={sideBarMenu.config.items} title={sideBarMenu.config.title} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
