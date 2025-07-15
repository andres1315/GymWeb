import { Button } from "@/components/ui/button";
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

export const MembershipConfigSchema = z
  .object({
    // Configuración Principal
    name: z.string({ error: "Ingrese un Nombre para el plan" }),
    description: z.string().optional(),
    generate_payment: z.boolean(),
    generate_bill: z.boolean(),
    generate_code_customer: z.boolean(),
    generate_movement_exp_date: z.boolean(),
    controlled_plan: z.boolean(),
    required_list_members: z.boolean(),
    can_be_invited: z.boolean(),
    required_footprint: z.boolean(),
    has_assessment_physical_therapy: z.boolean(),
    required_gift_voucher: z.boolean(),
    admission_all_sites: z.boolean(),
    charge_registration: z.boolean(),
    controls_user_access: z.boolean(),

    // Control de Acceso
    max_entry_per_day: z
      .number()
      .min(1, {
        message: "Debe ser mayor a 0",
      })
      .max(10, {
        message: "Debe ser menor a 11",
      }),
    max_day_per_week: z
      .number()
      .min(0, {
        message: "Debe ser mayor un valor entre 0 y 7",
      })
      .max(7, {
        message: "Debe ser mayor un valor entre 0 y 7",
      }),
    min_members_group_plan: z
      .number()
      .min(0, {
        message: "Debe ser mayor un valor entre 0 y 10",
      })
      .max(10, {
        message: "Debe ser mayor un valor entre 0 y 10",
      })
      .optional(),
    max_members_group_plan: z
      .number()
      .min(0, {
        message: "Debe ser mayor un valor entre 0 y 10",
      })
      .max(10, {
        message: "Debe ser mayor un valor entre 0 y 10",
      })
      .optional(),
    guest_days: z.array(
      z.enum([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
        "holiday",
      ])
    ),
    start_time_restriction: z.string().optional(),
    end_time_restriction: z.string().optional(),
    restriction_days: z.array(
      z.enum([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
        "holiday",
      ])
    ),

    // Configuración Adicional
    birthday_discount: z.boolean(),
    birthday_choose_gift_discount: z.boolean(),
    discount_early_payment: z.boolean(),
    discount_early_payment_first: z.boolean(),
    increase_arrears: z.boolean(),
    generate_payment_plan: z.boolean(),
    start_first_day_month: z.boolean(),
    contains_class_package: z.boolean(),
    issues_card: z.boolean(),
    capture_gift_voucher: z.boolean(),
    generate_cxc: z.boolean(),

    // Configuración de Pagos
    type_payment: z.number({
      error: "Seleccione una forma de pago",
    }),
    cost_center: z.number("Seleccione un Centro de costo"),
    price_plan: z
      .number()
      .min(1, { error: "Ingrese Un valor para el plan" })
      .positive(),

    /* metodos_pago: z.array(
    z.enum(["Efectivo", "Tarjeta de Crédito", "Transferencia", "PayPal"])
  ), */

    percentage_discount: z
      .number()
      .min(0, {
        message: "Debe ser 0 o mayor",
      })
      .max(50, {
        message: "Debe ser 50 o menor",
      }),
    age_restriction_type: z.enum(["major", "minor"]).optional(),
    age_restriction_value: z.number().optional(),
  })
  .refine(
    (data) =>
      // Restriction Age Rule
      (!data.age_restriction_type &&
        (!data.age_restriction_value || data.age_restriction_value === 0)) ||
      (data.age_restriction_type &&
        data.age_restriction_value &&
        data.age_restriction_value > 0),
    {
      message:
        "Si seleccionas tipo de restricción de edad o valor de edad, ambos campos son obligatorios y la edad debe ser mayor a 0.",
      path: ["age_restriction_type"], // poner ambos campos si se quiere mostrar el error en ambos
    }
  )
  .refine(
    (data) =>
      // Si ambos son 0 o vacíos, está bien. Si uno es mayor a 0, el otro también debe ser mayor a 0.
      ((data.min_members_group_plan ?? 0) === 0 &&
        (data.max_members_group_plan ?? 0) === 0) ||
      ((data.min_members_group_plan ?? 0) > 0 &&
        (data.max_members_group_plan ?? 0) > 0),
    {
      message:
        "Si uno de los campos de integrantes mínimos o máximos es mayor a 0, el otro también debe ser mayor a 0.",
      path: ["min_members_group_plan"], // Puedes poner ambos campos si quieres mostrar el error en ambos
    }
  )
  .refine(
    (data) => {
      if (
        (data.min_members_group_plan ?? 0) > 0 &&
        (data.max_members_group_plan ?? 0) > 0
      ) {
        return (
          (data.max_members_group_plan ?? 0) >=
          (data.min_members_group_plan ?? 0)
        );
      }
      return true;
    },
    {
      message: "El máximo de integrantes no puede ser menor que el mínimo.",
      path: ["max_members_group_plan"],
    }
  )
  .refine(
    (data) =>
      // Ambos vacíos o ambos con valor
      (!data.start_time_restriction && !data.end_time_restriction) ||
      (data.start_time_restriction && data.end_time_restriction),
    {
      message:
        "Si seleccionas una hora de inicio o fin, ambos campos son obligatorios.",
      path: ["start_time_restriction"],
    }
  )
  .refine(
    (data) => {
      if (data.start_time_restriction && data.end_time_restriction) {
        // Compara los valores como strings "HH:mm"
        return data.end_time_restriction > data.start_time_restriction;
      }
      return true;
    },
    {
      message: "La hora de fin debe ser mayor a la hora de inicio.",
      path: ["end_time_restriction"],
    }
  );

type FormValues = z.infer<typeof MembershipConfigSchema>;

export function SettingMemberShip() {
  const form = useForm<FormValues>({
    resolver: zodResolver(MembershipConfigSchema),
    defaultValues: {
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
      guest_days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      /* start_time_restriction: "06:00",
      end_time_restriction: "22:00", */
      restriction_days: [
        "sunday",
        "holiday"
      ],
      age_restriction_value: 0,

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
    },
  });

  function onSubmit(data: z.infer<typeof MembershipConfigSchema>) {
    console.log({ data });
    /* toast("Event has been created."); */
  }

  function onInvalid(errors: FieldErrors) {
    console.log({ errors });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
        {/* main Config */}
        <CustomCard title="Configuración Principal" Icon={Settings}>
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
                            onValueChange={field.onChange}
                            className="w-full"
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
                            onValueChange={field.onChange}
                            className="w-full"
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
                              defaultValue="0"
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
                              defaultValue="0"
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
                          defaultValue="0"
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
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
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
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
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
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
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
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
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
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
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
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
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
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
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
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
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
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
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
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
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
                <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
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
            <div className="space-y-4">
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
                            onValueChange={field.onChange}
                            className="w-full"
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
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3">
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

            <div className="space-y-3">
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

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            type="submit"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Cancelar
          </Button>
          <Button
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg"
            type="submit"
          >
            <Save className="mr-2 h-4 w-4" />
            Guardar Configuración
          </Button>
        </div>
      </form>
    </Form>
  );
}
