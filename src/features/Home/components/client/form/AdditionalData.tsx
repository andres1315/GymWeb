import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ClipboardPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { differenceInYears, format, parseISO } from "date-fns";
import { FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useEffect, useState } from "react";
import BloodTypesService from "@/services/bloodTypes/BloodTypesService";
import CountriesService from "@/services/countries/CountriesService";
import GenderService from "@/services/gender/GenderService";
import type { ActionModule } from "@/features/Home/page/Client";
import type { BloodType, Country, Gender } from "@/utils/interfaces/common";
import type { ClientFormValues } from "../ClientForm";
import type { Control } from "react-hook-form";

interface BasicDataProps {
    control: Control<ClientFormValues>;
    actionModule: ActionModule;
}

export function AdditionalData({ control, actionModule }: BasicDataProps) {

    const [age, setAge] = useState<string>("");
    const [countries, setCountries] = useState<Country[]>([]);
    const [bloods, setBloods] = useState<BloodType[]>([]);
    const [genders, setGenders] = useState<Gender[]>([]);

    useEffect(() => {
        getCountries()
        getBloodTypes();
        getGenders();
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

    const getGenders = async () => {
        const response = await GenderService.getAll();
        if (response.success) {
            setGenders(response.data ?? [])
        }
    }

    return (
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
            <CardHeader>
                <CardTitle className="dark:text-white flex items-center space-x-2">
                    <ClipboardPlus className="h-5 w-5 text-emerald-400" />
                    <span>Datos Adicionales</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label className="mb-1">Fecha de Nacimiento:</Label>
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
                                                    disabled={actionModule === 'view'}
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
                                                    disabled={actionModule === 'view'}
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
                                <Input disabled={actionModule === 'view'} placeholder="Ej: Pereira, Risaralda" {...field} />
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
                                <Select disabled={actionModule === 'view'} onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value + ""}>
                                    <SelectTrigger className="bg-white/10 border-white/20 text-white w-full truncate">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
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
                                <Select disabled={actionModule === 'view'} onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value + ""}>
                                    <SelectTrigger className="bg-white/10 border-white/20 text-white w-full truncate">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
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

                <FormField
                    control={control}
                    name="gender_id"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Genero:</Label>
                            <FormControl>
                                <Select disabled={actionModule === 'view'} onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value + ""}>
                                    <SelectTrigger className="bg-white/10 border-white/20 text-white w-full truncate">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {genders.map(item => (
                                            <SelectItem key={item.id} value={item.id + ''}>{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    );
}
