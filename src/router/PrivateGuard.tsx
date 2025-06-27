import { useUserStore } from "@/store/useUserStore"
import { Navigate, Outlet } from "react-router";

export const PrivateGuard=()=>{
  const isLogin = useUserStore((state)=>state.isLogin)
  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
}