import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "../components/Header";
import { ConntentPage } from "../components/ContentPage";

export const PrivateLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background overflow-hidden">
        <AppSidebar />
        <SidebarInset>
          <Header />
          <ConntentPage />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
