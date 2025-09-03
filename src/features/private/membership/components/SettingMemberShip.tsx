
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Clock, CreditCard, Save, Settings } from "lucide-react";
import { useForm, type FieldErrors } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomCard } from "@/components/ui/customCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DaySelector } from "@/components/DaySelector";

import {
  MembershipConfigSchema,
  type FormMembership,
} from "../models/formMembership";
import { Badge } from "@/components/ui/badge";
import type { MembershipSaved } from "../models/MembershipSaved";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  AnimatedGradientButton,
  ButtonSecondary,
  HoverBorderGradient,
} from "@/components/ui/customTheme";
import { useMembershipQuery } from "../hooks/useMembershipQuery";
import PageLoader from "@/components/page-loader";

interface Props {
  isCreate: boolean;
  selectedPlan: MembershipSaved | null;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPlan: React.Dispatch<React.SetStateAction<MembershipSaved | null>>;
}
const defaultValues = {
  name: "",
  description: "",
  generate_payment: false,
  generate_bill: false,
  generate_code_customer: false,
  generate_movement_exp_date: false,
  controlled_plan: false,
  required_list_members: false,
  can_be_invited: false,
  required_footprint: false,
  has_assessment_physical_therapy: false,
  required_gift_voucher: false,
  admission_all_sites: false,
  controls_user_access: false,
  guest_days: ["monday", "tuesday", "wednesday", "thursday", "friday"] as (
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday"
    | "holiday"
  )[],
  start_time_restriction: undefined,
  end_time_restriction: undefined,
  restriction_days: ["sunday", "holiday"] as (
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday"
    | "holiday"
  )[],
  age_restriction_type: undefined,
  age_restriction_value: undefined,

  birthday_discount: false,
  birthday_choose_gift_discount: false,
  discount_early_payment: false,
  discount_early_payment_first: false,
  increase_arrears: false,
  generate_payment_plan: false,
  start_first_day_month: false,
  contains_class_package: false,
  issues_card: false,
  capture_gift_voucher: false,
  generate_cxc: false,

  charge_registration: false,
  price_plan: 0,

  percentage_discount: 0,
  max_entry_per_day: 1,
  max_day_per_week: 0,
  min_members_group_plan: 0,
  max_members_group_plan: 0,
};
export function SettingMemberShip({
  isCreate,
  selectedPlan,
  setIsCreate,
  setSelectedPlan,
}: Props) {
  const queryClient = useQueryClient();
  const { mutateSaveMembership } = useMembershipQuery();

  const form = useForm<FormMembership>({
    resolver: zodResolver(MembershipConfigSchema),
    defaultValues,
  });

  const resetForm = form.reset;

  function onSubmit(data: z.infer<typeof MembershipConfigSchema>) {
    console.log({ data });
    mutateSaveMembership.mutate(data,{
      onSuccess: () => {
        form.reset(defaultValues);
        setIsCreate(false);
        setSelectedPlan(null);
        queryClient.invalidateQueries({ queryKey: ["GetAllMemberships"] });
      }
    });
  }

  function onInvalid(errors: FieldErrors) {
    console.log({ errors });
  }

  useEffect(() => {
    if (selectedPlan) {
      const valueFormPlanSelected = {
        /* Main config */
        name: selectedPlan.name,
        description: selectedPlan.description,
        generate_payment: Boolean(selectedPlan.generate_payment),
        generate_bill: Boolean(selectedPlan.generate_bill),
        controlled_plan: Boolean(selectedPlan.controlled_plan),
        can_be_invited: Boolean(selectedPlan.can_be_invited),
        has_assessment_physical_therapy: Boolean(
          selectedPlan.has_assessment_physical_therapy
        ),
        admission_all_sites: Boolean(selectedPlan.admission_all_sites),
        controls_user_access: Boolean(selectedPlan.controls_user_access),
        generate_movement_exp_date: Boolean(
          selectedPlan.generate_movement_exp_date
        ),
        generate_code_customer: Boolean(selectedPlan.generate_code_customer),
        required_list_members: Boolean(selectedPlan.required_list_members),
        required_footprint: Boolean(selectedPlan.required_footprint),
        required_gift_voucher: Boolean(selectedPlan.required_gift_voucher),
        charge_registration: Boolean(selectedPlan.charge_registration),

        /* Access config */
        max_entry_per_day: selectedPlan.max_entry_per_day,
        max_day_per_week: selectedPlan.max_day_per_week,
        min_members_group_plan: selectedPlan?.min_members_group_plan || 0,
        max_members_group_plan: selectedPlan?.max_members_group_plan || 0,
        guest_days: [] as (
          | "monday"
          | "tuesday"
          | "wednesday"
          | "thursday"
          | "friday"
          | "saturday"
          | "sunday"
          | "holiday"
        )[],
        start_time_restriction:
          selectedPlan.start_time_restriction || undefined,
        end_time_restriction: selectedPlan.end_time_restriction || undefined,
        restriction_days: [] as (
          | "monday"
          | "tuesday"
          | "wednesday"
          | "thursday"
          | "friday"
          | "saturday"
          | "sunday"
          | "holiday"
        )[],
        age_restriction_type: selectedPlan.age_restriction_type || undefined,
        age_restriction_value: selectedPlan.age_restriction_value || undefined,

        /* Other Config */
        birthday_discount: Boolean(selectedPlan.birthday_discount),
        discount_early_payment: Boolean(selectedPlan.discount_early_payment),
        increase_arrears: Boolean(selectedPlan.increase_arrears),
        start_first_day_month: Boolean(selectedPlan.start_first_day_month),
        issues_card: Boolean(selectedPlan.issues_card),
        generate_cxc: Boolean(selectedPlan.generate_cxc),
        birthday_choose_gift_discount: Boolean(
          selectedPlan.birthday_choose_gift_discount
        ),
        discount_early_payment_first: Boolean(
          selectedPlan.discount_early_payment_first
        ),
        generate_payment_plan: Boolean(selectedPlan.generate_payment_plan),
        contains_class_package: Boolean(selectedPlan.contains_class_package),
        capture_gift_voucher: Boolean(selectedPlan.capture_gift_voucher),

        /* Payment config */
        type_payment: selectedPlan.type_payment,
        price_plan: selectedPlan.price_plan,
        percentage_discount: selectedPlan.percentage_discount,
        cost_center: selectedPlan.cost_center,
      };
      const guest_days = [] as (
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
        | "holiday"
      )[];
      if (selectedPlan.guest_monday) guest_days.push("monday");
      if (selectedPlan.guest_tuesday) guest_days.push("tuesday");
      if (selectedPlan.guest_wednesday) guest_days.push("wednesday");
      if (selectedPlan.guest_thursday) guest_days.push("thursday");
      if (selectedPlan.guest_friday) guest_days.push("friday");
      if (selectedPlan.guest_saturday) guest_days.push("saturday");
      if (selectedPlan.guest_sunday) guest_days.push("sunday");
      if (selectedPlan.guest_holiday) guest_days.push("holiday");
      valueFormPlanSelected.guest_days = guest_days;

      const restriction_days = [] as (
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
        | "holiday"
      )[];
      if (selectedPlan.restrictionday_monday) restriction_days.push("monday");
      if (selectedPlan.restrictionday_tuesday) restriction_days.push("tuesday");
      if (selectedPlan.restrictionday_wednesday)
        restriction_days.push("wednesday");
      if (selectedPlan.restrictionday_thursday)
        restriction_days.push("thursday");
      if (selectedPlan.restrictionday_friday) restriction_days.push("friday");
      if (selectedPlan.restrictionday_saturday)
        restriction_days.push("saturday");
      if (selectedPlan.restrictionday_sunday) restriction_days.push("sunday");
      if (selectedPlan.restrictionday_holiday) restriction_days.push("holiday");
      valueFormPlanSelected.restriction_days = restriction_days;
      resetForm(valueFormPlanSelected);
    } else {
      
      resetForm(defaultValues);
    }
  }, [selectedPlan, resetForm]);



  return (
    <Form {...form}>
      <PageLoader loading={mutateSaveMembership.isPending} />
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
        {/* main Config */}
        <CustomCard title="Configuración Principal" Icon={Settings}>
          {isCreate && (
            <Badge variant="default" className="mb-4 font-bold ">
              Creando nuevo Plan
            </Badge>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between p-2 rounded-lg bg-white/5">
                  <div className="w-full">
                    <FormControl>
                      <div>
                        <FormLabel className="">Nombre del plan</FormLabel>
                        <Input
                          type="string"
                          className="bg-white/10 border-white/20 text-white mt-1"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between p-2 rounded-lg bg-white/5">
                  <div className="w-full">
                    <FormControl>
                      <div>
                        <FormLabel>Descripción del plan</FormLabel>
                        <Input
                          type="string"
                          className="bg-white/10 border-white/20 text-white mt-1"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="generate_payment"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                    <div>
                      <FormLabel>Pago</FormLabel>
                      <FormDescription className="text-xs mt-1">
                        Generar pago.
                      </FormDescription>
                    </div>

                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="generate_movement_exp_date"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                    <div>
                      <FormLabel>Fecha de Vcto</FormLabel>
                      <FormDescription className="text-xs mt-1">
                        Generar movimiento de fecha de vencimiento.
                      </FormDescription>
                    </div>

                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="generate_bill"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div>
                    <FormLabel>Factura</FormLabel>
                    <FormDescription className="text-xs mt-1">
                      Generar factura de venta
                    </FormDescription>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="generate_code_customer"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div>
                    <FormLabel>Código de Cliente</FormLabel>
                    <FormDescription className="text-xs mt-1">
                      Generar código único por cliente
                    </FormDescription>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="controlled_plan"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div>
                    <FormLabel>Plan Controlado</FormLabel>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="required_list_members"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div>
                    <FormLabel>Lista Integrantes</FormLabel>
                    <FormDescription className="text-xs mt-1">
                      Solicita lista de Integrantes en el momento de un pago
                      grupal adicional.
                    </FormDescription>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="can_be_invited"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div>
                    <FormLabel>Afiliado puede ser Invitado</FormLabel>
                    <FormDescription className="text-xs mt-1">
                      Si el afiliado esta inscrito en este plan puede ser
                      invitado.
                    </FormDescription>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="required_footprint"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div>
                    <FormLabel>Exige Huella</FormLabel>
                    <FormDescription className="text-xs mt-1">
                      Exige validación solo con huella.
                    </FormDescription>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="has_assessment_physical_therapy"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div>
                    <FormLabel>Valoración Fisioterapia</FormLabel>
                    <FormDescription className="text-xs mt-1">
                      Incluye valoración con fisioterapia.
                    </FormDescription>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="required_gift_voucher"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div>
                    <FormLabel>Requiere Bono Regalo</FormLabel>
                    <FormDescription className="text-xs mt-1">
                      Solicita N°. de bono regalo.
                    </FormDescription>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="admission_all_sites"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div>
                    <FormLabel>Permite el ingreso a todas las sedes</FormLabel>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="charge_registration"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div>
                    <FormLabel>Cobra inscripción</FormLabel>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="controls_user_access"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div>
                    <FormLabel>
                      Controla ver ingresos de usuarios del plan
                    </FormLabel>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
                  control={form.control}
                  name="duration_days"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duración en días</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={
                          field.value ? String(field.value) : undefined
                        }
                        value={field.value ? String(field.value) : undefined}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="8">8 Días</SelectItem>
                          <SelectItem value="15">15 Días</SelectItem>
                          <SelectItem value="30">30 Días</SelectItem>
                          <SelectItem value="60">60 Días</SelectItem>
                          <SelectItem value="90">90 Días</SelectItem>
                          <SelectItem value="180">180 Días</SelectItem>
                          <SelectItem value="365">365 Días</SelectItem>
                          
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
            <div />
          </div>
        </CustomCard>

        {/* Control de Acceso */}
        <CustomCard title="Control de Acceso" Icon={Clock}>
          <div className="space-y-6">
            <div className="flex justify-between gap-6">
              <FormField
                control={form.control}
                name="max_entry_per_day"
                render={({ field }) => (
                  <FormItem className="flex flex-col  p-2 rounded-lg bg-white/5 flex-1">
                    <FormLabel>Entradas Máximas por Día</FormLabel>

                    <div className="flex items-center justify-between ">
                      <FormControl>
                        <div className="px-4 py-1 rounded-xl  w-full">
                          <Slider
                            defaultValue={[field.value]}
                            max={10}
                            min={1}
                            step={1}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="w-full"
                            value={[field.value]}
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>1</span>
                            <span className="text-emerald-400 font-medium">
                              {field.value} entradas
                            </span>
                            <span>10</span>
                          </div>
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="max_day_per_week"
                render={({ field }) => (
                  <FormItem className="flex flex-col  p-2 rounded-lg bg-white/5 flex-1">
                    <FormLabel>
                      Restricción de Número de dias por Semana
                    </FormLabel>

                    <div className="flex items-center justify-between ">
                      <FormControl>
                        <div className="px-4 py-1 rounded-xl  w-full">
                          <Slider
                            defaultValue={[field.value]}
                            max={7}
                            min={0}
                            step={1}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="w-full"
                            value={[field.value]}
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>0</span>
                            <span className="text-emerald-400 font-medium">
                              {field.value} Dia (s)
                            </span>
                            <span>7</span>
                          </div>
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col  p-2 rounded-lg bg-white/5 flex-1">
              <FormLabel>
                Si es plan Grupal, controla Minimo y Máximo N° de integrantes.
              </FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <FormField
                  control={form.control}
                  name="min_members_group_plan"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div>
                        <FormControl>
                          <div>
                            <FormLabel className="text-xs text-gray-400">
                              Minimo
                            </FormLabel>
                            <Input
                              type="number"
                              className="bg-white/10 border-white/20 text-white mt-1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="max_members_group_plan"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div>
                        <FormControl>
                          <div>
                            <FormLabel className="text-xs text-gray-400">
                              Maximo
                            </FormLabel>
                            <Input
                              type="number"
                              className="bg-white/10 border-white/20 text-white mt-1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="guest_days"
              render={({ field }) => (
                <FormItem>
                  <DaySelector
                    value={field.value || []}
                    onChange={field.onChange}
                    label="Invitado los Días"
                    description="Selecciona los días en los que el invitado puede asistir"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col  p-2 rounded-lg bg-white/5 flex-1">
              <div className="space-y-3">
                <FormLabel>Restricción de horario</FormLabel>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  <FormField
                    control={form.control}
                    name="start_time_restriction"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div>
                          <FormControl>
                            <div>
                              <FormLabel className="text-xs text-gray-400">
                                Desde
                              </FormLabel>
                              <Input
                                type="time"
                                className="bg-white/10 border-white/20 text-white mt-1"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="end_time_restriction"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div>
                          <FormControl>
                            <div>
                              <FormLabel className="text-xs text-gray-400">
                                Hasta
                              </FormLabel>
                              <Input
                                type="time"
                                className="bg-white/10 border-white/20 text-white mt-1"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="restriction_days"
              render={({ field }) => (
                <FormItem>
                  <DaySelector
                    value={field.value || []}
                    onChange={field.onChange}
                    label="Restricción los Días"
                    description="Selecciona los días en los que el plan tiene restricción"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2  p-2 rounded-lg bg-white/5  gap-6 items-end">
              <FormField
                control={form.control}
                name="age_restriction_type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Restriccion de edad</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col"
                      >
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="major" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Mayor de
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="minor" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Menor de
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age_restriction_value"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <div>
                        <FormLabel className="text-xs text-gray-400">
                          Edad
                        </FormLabel>
                        <Input
                          type="number"
                          className="bg-white/10 border-white/20 text-white mt-1"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CustomCard>

        {/* Configuración Adicional */}
        <CustomCard title="Configuración Adicional" Icon={Settings}>
          <div className="gap-6 grid grid-cols-2">
            <FormField
              control={form.control}
              name="birthday_discount"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5 col-span-2 md:col-span-1">
                  <div>
                    <FormLabel>Dcto Cumpleaños</FormLabel>
                    <FormDescription className="text-xs mt-1">
                      % Descuento mes de Cumpleaños
                    </FormDescription>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday_choose_gift_discount"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5  col-span-2 md:col-span-1">
                  <div>
                    <FormLabel>Obsequio / Dcto</FormLabel>
                    <FormDescription className="text-xs mt-1">
                      Elige Obsequio o Descuento de Cumpleaños
                    </FormDescription>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount_early_payment"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5  col-span-2 md:col-span-1">
                  <div>
                    <FormLabel>Dcto Pronto Pago</FormLabel>
                    <FormDescription className="text-xs mt-1">
                      Descento por Pronto Pago
                    </FormDescription>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount_early_payment_first"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5  col-span-2 md:col-span-1">
                  <div>
                    <FormLabel>Dcto Pronto Pago 1er pago</FormLabel>
                    <FormDescription className="text-xs mt-1">
                      Aplica Descuento Pronto Pago desde el 1er Pago
                    </FormDescription>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="increase_arrears"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5  col-span-2 md:col-span-1">
                  <div>
                    <FormLabel>Incremento por Mora en Pago</FormLabel>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="generate_payment_plan"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5  col-span-2 md:col-span-1">
                  <div>
                    <FormLabel>Genera Plan Pago</FormLabel>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_first_day_month"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5  col-span-2 md:col-span-1">
                  <div>
                    <FormLabel>Inicia 1er día del Mes</FormLabel>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contains_class_package"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5  col-span-2 md:col-span-1">
                  <div>
                    <FormLabel>Contiene paquetes de clases</FormLabel>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issues_card"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5  col-span-2 md:col-span-1">
                  <div>
                    <FormLabel>Expide FICHA</FormLabel>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capture_gift_voucher"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5  col-span-2 md:col-span-1">
                  <div>
                    <FormLabel>Captar Abonos</FormLabel>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="generate_cxc"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5  col-span-2 md:col-span-1">
                  <div>
                    <FormLabel>Genera CxC</FormLabel>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </CustomCard>

        {/* Configuración de Pagos*/}
        <CustomCard title="Configuración de Pagos" Icon={CreditCard}>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-3 col-span-3 lg:col-span-1">
              <FormField
                control={form.control}
                name="type_payment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Formas de pago</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={
                        field.value ? String(field.value) : undefined
                      }
                      value={field.value ? String(field.value) : undefined}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Mensual</SelectItem>
                        <SelectItem value="2">Quincenal</SelectItem>
                        <SelectItem value="3">Semanal</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price_plan"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex">
                      <div className="w-full">
                        <FormLabel>Valor del plan</FormLabel>
                        <Input
                          type="number"
                          defaultValue="0"
                          className="bg-white/10 border-white/20 text-white mt-1"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="percentage_discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descuento Aplicable (%)</FormLabel>

                    <div className="flex items-center justify-betwee">
                      <FormControl>
                        <div className="px-4 py-1 rounded-xl  w-full">
                          <Slider
                            defaultValue={[field.value]}
                            max={50}
                            min={0}
                            step={1}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="w-full"
                            value={[field.value]}
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>0%</span>
                            <span className="text-emerald-400 font-medium">
                              {field.value > 0 ? `${field.value}%` : "Sin"}{" "}
                              descuento
                            </span>
                            <span>50%</span>
                          </div>
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3 col-span-3 lg:col-span-1">
              {/* <Label className="text-white font-medium">
                Configuración Avanzada
              </Label>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-white text-sm">Pagos Parciales</span>
                  <Switch className="data-[state=checked]:bg-purple-500" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-white text-sm">Auto-renovación</span>
                  <Switch className="data-[state=checked]:bg-purple-500" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-white text-sm">Recordatorios</span>
                  <Switch className="data-[state=checked]:bg-purple-500" />
                </div>
              </div> */}
            </div>

            <div className="space-y-3 col-span-3 lg:col-span-1">
              {/*  <Label className="text-white font-medium">
                Integración Contable
              </Label> */}
              <div className="space-y-3">
                {/*  <div>
                  <Label className="text-xs text-gray-400">Código P.U.C.</Label>
                  <Input
                    placeholder="01-MENSUALIDAD"
                    className="bg-white/10 border-white/20 text-white mt-1"
                  />
                </div> */}
                <FormField
                  control={form.control}
                  name="cost_center"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Centro de costo</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={
                          field.value ? String(field.value) : undefined
                        }
                        value={field.value ? String(field.value) : undefined}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Centro C 1</SelectItem>
                          <SelectItem value="2">Centro C 2</SelectItem>
                          <SelectItem value="3">Centro C 3</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </CustomCard>

        <div className="flex justify-end space-x-4 mt-4">
          <ButtonSecondary>
            Cancelar
          </ButtonSecondary>
          <HoverBorderGradient className="w-full rounded-md">
            <AnimatedGradientButton type="submit" className="w-full">
              <div className="flex items-center justify-center gap-2">
                <Save className="mr-2 h-4 w-4" />
                Guardar
              </div>
            </AnimatedGradientButton>
          </HoverBorderGradient>
          {/* <Button
            className="bg-gradient-to-r from-primary/60 to-primary/70 hover:from-primary/80 hover:to-primar-90 shadow-lg"
            type="submit"
          >
            
            Guardar
          </Button> */}
        </div>
      </form>
    </Form>
  );
}
