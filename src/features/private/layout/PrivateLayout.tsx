import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { ConntentPage } from "./components/ContentPage";
import { Header } from "./components/Header";

const PrivateLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background ">
        <AppSidebar />
        <SidebarInset>
          <Header />
          <ConntentPage />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default PrivateLayout;