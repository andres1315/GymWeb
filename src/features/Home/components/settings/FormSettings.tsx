import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import {
  AppConfigSchema,
  type formAppConfig,
} from "../../models/settings/formSettings";
import type z from "zod";
import { CustomCard } from "@/components/ui/customCard";
import { Building, Clock, DollarSign, Save, Settings } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSettingQuery } from "../../hooks/settings/useSettingQuery";
import { useEffect, type JSX } from "react";
import {
  AnimatedGradientButton,
  BackgroundGradient,
} from "@/components/ui/customTheme";

const defaultValues = {
  name: "",
  company_name: "",
  address: undefined,
  email: undefined,
  nit: undefined,
  phone: undefined,
  main_address: undefined,
  website: undefined,
  site: undefined,
  city: undefined,

  resolution_current: undefined,
  resolution_start_date: undefined,
  resolution_exp_date: undefined,
  resolution_validity: undefined,
  resolution_start_number: undefined,
  resolution_end_number: undefined,
  resolution_prefix: undefined,
  act_dian: undefined,
  tariff: undefined,
  reteiva: undefined,
  commercial_registration: undefined,
  withholding: undefined,
  regime_vat: undefined,
  vat: undefined,

  is_electronic_biller: false,
  contingency: false,
  date_format: undefined,
  currency: undefined,
  adds_potential_customers: false,
  required_year_issuescard_customer: false,
  required_type_customer_issuescard_customer: false,
  manages_corporate_customer: false,
  required_classification_customer: false,
  required_place_birth_issuescard_customer: false,
  groups_users: false,
  required_company_issuescard_customer: false,
  manages_cost_center: false,
  how_did_you_hear_about_us: false,
  manages_last_name: false,
  ban_users: false,
  percentage_recognition_freezing: undefined,
  physiotherapy_holiday: false,
  discount_extension_days: false,
  save_dni_user: false,
  capture_directly_photo: false,
  new_customer_courtesy_days: undefined,
};
export function FormSettings() {
  const form = useForm<formAppConfig>({
    resolver: zodResolver(AppConfigSchema),
    defaultValues: defaultValues,
  });
  const resetForm = form.reset;
  const { mutateSaveSettingApp, GetConfigApp } = useSettingQuery();
  const { data: SettingApp, isLoading: isLoadingSettingApp } = GetConfigApp();

  function onSubmit(data: z.infer<typeof AppConfigSchema>) {
    console.log({ data });
    mutateSaveSettingApp.mutate(data);
  }

  function onInvalid(errors: FieldErrors) {
    console.log({ errors });
  }

  useEffect(() => {
    if (SettingApp && SettingApp.data?.data) {
      const savedSetting = SettingApp.data?.data;
      const valueFormPlanSelected = {
        /* Main config */
        name: savedSetting.name,
        company_name: savedSetting.company_name,
        address: savedSetting.company_name,
        email: savedSetting?.email || undefined,
        nit: savedSetting.nit,
        phone: savedSetting?.phone || undefined,
        main_address: savedSetting?.main_address || undefined,
        website: savedSetting?.website || undefined,
        site: savedSetting?.site || undefined,
        city: savedSetting?.city || undefined,

        resolution_current: savedSetting?.resolution_current || undefined,
        resolution_start_date: savedSetting?.resolution_start_date || undefined,
        resolution_exp_date: savedSetting?.resolution_exp_date || undefined,
        resolution_validity: savedSetting?.resolution_validity || undefined,
        resolution_start_number:
          savedSetting?.resolution_start_number || undefined,
        resolution_end_number: savedSetting?.resolution_end_number || undefined,
        resolution_prefix: savedSetting?.resolution_prefix || undefined,
        act_dian: savedSetting?.act_dian || undefined,
        act_ica: savedSetting?.act_ica || undefined,
        tariff: savedSetting?.tariff || undefined,
        reteiva: savedSetting?.reteiva || undefined,
        commercial_registration:
          savedSetting?.commercial_registration || undefined,
        withholding: savedSetting?.withholding || undefined,
        regime_vat: savedSetting?.regime_vat || undefined,
        vat: savedSetting?.vat || undefined,

        /* General config */
        is_electronic_biller: savedSetting?.is_electronic_biller,
        contingency: savedSetting?.contingency,
        date_format: savedSetting?.date_format || undefined,
        currency: savedSetting?.currency || undefined,
        adds_potential_customers: savedSetting?.adds_potential_customers,
        required_year_issuescard_customer:
          savedSetting?.required_year_issuescard_customer,
        required_type_customer_issuescard_customer:
          savedSetting?.required_type_customer_issuescard_customer,
        manages_corporate_customer: savedSetting?.manages_corporate_customer,
        required_classification_customer:
          savedSetting?.required_classification_customer,
        required_place_birth_issuescard_customer:
          savedSetting?.required_place_birth_issuescard_customer,
        groups_users: savedSetting?.groups_users,
        required_company_issuescard_customer:
          savedSetting?.required_company_issuescard_customer,
        manages_cost_center: savedSetting?.manages_cost_center,
        how_did_you_hear_about_us: savedSetting?.how_did_you_hear_about_us,
        manages_last_name: savedSetting?.manages_last_name,
        ban_users: savedSetting?.ban_users,
        percentage_recognition_freezing:
          savedSetting?.percentage_recognition_freezing || undefined,
        physiotherapy_holiday: savedSetting?.physiotherapy_holiday,
        discount_extension_days: savedSetting?.discount_extension_days,
        save_dni_user: savedSetting?.save_dni_user,
        capture_directly_photo: savedSetting?.capture_directly_photo,
        new_customer_courtesy_days:
          savedSetting?.new_customer_courtesy_days || undefined,
      };
      resetForm(valueFormPlanSelected);
    } else {
      resetForm(defaultValues);
    }
  }, [SettingApp, resetForm]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
        {/* main Config */}
        <CustomCard title="Información de la Empresa" Icon={Building}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between p-2 rounded-lg bg-white/5">
                  <div className="w-full">
                    <FormControl>
                      <div>
                        <FormLabel className="">Nombre Comercial</FormLabel>
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
              name="company_name"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between p-2 rounded-lg bg-white/5">
                  <div className="w-full">
                    <FormControl>
                      <div>
                        <FormLabel className="">Razon Social</FormLabel>
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
              name="nit"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between p-2 rounded-lg bg-white/5">
                  <div className="w-full">
                    <FormControl>
                      <div>
                        <FormLabel className="">Nit</FormLabel>
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
              name="address"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between p-2 rounded-lg bg-white/5">
                  <div className="w-full">
                    <FormControl>
                      <div>
                        <FormLabel className="">Dirección</FormLabel>
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
              name="main_address"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between p-2 rounded-lg bg-white/5">
                  <div className="w-full">
                    <FormControl>
                      <div>
                        <FormLabel className="">Direccion Principal</FormLabel>
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
              name="city"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between p-2 rounded-lg bg-white/5">
                  <div className="w-full">
                    <FormControl>
                      <div>
                        <FormLabel className="">Ciudad</FormLabel>
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
              name="site"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between p-2 rounded-lg bg-white/5">
                  <div className="w-full">
                    <FormControl>
                      <div>
                        <FormLabel className="">Sede</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between p-2 rounded-lg bg-white/5">
                  <div className="w-full">
                    <FormControl>
                      <div>
                        <FormLabel className="">Email</FormLabel>
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
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between p-2 rounded-lg bg-white/5">
                  <div className="w-full">
                    <FormControl>
                      <div>
                        <FormLabel className="">Telefono</FormLabel>
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
              name="website"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between p-2 rounded-lg bg-white/5">
                  <div className="w-full">
                    <FormControl>
                      <div>
                        <FormLabel className="">Website</FormLabel>
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
          </div>
        </CustomCard>

        {/* Tax Info */}
        <CustomCard title="Informacion Tributaria" Icon={Settings}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
            {/* Resolution */}

            {/* <div className=""> */}
            {/* <div className=" z-10 "> */}
            <div className="bg-gradient-to-br from-green-900/30 to-zinc-800/30 rounded-xl border border-primary/20 p-4">
              <div className="border-0 bg-transparent shadow-none h-full">
                <h4 className="text-white font-medium mb-4 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Resolución DIAN</span>
                </h4>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="resolution_current"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-between p-2 rounded-lg ">
                        <div className="w-full">
                          <FormControl>
                            <div>
                              <FormLabel className="">
                                Número de Resolución
                              </FormLabel>
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
                    name="resolution_prefix"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-between p-2 rounded-lg ">
                        <div className="w-full">
                          <FormControl>
                            <div>
                              <FormLabel className="">Prefijo</FormLabel>
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
                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="resolution_start_number"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-between p-2 rounded-lg ">
                          <div className="w-full">
                            <FormControl>
                              <div>
                                <FormLabel className="">Desde</FormLabel>
                                <Input
                                  type="number"
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
                      name="resolution_end_number"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-between p-2 rounded-lg ">
                          <div className="w-full">
                            <FormControl>
                              <div>
                                <FormLabel className="">Hasta</FormLabel>
                                <Input
                                  type="number"
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
            </div>
            {/* </div> */}
            {/* </div> */}

            {/* date and expiration */}
            <div className="bg-gradient-to-br from-green-900/30 to-zinc-800/30 rounded-xl border border-primary/20 p-4  ">
              <h4 className="text-white font-medium mb-4 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Vigencia</span>
              </h4>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="resolution_start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-between p-2 rounded-lg ">
                      <div className="w-full">
                        <FormControl>
                          <div>
                            <FormLabel className="">Fecha de Emisión</FormLabel>
                            <Input
                              type="date"
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
                  name="resolution_exp_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-between p-2 rounded-lg ">
                      <div className="w-full">
                        <FormControl>
                          <div>
                            <FormLabel className="">
                              Fecha de Vencimiento
                            </FormLabel>
                            <Input
                              type="date"
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
                  name="resolution_validity"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-between p-2 rounded-lg ">
                      <div className="w-full">
                        <FormControl>
                          <div>
                            <FormLabel className="">Vigencia</FormLabel>
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
              </div>
            </div>

            {/* Tarifas y mas */}
            <div className="bg-gradient-to-br from-green-900/30 to-zinc-800/30 rounded-xl border border-primary/20 p-4   md:col-span-2 lg:col-span-1">
              <h4 className="text-white font-medium mb-4 flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span>Impuestos y otros</span>
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="act_dian"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-between p-2 rounded-lg ">
                        <div className="w-full">
                          <FormControl>
                            <div>
                              <FormLabel className="">Act. DIAN</FormLabel>
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
                    name="act_ica"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-between p-2 rounded-lg ">
                        <div className="w-full">
                          <FormControl>
                            <div>
                              <FormLabel className="">Act. ICA</FormLabel>
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
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="tariff"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-between p-2 rounded-lg ">
                        <div className="w-full">
                          <FormControl>
                            <div>
                              <FormLabel className="">Tarifa</FormLabel>
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
                    name="reteiva"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-between p-2 rounded-lg ">
                        <div className="w-full">
                          <FormControl>
                            <div>
                              <FormLabel className="">Rete IVA</FormLabel>
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
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="commercial_registration"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-between p-2 rounded-lg ">
                        <div className="w-full">
                          <FormControl>
                            <div>
                              <FormLabel className="">
                                Matricula Mercantil
                              </FormLabel>
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
                    name="withholding"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-between p-2 rounded-lg ">
                        <div className="w-full">
                          <FormControl>
                            <div>
                              <FormLabel className="">Retención</FormLabel>
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
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="regime_vat"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-between p-2 rounded-lg ">
                        <div className="w-full">
                          <FormControl>
                            <div>
                              <FormLabel className="">Regimen IVA</FormLabel>
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
                    name="vat"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-between p-2 rounded-lg ">
                        <div className="w-full">
                          <FormControl>
                            <div>
                              <FormLabel className="">Tarifa IVA (%)</FormLabel>
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
                </div>
              </div>
            </div>
          </div>
        </CustomCard>

        {/* Tabs */}
        <CustomCard title="Parametros" Icon={Settings}>
          <Tabs defaultValue="generalParameters" className="">
            <TabsList className="bg-gradient-to-br from-green-900/30 to-zinc-800/30 ">
              <TabsTrigger value="generalParameters" className="">Generales</TabsTrigger>
              <TabsTrigger value="other">Otro</TabsTrigger>
            </TabsList>
            <TabsContent value="generalParameters">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
                <FormField
                  control={form.control}
                  name="is_electronic_biller"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>Es Facturador electrónico</FormLabel>
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
                  name="contingency"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>Contingencia</FormLabel>
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
                  name="date_format"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <FormLabel>Formato de Fecha</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
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
                          <SelectItem value="yyyy/mm/dd">
                            Año/Mes/Dia
                          </SelectItem>
                          <SelectItem value="dd/mm/yyyy">
                            Dia/Mes/Año
                          </SelectItem>
                          <SelectItem value="yyyy-mm-dd">
                            Año-Mes-Dia
                          </SelectItem>
                          <SelectItem value="dd-mm-yyyy">
                            Dia-Mes-Año
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <FormLabel>Moneda</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
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
                          <SelectItem value="COP">
                            COP- Peso Colombiano
                          </SelectItem>
                          <SelectItem value="US">
                            US - Dolar Americano
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="adds_potential_customers"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>Agrega clientes potenciales</FormLabel>
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
                  name="required_year_issuescard_customer"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>
                          Solicita Año de Nacimiento en Ficha de Cliente
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
                  name="required_type_customer_issuescard_customer"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>
                          Solicita Tipo de Cliente en Ficha de Cliente
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
                  name="manages_corporate_customer"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>Maneja Clientes Coorporativos</FormLabel>
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
                  name="required_classification_customer"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>Solicita Clasificación Cliente</FormLabel>
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
                  name="required_place_birth_issuescard_customer"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>
                          Solicita Lugar de Nacimiento en FIcha de Cliente
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
                  name="groups_users"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>Agrupa Usuarios</FormLabel>
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
                  name="required_company_issuescard_customer"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>Pedir Empresa en Ficha de Cliente</FormLabel>
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
                  name="manages_cost_center"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>Maneja Centro de Costos</FormLabel>
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
                  name="how_did_you_hear_about_us"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>Como nos Conoció</FormLabel>
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
                  name="manages_last_name"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>Manje 2do Apellido</FormLabel>
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
                  name="ban_users"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>Veta Usuarios</FormLabel>
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
                  name="percentage_recognition_freezing"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <FormLabel>% Reconocimiento al Congelar</FormLabel>
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
                          <SelectItem value="25">25 %</SelectItem>
                          <SelectItem value="50">50 %</SelectItem>
                          <SelectItem value="75">75 %</SelectItem>
                          <SelectItem value="100">100 %</SelectItem>
                          <SelectItem value="0">No congela</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="physiotherapy_holiday"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>Fisioterapia los Festivos</FormLabel>
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
                  name="discount_extension_days"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>Descuenta dias de Prorroga</FormLabel>
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
                  name="save_dni_user"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>Guarda Cedula Clientes</FormLabel>
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
                  name="capture_directly_photo"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <FormLabel>
                          Captura Directamente la Fotografía
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
                  name="new_customer_courtesy_days"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-between p-2 rounded-lg bg-white/5">
                      <div className="w-full">
                        <FormControl>
                          <div>
                            <FormLabel className="">
                              Dias de cortesia Cliente Nuevo
                            </FormLabel>
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
              </div>
            </TabsContent>
            <TabsContent value="other">
              Make changes to your account here.
            </TabsContent>
          </Tabs>
        </CustomCard>

        <div className="flex justify-end space-x-4 mt-4">
          <Button
            variant="outline"
            type="submit"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-4"
          >
            Cancelar
          </Button>
          <AnimatedGradientButton type="submit" className="cursor-pointer">
            <div className="flex items-center justify-center gap-2">
              <Save className="h-4 w-4" />
              Guardar
            </div>
          </AnimatedGradientButton>
        </div>
      </form>
    </Form>
  );
}
