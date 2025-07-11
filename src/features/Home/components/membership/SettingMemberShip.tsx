import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

// Schema de Zod para toda la configuración de membresía
export const MembershipConfigSchema = z.object({
  // Configuración Principal
  generar_pago: z.boolean(),
  generar_fecha_vcto: z.boolean(),
  generar_factura: z.boolean(),
  generar_codigo_cliente: z.boolean(),
  generar_movimiento_fecha_vcto: z.boolean(),
  entradas_maximas_dia: z.number().min(1).max(10),
  descuento_aplicable: z.number().min(0).max(50),

  // Control de Acceso
  dias_semana: z.array(z.enum(["L", "M", "X", "J", "V", "S", "D", "F"])),
  horario_desde: z.string(), // formato "HH:mm"
  horario_hasta: z.string(), // formato "HH:mm"
  validacion_manual: z.boolean(),

  // Configuración Adicional
  dcto_cumple: z.boolean(),
  obsequio_dcto: z.boolean(),
  dcto_pronto_pago: z.boolean(),
  dcto_pronto_pago_1er: z.boolean(),
  incremento_mora: z.boolean(),
  genera_plan_pago: z.boolean(),
  inicia_primer_dia_mes: z.boolean(),
  contiene_paquetes_clases: z.boolean(),
  expide_ficha: z.boolean(),
  captar_abonos: z.boolean(),
  genera_cxc: z.boolean(),
  permite_ingreso_todas_sedes: z.boolean(),

  // Configuración de Pagos
  metodos_pago: z.array(
    z.enum(["Efectivo", "Tarjeta de Crédito", "Transferencia", "PayPal"])
  ),
  pagos_parciales: z.boolean(),
  auto_renovacion: z.boolean(),
  recordatorios: z.boolean(),
  codigo_puc: z.string(),
  centro_costo: z.enum(["classes", "personal"]),
  max_entry_per_day: z
    .number()
    .min(1, {
      message: "Debe ser mayor a 0",
    })
    .max(10, {
      message: "Debe ser menor a 11",
    }),
  percentage_discount: z
    .number()
    .min(0, {
      message: "Debe ser 0 o mayor",
    })
    .max(50, {
      message: "Debe ser 50 o menor",
    }),
});

