import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import DocumentTypesService from "@/services/documentTypes/DocumentTypesService";
import PersonTypesService from "@/services/personTypes/PersonTypesService";
import type { ActionModule } from "@/features/Home/page/Client";
import type { ClientFormValues } from "../ClientForm";
import type { Control } from "react-hook-form";
import type { DocumentType, PersonType } from "@/utils/interfaces/common";

interface BasicDataProps {
    control: Control<ClientFormValues>;
    actionModule: ActionModule;
}

export function BasicData({ control, actionModule }: BasicDataProps) {

    const [documentsTypes, setDocumentsTypes] = useState<DocumentType[]>([]);
    const [personsTypes, setPersonsTypes] = useState<PersonType[]>([]);

    useEffect(() => {
        getDocuments()
        getPersonsTypes()
    }, [])

    const getDocuments = async () => {
        const response = await DocumentTypesService.getAll();
        if (response.success) {
            setDocumentsTypes(response.data ?? [])
        }
    }

    const getPersonsTypes = async () => {
        const response = await PersonTypesService.getAll();
        if (response.success) {
            setPersonsTypes(response.data ?? [])
        }
    }

    return (
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
            <CardHeader>
                <CardTitle className="dark:text-white flex items-center space-x-2">
                    <User className="h-5 w-5 text-emerald-400" />
                    <span>Datos Básicos</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                    <FormField
                        control={control}
                        disabled={actionModule == 'view'}
                        name="enrollment_date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <Label>Fecha de Afiliación:</Label>
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
                        name="document_type_id"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Tipo de Documento:</Label>
                                <FormControl>
                                    <Select disabled={actionModule === 'view'} onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value + ""}>
                                        <SelectTrigger className="bg-white/10 border-white/20 text-white w-full truncate">
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {documentsTypes.map(item => (
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
                        name="identification"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Identificación:</Label>
                                <FormControl>
                                    <Input disabled={actionModule === 'view'} placeholder="Ej: 1225987485" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Nombre:</Label>
                                <FormControl>
                                    <Input disabled={actionModule === 'view'} placeholder="Escribe los nombres" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Apellidos:</Label>
                                <FormControl>
                                    <Input disabled={actionModule === 'view'} placeholder="Escribe los apellidos" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="person_type_id"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Tipo de Persona:</Label>
                                <FormControl>
                                    <Select disabled={actionModule === 'view'} onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value + ""}>
                                        <SelectTrigger className="bg-white/10 border-white/20 text-white w-full truncate">
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {personsTypes.map(item => (
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
                        name="is_leader"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between mt-2 rounded-xl">
                                    <div>
                                        <Label className="dark:text-white font-medium">
                                            Lider de Grupo
                                        </Label>
                                    </div>
                                    <FormControl>
                                        <Switch disabled={actionModule === 'view'} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
