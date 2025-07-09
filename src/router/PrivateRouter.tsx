import { Navigate, Route } from "react-router"
import { RoutesNotFound } from "./RoutesNotFound"
import { Dashboard } from "@/features/Home/page/Dashboard"
import { Home } from "@/features/Home/page/Home"
import { PrivateLayout } from "@/features/Home/layout/PrivateLayout"
import { Membership } from "@/features/Home/page/Membership"
import { Client } from "@/features/Home/page/Client"

 const PrivateRouter = () =>{
  return (
    <RoutesNotFound>
      <Route path="/" element={<PrivateLayout/>} >
        <Route path="/" element={<Navigate to="/home/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/membership" element={<Membership/>} />
        <Route path="/clients" element={<Client/>} />
      </Route>
    </RoutesNotFound>
  )
}

export default PrivateRouter