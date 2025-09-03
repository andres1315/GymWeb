import { useFormContext, type Control } from "react-hook-form";
import type { ClientFormValues } from "../ClientForm";
import type { ActionModule } from "../..";
import { CustomCard } from "@/components/ui/customCard";
import { CheckCircle, Clock, Plus, X, XCircle } from "lucide-react";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormMessage } from "@/components/ui/form";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { diffDays } from "@formkit/tempo";
interface AssignMembershipProps {
  control: Control<ClientFormValues>;
  actionModule: ActionModule;
  memberships: { value: number; label: string }[];
}

export function AssignMembership({
  control,
  actionModule,
  memberships,
}: AssignMembershipProps) {
  const [assignMembership, setAssignMembership] = useState<boolean>(false);

  const form = useFormContext<ClientFormValues>();
  function onHandleCancelAssignMembership() {
    setAssignMembership(false);

    form.setValue("membership_to_assign", "");
    form.trigger("membership_to_assign");
  }

  const currentMembership = form.watch("memberships");
  const currentDate = new Date();
  console.log(currentMembership);
  return (
    <CustomCard title="Membresía" Icon={Clock}>
      {
        <div className="flex  justify-center gap-4 w-full">
          {currentMembership.map((membership) => (
            <div className="flex flex-col bg-stone-700/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl border-white/20 p-4 rounded-lg w-full lg:min-w-1/3 space-y-4">
              <div className="flex flex-row items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />

                <span>Estado de la suscripción: </span>
                {membership.membership_info.status === "active" ? (
                  <div className="flex flex-col items-center gap-3">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      Activa
                    </Badge>
                  </div>
                ) : (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    Inactivo
                  </Badge>
                )}
              </div>
              <div className="space-y-4 text-center p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-900/20">
                <h3 className="text-lg font-bold text-white mb-1">
                  {membership.name}
                </h3>

                <div className="text-2xl font-bold text-white mb-1">
                  ${membership.price_plan.toLocaleString()}{" "}
                  <span className="text-sm text-gray-400">COP</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Tiempo restante</span>
                  <span className="text-white font-medium">
                    {diffDays(
                      new Date(membership.membership_info.end_date),
                      currentDate
                    )}{" "}
                    días
                  </span>
                </div>
                <Progress
                  value={
                    ((new Date(membership.membership_info.end_date).getTime() -
                      currentDate.getTime()) /
                      (new Date(membership.membership_info.end_date).getTime() -
                        new Date(
                          membership.membership_info.start_date
                        ).getTime())) *
                    100
                  }
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>
                    {new Date(
                      membership.membership_info.start_date
                    ).toLocaleDateString("es-ES")}
                  </span>
                  <span>
                    {new Date(
                      membership.membership_info.end_date
                    ).toLocaleDateString("es-ES")}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {
            currentMembership.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <span className="text-white">No hay membresías asignadas o vigentes</span>
              </div>
            )
          }
        </div>
      }

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 mt-4">
        <FormField
          control={control}
          name="membership_to_assign"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membresía</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value !== undefined ? String(field.value) : ""}
                disabled={!assignMembership}
              >
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {memberships?.map((membership) => (
                    <SelectItem
                      key={membership.value}
                      value={membership.value.toString()}
                    >
                      {membership.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-end">
          <Button
            onClick={() => setAssignMembership(true)}
            type="button"
            className="w-full lg:w-fit  "
            disabled={assignMembership}
          >
            <Plus /> Asignar
          </Button>

          <Button
            onClick={onHandleCancelAssignMembership}
            variant="secondary"
            type="button"
            disabled={!assignMembership}
            /* className="w-full lg:w-fit  bg-primary/60 hover:bg-primary" */
          >
            <X />
            Cancelar
          </Button>
        </div>
      </div>
    </CustomCard>
  );
}
