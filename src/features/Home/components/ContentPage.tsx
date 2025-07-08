import { Outlet } from "react-router";

export function ConntentPage() {
  return (
    <main className="flex-1  bg-background h-full">
      <Outlet />
    </main>
  );
}
