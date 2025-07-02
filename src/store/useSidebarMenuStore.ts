
import { mainItemsSidebarMenu } from '@/common/enums';
import { create } from 'zustand'

interface State {
  currentMenu: string,
  mainItemsSidebarMenu: mainItemsSidebarMenu[]
}

interface Action{
  setCurrentSidebarMenu: (sideBarMenuname:mainItemsSidebarMenu) => void
}

export const useSidebarMenuStore = create<State & Action>((set) => ({
  currentMenu: mainItemsSidebarMenu.Dashboard,
  mainItemsSidebarMenu: Object.values(mainItemsSidebarMenu),
  setCurrentSidebarMenu: (sideBarMenuname:mainItemsSidebarMenu) => {
    set({ currentMenu: sideBarMenuname })
  }
  

}));