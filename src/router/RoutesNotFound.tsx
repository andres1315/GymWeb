
import { Route, Routes } from "react-router";
interface Props {
  children: React.ReactNode
}

export function RoutesNotFound({children}:Props){
  return(
    <Routes>
      {children}
      <Route path="*" element={<h6>Not Found</h6>}/>
    </Routes>
  )
}