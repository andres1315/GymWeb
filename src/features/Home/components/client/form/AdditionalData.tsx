import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { CalendarIcon, ClipboardPlus, Clock, CreditCard, Save, Settings } from "lucide-react";
import type { Control } from "react-hook-form";
import type { ClientFormValues } from "../ClientForm";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { differenceInYears, format, parseISO } from "date-fns";
import CountriesService from "@/services/countries/CountriesService";
import { useEffect, useState } from "react";
import type { BloodType, Country } from "@/utils/interfaces/common";
import BloodTypesService from "@/services/bloodTypes/BloodTypesService";

interface BasicDataProps {
    control: Control<ClientFormValues>;
}

export function AdditionalData({ control }: BasicDataProps) {

    const [age, setAge] = useState<string>("");
    const [countries, setCountries] = useState<Country[]>([]);
    const [bloods, setBloods] = useState<BloodType[]>([]);

    useEffect(() => {
        getCountries()
        getBloodTypes();
    }, [])

    const getCountries = async () => {
        const response = await CountriesService.getAll();
        if (response.success) {
            setCountries(response.data ?? [])
        }
    }

    const getBloodTypes = async () => {
        const response = await BloodTypesService.getAll();
        if (response.success) {
            setBloods(response.data ?? [])
        }
    }

    return (
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
            <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                    <ClipboardPlus className="h-5 w-5 text-emerald-400" />
                    <span>Datos Adicionales</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

                <div>
                    <Label className="mb-2">Fecha de Nacimiento:</Label>
                    <div className="flex gap-4">
                        <div className="w-9/12">
                            <FormField
                                control={control}
                                name="date_of_birth"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={`w-full justify-start text-left font-normal`}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    captionLayout="dropdown"
                                                    selected={field.value ? parseISO(field.value) : undefined}
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            field.onChange(format(date, "yyyy-MM-dd"));
                                                            const years = differenceInYears(new Date(), date);
                                                            setAge(years + "");
                                                        } else {
                                                            field.onChange(null);
                                                            setAge("");
                                                        }
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-3/12">
                            <Input readOnly type="text" className="text-center" value={age} />
                        </div>
                    </div>
                </div>

                <FormField
                    control={control}
                    name="place_of_birth"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Lugar de Nacimiento</Label>
                            <FormControl>
                                <Input placeholder="Ej: Pereira, Risaralda" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="country_id"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Pais:</Label>
                            <FormControl>
                                <Select>
                                    <SelectTrigger className="bg-white/10 border-white/20 text-white w-full truncate">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent onChange={field.onChange}>
                                        {countries.map(item => (
                                            <SelectItem key={item.id} value={item.id + ''}>{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="blood_type_id"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Tipo de Sangre:</Label>
                            <FormControl>
                                <Select>
                                    <SelectTrigger className="bg-white/10 border-white/20 text-white w-full truncate">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent onChange={field.onChange}>
                                        {bloods.map(item => (
                                            <SelectItem key={item.id} value={item.id + ''}>{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div>
                            <Label className="text-white font-medium">Pago</Label>
                            <p className="text-xs text-gray-400 mt-1">Generar Pago</p>
                        </div>
                        <Switch className="data-[state=checked]:bg-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div>
                            <Label className="text-white font-medium">
                                Fecha de Vcto
                            </Label>
                            <p className="text-xs text-gray-400 mt-1">
                                Generar Movimiento de Fecha de vencimiento
                            </p>
                        </div>
                        <Switch className="data-[state=checked]:bg-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div>
                            <Label className="text-white font-medium">Factura</Label>
                            <p className="text-xs text-gray-400 mt-1">
                                Generar Factura de Venta
                            </p>
                        </div>
                        <Switch className="data-[state=checked]:bg-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div>
                            <Label className="text-white font-medium">
                                Código de Cliente
                            </Label>
                            <p className="text-xs text-gray-400 mt-1">
                                Generar código único por cliente
                            </p>
                        </div>
                        <Switch className="data-[state=checked]:bg-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div>
                            <Label className="text-white font-medium">
                                Generar Movimiento de Fecha de Vcto
                            </Label>
                        </div>
                        <Switch className="data-[state=checked]:bg-emerald-500" />
                    </div>

                    <div className="space-y-3">
                        <Label className="text-white font-medium">
                            Entradas Máximas por Día
                        </Label>
                        <div className="px-4 py-3 rounded-xl bg-white/5">
                            <Slider
                                defaultValue={[3]}
                                max={10}
                                min={1}
                                step={1}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-2">
                                <span>1</span>
                                <span className="text-emerald-400 font-medium">
                                    3 entradas
                                </span>
                                <span>10</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-white font-medium">
                            Descuento Aplicable (%)
                        </Label>
                        <div className="px-4 py-3 rounded-xl bg-white/5">
                            <Slider
                                defaultValue={[0]}
                                max={50}
                                min={0}
                                step={5}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-2">
                                <span>0%</span>
                                <span className="text-purple-400 font-medium">
                                    Sin descuento
                                </span>
                                <span>50%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
