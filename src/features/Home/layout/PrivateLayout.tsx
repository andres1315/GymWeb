import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "../components/layout/Header";
import { ConntentPage } from "../components/layout/ContentPage";

export const PrivateLayout = () => {
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
