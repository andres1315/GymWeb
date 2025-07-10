/* import { Login } from "@/features/Login/pages/Login" */
import { BrowserRouter, Navigate, Route } from "react-router"
import { PrivateGuard } from "./PrivateGuard"

import { RoutesNotFound } from "./RoutesNotFound"
import { Suspense,lazy } from "react"
import { Toaster } from "@/components/ui/sonner"

const Login = lazy(()=> import('@/features/Login/page/Login'))
const PrivateRouter = lazy(()=> import('./PrivateRouter'))



export const AppRouter = () =>{
  return (
    <Suspense fallback={<>Cargando</>}>

      <BrowserRouter>
        <RoutesNotFound>
          <Route path='/' element={<Navigate to="/home/" replace/>} />
          <Route path='/login' element={<Login/>} />
          <Route element={<PrivateGuard/>}>
            <Route path="/home/*" element={<PrivateRouter/>}/>
          </Route>
          <Route path="*" element={<>Not found</>} />
        </RoutesNotFound>
      </BrowserRouter>
      <Toaster />
    </Suspense>
  )
}