import { mainItemsSidebarMenu } from "@/common/enums";
import { useSidebarMenuStore } from "@/store/useSidebarMenuStore";
import { Home, User, UserPlus } from "lucide-react";


const sideBarMenu = {
  main:{
    title: 'Principal',
    items:[
      {icon:Home, label:'Dashboard',name:mainItemsSidebarMenu.Dashboard},
      {icon:User, label:'Miembros',name:mainItemsSidebarMenu.Members},
      /* {icon:Home, label:'Accesos',name:mainItemsSidebarMenu.Entries,Component:mainItemsSidebarMenu.Entries},
      {icon:Home, label:'Membresias',name:mainItemsSidebarMenu.Membership,Component:mainItemsSidebarMenu.Membership}, */
      {icon:UserPlus, label:'Registro',name:mainItemsSidebarMenu.Register},
      
      
    ],
    
  },
  other:{
    title:'Other',
    items:[]
  }
}

export function useSidebarMenu(){
  const currentMenu = useSidebarMenuStore((state)=> state.currentMenu);
  const setNewSidebarMenu = useSidebarMenuStore(
    (state) => state.setCurrentSidebarMenu
  );

  // Unir todos los items de todas las secciones
  const allItems = Object.values(sideBarMenu).flatMap(section => section.items);

  // Buscar el componente correspondiente
  const MenuScreenSelected = allItems.find(item => item.name === currentMenu);

  

  return {
    currentMenu,
    MenuScreenSelected,
    sideBarMenu,
    setNewSidebarMenu
  }
}