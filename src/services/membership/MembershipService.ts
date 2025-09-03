
import type { FormMembership } from "@/features/private/membership/models/formMembership";
import api from "@/utils/api/axios";

export class MembershipService {
  private apiService;

  constructor(){
    this.apiService = api
  }

 

  store(data: FormMembership){
    return this.apiService.post('/membership', data)
  }

  get(){
    return this.apiService.get('/membership')
  }

}