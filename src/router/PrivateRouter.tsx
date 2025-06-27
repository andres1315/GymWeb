import { Navigate, Route } from "react-router"
import { RoutesNotFound } from "./RoutesNotFound"

 const PrivateRouter = () =>{
  return (
    <RoutesNotFound>
      <Route element={<Navigate to="/" replace/>} />
      <Route path="/" element={} />
    </RoutesNotFound>
  )
}

export default PrivateRouter