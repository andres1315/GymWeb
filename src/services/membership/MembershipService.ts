
import type { FormMembership } from "@/features/Home/models/membership/formMembership";
import api from "@/utils/api/axios";

export class MembershipService {
  private apiService;

  constructor(){
    this.apiService = api
  }

 

  store(data: FormMembership){
    return this.apiService.post('/membership', data)
  }

}