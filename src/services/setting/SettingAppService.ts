

import type { formAppConfig } from "@/features/private/settings/models/formSettings";
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