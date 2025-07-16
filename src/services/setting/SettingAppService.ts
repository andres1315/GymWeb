

import type { formAppConfig } from "@/features/Home/models/settings/formSettings";
import api from "@/utils/api/axios";

export class SettingAppService {
  private apiService;

  constructor(){
    this.apiService = api
  }

 

  store(data: formAppConfig){
    return this.apiService.post('/settings-app', data)
  }

  get(){
    return this.apiService.get('/settings-app')
  }

}