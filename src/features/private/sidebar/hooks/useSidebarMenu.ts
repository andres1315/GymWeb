import { useSidebarMenuStore } from "@/store/useSidebarMenuStore";
import { Frame, Map, PieChart, Settings } from "lucide-react";

import { mainItemsSidebarMenu, type SidebarMenuItemType } from "../models/itemsMenu";



const sideBarMenu = {
  main:{
    title: 'Principal',
    items:[
      {icon:Frame, label:'Dashboard',name:mainItemsSidebarMenu.Dashboard, url:"/home/dashboard"},
      {icon:PieChart, label:'Clientes',name:mainItemsSidebarMenu.Customer, url: "/home/clients",},
      {icon:Map, label:'Membresias',name:mainItemsSidebarMenu.Membership,url: "/home/membership",},    
       
    ] as SidebarMenuItemType[],
    
  },
  config:{
    title:'Configuración',
    items:[
      {icon:Settings, label:'Configuración',name:mainItemsSidebarMenu.Settings,url: "/home/settings",},    
    ] as SidebarMenuItemType[],
  }
}

export function useSidebarMenu(){
  const currentMenu = useSidebarMenuStore((state)=> state.currentMenu);
  const setNewSidebarMenu = useSidebarMenuStore(
    (state) => state.setCurrentSidebarMenu
  );

  // Unir todos los items de todas las secciones
  const allItems: SidebarMenuItemType[] = Object.values(sideBarMenu).flatMap(section => section.items);
  
  // Buscar el componente correspondiente
  const MenuScreenSelected = allItems.find(item => item.name === currentMenu);
  

  

  return {
    currentMenu,
    MenuScreenSelected,
    sideBarMenu,
    setNewSidebarMenu
  }
}