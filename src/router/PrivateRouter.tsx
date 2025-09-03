import { Navigate, Route } from "react-router"
import { RoutesNotFound } from "./RoutesNotFound"





import { lazy } from "react"



const Membership = lazy(()=> import('@/features/private/membership'))
const PrivateLayout = lazy(()=> import('@/features/private/layout/PrivateLayout'))
const Dashboard = lazy(()=> import('@/features/private/dashboard'))
const Setting = lazy(()=> import('@/features/private/settings'))
const Client = lazy(()=> import('@/features/private/clients'))

 const PrivateRouter = () =>{
  return (
    <RoutesNotFound>
      <Route path="/" element={<PrivateLayout/>} >
        <Route path="/" element={<Navigate to="/home/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/membership" element={<Membership/>} />
        <Route path="/clients" element={<Client/>} />
        <Route path="/settings" element={<Setting/>} />
      </Route>
    </RoutesNotFound>
  )
}

export default PrivateRouter