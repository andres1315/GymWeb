import { MembershipService } from "@/services/membership/MembershipService";
import { useMutation } from "@tanstack/react-query";
import type { FormMemberShip } from "../../components/membership/SettingMemberShip";

export function useMembershipQuery(){
  const membershipService =  new MembershipService();

  const mutateSaveMembership = useMutation({
    mutationFn: (data:FormMemberShip) => membershipService.store(data),
    onSuccess: (e) => {
      console.log(e)
    },
    onError: (error) => {
      console.log({error})
    }
  })

  return {
    mutateSaveMembership
  }
}