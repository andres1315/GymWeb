import { useMutation, useQuery } from "@tanstack/react-query";
import type { formAppConfig } from "../../models/settings/formSettings";
import { SettingAppService } from "@/services/setting/SettingAppService";


export function useSettingQuery(){
  const settingAppService =  new SettingAppService();

  const mutateSaveSettingApp = useMutation({
    mutationFn: (data:formAppConfig) => settingAppService.store(data),
    onSuccess: (e) => {
      console.log(e)
    },
    onError: (error) => {
      console.log({error})
    }
  })

  function GetConfigApp(){
    return useQuery({
      queryKey: ['GetConfigApp'],
      queryFn: () => settingAppService.get()    
    })
  }

  return {
    mutateSaveSettingApp,
    GetConfigApp
  }
}