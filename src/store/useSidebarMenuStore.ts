

import { mainItemsSidebarMenu } from '@/features/private/sidebar/models/itemsMenu';
import { create } from 'zustand'

type mainItemsSidebarMenuType = typeof mainItemsSidebarMenu[keyof typeof mainItemsSidebarMenu];

interface State {
  currentMenu: mainItemsSidebarMenuType,
  mainItemsSidebarMenu: mainItemsSidebarMenuType[]
}

interface Action{
  setCurrentSidebarMenu: (sideBarMenuname: mainItemsSidebarMenuType) => void
}

export const useSidebarMenuStore = create<State & Action>((set) => ({
  currentMenu: mainItemsSidebarMenu.Dashboard,
  mainItemsSidebarMenu: Object.values(mainItemsSidebarMenu),
  setCurrentSidebarMenu: (sideBarMenuname: mainItemsSidebarMenuType) => {
    set({ currentMenu: sideBarMenuname })
  }
}));