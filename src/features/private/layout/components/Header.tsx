import { ToggleTheme } from "@/components/ToggleTheme";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebarMenu } from "../../sidebar/hooks/useSidebarMenu";



export function Header() {
  const { MenuScreenSelected } = useSidebarMenu();
  console.log({MenuScreenSelected})
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1 text-primary transition-colors hover:bg-primary/5" />

      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {MenuScreenSelected && MenuScreenSelected.label}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <ToggleTheme />
      </div>
    </header>
  );
}