export function SettingMemberShip() {
  const form = useForm<z.infer<typeof MembershipConfigSchema>>({
    resolver: zodResolver(MembershipConfigSchema),
    defaultValues: {
      generar_pago: false,
      generar_fecha_vcto: false,
      generar_factura: false,
      generar_codigo_cliente: false,
      generar_movimiento_fecha_vcto: false,
      entradas_maximas_dia: 3,
      descuento_aplicable: 0,
      dias_semana: ["L", "M", "X", "J", "V"],
      horario_desde: "06:00",
      horario_hasta: "22:00",
      validacion_manual: false,
      dcto_cumple: false,
      obsequio_dcto: false,
      dcto_pronto_pago: false,
      dcto_pronto_pago_1er: false,
      incremento_mora: false,
      genera_plan_pago: false,
      inicia_primer_dia_mes: false,
      contiene_paquetes_clases: false,
      expide_ficha: false,
      captar_abonos: false,
      genera_cxc: false,
      permite_ingreso_todas_sedes: false,
      metodos_pago: [],
      pagos_parciales: false,
      auto_renovacion: false,
      recordatorios: false,
      codigo_puc: "",
      centro_costo: "classes",
      max_entry_per_day: 1,
      percentage_discount: 0,
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
            <div>
              <FormField
                control={form.control}
                name="generar_pago"
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
                name="generar_fecha_vcto"
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
              name="generar_fecha_vcto"
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
              name="generar_fecha_vcto"
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
              name="generar_fecha_vcto"
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
              name="generar_fecha_vcto"
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
              name="generar_fecha_vcto"
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
              name="generar_fecha_vcto"
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
              name="generar_fecha_vcto"
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
              name="generar_fecha_vcto"
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
              name="generar_fecha_vcto"
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
              name="generar_fecha_vcto"
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
              name="generar_fecha_vcto"
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

            <FormField
              control={form.control}
              name="percentage_discount"
              render={({ field }) => (
                <FormItem className="flex flex-col  p-2 rounded-lg bg-white/5">
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
        </CustomCard>

        {/* Control de Acceso */}
        <CustomCard title="Control de Acceso" Icon={Clock}>
          <div className="space-y-6">
            <div className="flex justify-between gap-4">
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
                name="max_entry_per_day"
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
                            <span>1</span>
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
            <FormField
              control={form.control}
              name="max_entry_per_day"
              render={({ field }) => (
                <FormItem className="flex flex-col  p-2 rounded-lg bg-white/5 flex-1">
                  <FormLabel>
                    Si es plan Grupal, controla Minimo y Máximo N° de
                    integrantes.
                  </FormLabel>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-gray-400">Minimo</Label>
                      <Input
                        type="number"
                        defaultValue="0"
                        className="bg-white/10 border-white/20 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-400">Maximo</Label>
                      <Input
                        type="number"
                        defaultValue="0"
                        className="bg-white/10 border-white/20 text-white mt-1"
                      />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dias_semana"
              render={({ field }) => {
                const dias = [
                  { label: "L" as const, nombre: "Lunes" },
                  { label: "M" as const, nombre: "Martes" },
                  { label: "X" as const, nombre: "Miércoles" },
                  { label: "J" as const, nombre: "Jueves" },
                  { label: "V" as const, nombre: "Viernes" },
                  { label: "S" as const, nombre: "Sábado" },
                  { label: "D" as const, nombre: "Domingo" },
                  { label: "F" as const, nombre: "Festivos" },
                ];
                // Adaptar el valor para incluir festivos si está presente
                const value = (field.value || []) as (
                  | "L"
                  | "M"
                  | "X"
                  | "J"
                  | "V"
                  | "S"
                  | "D"
                  | "F"
                )[];
                return (
                  <FormItem className="p-2 rounded-lg bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                    <FormLabel className="text-white font-medium mb-3 block">
                      Invitado los Días
                    </FormLabel>
                    <div className="grid grid-cols-8 gap-2">
                      {dias.map((dia) => {
                        const checked = value.includes(dia.label);
                        return (
                          <div key={dia.label} className="text-center">
                            <button
                              type="button"
                              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium cursor-pointer transition-all border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                                checked
                                  ? "bg-emerald-500 text-white shadow-lg"
                                  : "bg-white/10 text-gray-400 hover:bg-white/20"
                              }`}
                              aria-pressed={checked}
                              onClick={() => {
                                if (checked) {
                                  field.onChange(
                                    value.filter((v) => v !== dia.label) as (
                                      | "L"
                                      | "M"
                                      | "X"
                                      | "J"
                                      | "V"
                                      | "S"
                                      | "D"
                                      | "F"
                                    )[]
                                  );
                                } else {
                                  field.onChange([...value, dia.label] as (
                                    | "L"
                                    | "M"
                                    | "X"
                                    | "J"
                                    | "V"
                                    | "S"
                                    | "D"
                                    | "F"
                                  )[]);
                                }
                              }}
                              title={dia.nombre}
                            >
                              {dia.label}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Selecciona los días en los que el invitado puede asistir
                    </p>
                  </FormItem>
                );
              }}
            />
            <div className="space-y-3">
              <Label className="text-white font-medium">
                Restricción de horario
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-400">Desde</Label>
                  <Input
                    type="time"
                    defaultValue="06:00"
                    className="bg-white/10 border-white/20 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-400">Hasta</Label>
                  <Input
                    type="time"
                    defaultValue="22:00"
                    className="bg-white/10 border-white/20 text-white mt-1"
                  />
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="dias_semana"
              render={({ field }) => {
                const dias = [
                  { label: "L" as const, nombre: "Lunes" },
                  { label: "M" as const, nombre: "Martes" },
                  { label: "X" as const, nombre: "Miércoles" },
                  { label: "J" as const, nombre: "Jueves" },
                  { label: "V" as const, nombre: "Viernes" },
                  { label: "S" as const, nombre: "Sábado" },
                  { label: "D" as const, nombre: "Domingo" },
                ];
                // Adaptar el valor para incluir festivos si está presente
                const value = (field.value || []) as (
                  | "L"
                  | "M"
                  | "X"
                  | "J"
                  | "V"
                  | "S"
                  | "D"
                )[];
                return (
                  <FormItem className="p-2 rounded-lg bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                    <FormLabel className="text-white font-medium mb-3 block">
                      Restriccion de Dias
                    </FormLabel>
                    <div className="grid grid-cols-7 gap-2">
                      {dias.map((dia) => {
                        const checked = value.includes(dia.label);
                        return (
                          <div key={dia.label} className="text-center">
                            <button
                              type="button"
                              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium cursor-pointer transition-all border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                                checked
                                  ? "bg-emerald-500 text-white shadow-lg"
                                  : "bg-white/10 text-gray-400 hover:bg-white/20"
                              }`}
                              aria-pressed={checked}
                              onClick={() => {
                                if (checked) {
                                  field.onChange(
                                    value.filter((v) => v !== dia.label) as (
                                      | "L"
                                      | "M"
                                      | "X"
                                      | "J"
                                      | "V"
                                      | "S"
                                      | "D"
                                      | "F"
                                    )[]
                                  );
                                } else {
                                  field.onChange([...value, dia.label] as (
                                    | "L"
                                    | "M"
                                    | "X"
                                    | "J"
                                    | "V"
                                    | "S"
                                    | "D"
                                    | "F"
                                  )[]);
                                }
                              }}
                              title={dia.nombre}
                            >
                              {dia.label}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    {/* <p className="text-xs text-gray-400 mt-2">
                      Selecciona los días en los que el invitado puede asistir
                    </p> */}
                  </FormItem>
                );
              }}
            />

            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div>
                <Label className="text-white font-medium">
                  Validación Manual
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Requiere aprobación del staff
                </p>
              </div>
              <Switch className="data-[state=checked]:bg-blue-500" />
            </div>
          </div>
        </CustomCard>

        {/* Configuración Adicional */}
        <CustomCard title="Configuración Adicional" Icon={Settings}>
          <div className="gap-6 grid grid-cols-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div>
                <Label className="text-white font-medium">
                  Dcto Cumpleaños
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  % Descuento mes de Cumpleaños
                </p>
              </div>
              <Switch className="data-[state=checked]:bg-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div>
                <Label className="text-white font-medium">
                  Obsequio / Dcto
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Elige Obsequio o Descuento de Cumpleaños
                </p>
              </div>
              <Switch className="data-[state=checked]:bg-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div>
                <Label className="text-white font-medium">
                  Dcto Pronto Pago
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Descento por Pronto Pago
                </p>
              </div>
              <Switch className="data-[state=checked]:bg-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div>
                <Label className="text-white font-medium">
                  Dcto Pronto Pago 1er pago
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Aplica Descuento Pronto Pago desde el 1er Pago
                </p>
              </div>
              <Switch className="data-[state=checked]:bg-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div>
                <Label className="text-white font-medium">
                  Incremento por Mora en Pago
                </Label>
              </div>
              <Switch className="data-[state=checked]:bg-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div>
                <Label className="text-white font-medium">
                  Genera Plan Pago
                </Label>
              </div>
              <Switch className="data-[state=checked]:bg-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div>
                <Label className="text-white font-medium">
                  Inicia 1er día del Mes
                </Label>
              </div>
              <Switch className="data-[state=checked]:bg-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div>
                <Label className="text-white font-medium">
                  Contiene paquetes de clases
                </Label>
              </div>
              <Switch className="data-[state=checked]:bg-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div>
                <Label className="text-white font-medium">Expide FICHA</Label>
              </div>
              <Switch className="data-[state=checked]:bg-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div>
                <Label className="text-white font-medium">Captar Abonos</Label>
              </div>
              <Switch className="data-[state=checked]:bg-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div>
                <Label className="text-white font-medium">Genera CxC</Label>
              </div>
              <Switch className="data-[state=checked]:bg-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div>
                <Label className="text-white font-medium">
                  Permite Ingreso a todas las sedes
                </Label>
              </div>
              <Switch className="data-[state=checked]:bg-emerald-500" />
            </div>
          </div>
        </CustomCard>

        {/* Configuración de Pagos*/}
        <CustomCard title="Configuración de Pagos" Icon={CreditCard}>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label className="text-white font-medium">Métodos de Pago</Label>
              <div className="space-y-2">
                {[
                  "Efectivo",
                  "Tarjeta de Crédito",
                  "Transferencia",
                  "PayPal",
                ].map((method) => (
                  <div
                    key={method}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Checkbox className="border-white/30" />
                    <span className="text-white text-sm">{method}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-white font-medium">
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
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-white font-medium">
                Integración Contable
              </Label>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-400">Código P.U.C.</Label>
                  <Input
                    placeholder="01-MENSUALIDAD"
                    className="bg-white/10 border-white/20 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-400">
                    Centro de Costo
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classes">Clases Grupales</SelectItem>
                      <SelectItem value="personal">
                        Entrenamiento Personal
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
