import { Outlet } from "react-router";

export function ConntentPage() {
  return (
    <div className="flex-1  bg-background  h-full overflow-hidden">
      <main className="flex  h-[calc(100vh-5rem)] relative">
        <Outlet />
      </main>
    </div>
  );
}
