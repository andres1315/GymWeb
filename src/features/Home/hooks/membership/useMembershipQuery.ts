
import { useMutation, useQuery } from "@tanstack/react-query";
import type { FormMembership } from "../../models/membership/formMembership";
import { MembershipService } from "@/services/membership/MembershipService";


export function useMembershipQuery(){
  const membershipService =  new MembershipService();

  const mutateSaveMembership = useMutation({
    mutationFn: (data:FormMembership) => membershipService.store(data),
    onSuccess: (e) => {
      console.log(e)
    },
    onError: (error) => {
      console.log({error})
    }
  })

  function GetAllMemberships(){
    return useQuery({
      queryKey: ['GetAllMemberships'],
      queryFn: () => membershipService.get()    
    })
  }

  return {
    mutateSaveMembership,
    GetAllMemberships
  }
}