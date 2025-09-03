
import {  FormSettings } from "./components/FormSettings";

function Setting(){
  return(
    <div className="flex w-full ">
      

      <div className="flex-1  overflow-auto">
        <div className=" md:mx-4 space-y-4">
          <FormSettings/>
        </div>
      </div>
    </div>
  )
  }

export default Setting;