import { BookOpenText, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useEffect, useState } from "react";
import HowDidYouHearService from "@/services/howDidYouHear/HowDidYouHearService";
import TaxResponsabilityService from "@/services/taxResponsability/TaxResponsabilityService";
import type { ActionModule } from "@/features/Home/page/Client";
import type { ClientFormValues } from "../ClientForm";
import type { Control } from "react-hook-form";
import type { HowDidYouHear, TaxResponsability } from "@/utils/interfaces/common";

interface BasicDataProps {
    control: Control<ClientFormValues>;
    actionModule: ActionModule;
}

export function OtherData({ control, actionModule }: BasicDataProps) {

    const [howDidYouHear, setHowDidYouHear] = useState<HowDidYouHear[]>([]);
    const [taxResponsability, setTaxResponsability] = useState<TaxResponsability[]>([]);

    useEffect(() => {
        getHowDidYpuHear()
        getTaxResponsability();
    }, [])

    const getHowDidYpuHear = async () => {
        const response = await HowDidYouHearService.getAll();
        if (response.success) {
            setHowDidYouHear(response.data ?? [])
        }
    }

    const getTaxResponsability = async () => {
        const response = await TaxResponsabilityService.getAll();
        if (response.success) {
            setTaxResponsability(response.data ?? [])
        }
    }

    return (
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
            <CardHeader>
                <CardTitle className="dark:text-white flex items-center space-x-2">
                    <BookOpenText className="h-5 w-5 text-emerald-400" />
                    <span>Otros Datos</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                    <FormField
                        control={control}
                        name="eps"
                        render={({ field }) => (
                            <FormItem>
                                <Label>EPS:</Label>
                                <FormControl>
                                    <Input disabled={actionModule === 'view'} placeholder="Ej: Sura, Nueva EPS, etc" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="profession"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Profesión:</Label>
                                <FormControl>
                                    <Input disabled={actionModule === 'view'} placeholder="Ocupación laboral" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="how_did_you_hear_id"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Como nos Conocio?:</Label>
                                {!howDidYouHear.length ? (
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
                                                {howDidYouHear.map(item => (
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
                        name="expiration_date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <Label>Fecha de Vencimiento:</Label>
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
                                                } else {
                                                    field.onChange(null);
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

                    <FormField
                        control={control}
                        name="tax_responsability_id"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Responsabilidad Fiscal:</Label>
                                {!taxResponsability.length ? (
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
                                                {taxResponsability.map(item => (
                                                    <SelectItem key={item.id} value={item.id + ''}>{item.code} - {item.name}</SelectItem>
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
                        name="observations"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Observaciones:</Label>
                                <FormControl>
                                    <Input disabled={actionModule === 'view'} placeholder="Observacion del cliente" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
