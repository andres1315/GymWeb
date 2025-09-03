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
import type { ActionModule } from "@/features/private/clients";
import type { BloodType, City, Country, Gender, State } from "@/utils/interfaces/common";
import type { ClientFormValues } from "../ClientForm";
import type { Control, UseFormWatch } from "react-hook-form";
import StatesService from "@/services/states/StatesService";
import CityService from "@/services/cities/CityService";

interface BasicDataProps {
    control: Control<ClientFormValues>;
    actionModule: ActionModule;
    watchForm: UseFormWatch<ClientFormValues>
}

export function AdditionalData({ control, actionModule, watchForm }: BasicDataProps) {

    const [age, setAge] = useState<string>("");
    const [countries, setCountries] = useState<Country[]>([]);
    const [bloods, setBloods] = useState<BloodType[]>([]);
    const [genders, setGenders] = useState<Gender[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        getCountries()
        getBloodTypes();
        getGenders();
    }, [])

    useEffect(() => {
        if (watchForm('country_id')) {
            getStates()
        }
    }, [watchForm('country_id')])

    useEffect(() => {
        if (watchForm('state_id')) {
            getCities()
        }
    }, [watchForm('state_id')])

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

    const getStates = async () => {
        const response = await StatesService.getAll(watchForm('country_id') + "");
        if (response.success) {
            setStates(response.data ?? [])
        }
    }

    const getCities = async () => {
        const response = await CityService.getAll(watchForm('state_id') + "");
        if (response.success) {
            setCities(response.data ?? [])
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
                    name="country_id"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Pais de Nacimiento:</Label>
                            {!countries.length ? (
                                <FormControl>
                                    <Input disabled={true} placeholder="Cargando..." />
                                </FormControl>
                            ) : (
                                <FormControl>
                                    <Select disabled={actionModule === 'view'} onValueChange={(value) => field.onChange(Number(value))} value={field.value + ""}>
                                        <SelectTrigger className="bg-white/10 border-white/20 text-white w-full truncate">
                                            {field.value ? <SelectValue /> : "Seleccione una opción..."}
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map(item => (
                                                <SelectItem key={item.id} value={item.id + ''}>{item.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={control}
                        name="state_id"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Departamento:</Label>
                                {!states.length ? (
                                    <FormControl>
                                        <Input disabled={true} placeholder="Seleccione una opción..." />
                                    </FormControl>
                                ) : (
                                    <FormControl>
                                        <Select disabled={actionModule === 'view'} onValueChange={(value) => field.onChange(Number(value))} value={field.value + ""}>
                                            <SelectTrigger className="bg-white/10 border-white/20 text-white w-full truncate">
                                                {field.value ? <SelectValue /> : "Seleccione una opción..."}
                                            </SelectTrigger>
                                            <SelectContent>
                                                {states.map(item => (
                                                    <SelectItem key={item.id} value={item.id + ''}>
                                                        {item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="city_id"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Ciudad:</Label>
                                {!cities.length ? (
                                    <FormControl>
                                        <Input disabled={true} placeholder="Seleccione una opción..." />
                                    </FormControl>
                                ) : (
                                    <FormControl>
                                        <Select disabled={actionModule === 'view'} onValueChange={(value) => field.onChange(Number(value))} value={field.value + ""}>
                                            <SelectTrigger className="bg-white/10 border-white/20 text-white w-full truncate">
                                                {field.value ? <SelectValue /> : "Seleccione una opción..."}
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cities.map(item => (
                                                    <SelectItem key={item.id} value={item.id + ''}>{item.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={control}
                    name="blood_type_id"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Tipo de Sangre:</Label>
                            {!bloods.length ? (
                                <FormControl>
                                    <Input disabled={true} placeholder="Cargando..." />
                                </FormControl>
                            ) : (
                                <FormControl>
                                    <Select disabled={actionModule === 'view'} onValueChange={(value) => field.onChange(Number(value))} value={field.value + ""}>
                                        <SelectTrigger className="bg-white/10 border-white/20 text-white w-full truncate">
                                            {field.value ? <SelectValue /> : "Seleccione una opción..."}
                                        </SelectTrigger>
                                        <SelectContent>
                                            {bloods.map(item => (
                                                <SelectItem key={item.id} value={item.id + ''}>{item.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            )}
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
                            {!genders.length ? (
                                <FormControl>
                                    <Input disabled={true} placeholder="Cargando..." />
                                </FormControl>
                            ) : (
                                <FormControl>
                                    <Select disabled={actionModule === 'view'} onValueChange={(value) => field.onChange(Number(value))} value={field.value + ""}>
                                        <SelectTrigger className="bg-white/10 border-white/20 text-white w-full truncate">
                                            {field.value ? <SelectValue /> : "Seleccione una opción..."}
                                        </SelectTrigger>
                                        <SelectContent>
                                            {genders.map(item => (
                                                <SelectItem key={item.id} value={item.id + ''}>{item.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    );
}
