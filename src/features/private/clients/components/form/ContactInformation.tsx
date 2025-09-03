import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Contact } from "lucide-react";
import { FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionModule } from "@/features/private/clients";
import type { ClientFormValues } from "../ClientForm";
import type { Control } from "react-hook-form";

interface BasicDataProps {
    control: Control<ClientFormValues>;
    actionModule: ActionModule;
    isExternal?: boolean;
}

export function ContactInformation({ control, actionModule, isExternal = false }: BasicDataProps) {

    return (
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
            <CardHeader>
                <CardTitle className="dark:text-white flex items-center space-x-2">
                    <Contact className="h-5 w-5 text-emerald-400" />
                    <span>Datos de Contacto</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <FormField
                    control={control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Celular:</Label>
                            <FormControl>
                                <Input disabled={actionModule === 'view'} placeholder="Ingrese telefono" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Correo Electrónico:</Label>
                            <FormControl>
                                <Input disabled={actionModule === 'view'} placeholder="example@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {!isExternal && (
                    <>
                        <FormField
                            control={control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Dirección:</Label>
                                    <FormControl>
                                        <Input disabled={actionModule === 'view'} placeholder="Ej: Cl 45 # 56" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="phone_emergency"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Celular de Emergencia:</Label>
                                    <FormControl>
                                        <Input disabled={actionModule === 'view'} placeholder="Ingrese telefono de Emergencia" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="contact_emergency"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Nombre de Emergencia:</Label>
                                    <FormControl>
                                        <Input disabled={actionModule === 'view'} placeholder="Ingrese nombre de Emergencia" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}
            </CardContent>
        </Card>
    );
}
