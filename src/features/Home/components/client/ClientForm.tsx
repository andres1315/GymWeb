import { AdditionalData } from "./form/AdditionalData";
import { BasicData } from "./form/BasicData";
import { Button } from "@/components/ui/button";
import { ContactInformation } from "./form/ContactInformation";
import { Form } from "@/components/ui/form"
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { OtherData } from "./form/OtherData";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ClientService from "@/services/client/ClientService";
import type { ActionModule } from "../../page/Client";
import type { Client } from "@/utils/interfaces/client";

export const clientSchema = z.object({
    enrollment_date: z.string().min(1, "La fecha de inscripción es obligatoria"), // YYYY-MM-DD
    document_type_id: z.number().int().min(1, "Tipo de documento obligatorio"),
    identification: z.string().min(1, "Identificación obligatoria").max(50),
    first_name: z.string().min(1, "El nombre es obligatorio").max(255),
    last_name: z.string().min(1, "El apellido es obligatorio").max(255),
    person_type_id: z.number().int().optional(),
    is_leader: z.boolean(),
    is_active: z.boolean(),
    email: z.string().email("Correo no válido").optional(),
    phone: z.string().max(20).optional(),
    address: z.string().max(255).optional(),
    contact_emergency: z.string().max(100).optional(),
    phone_emergency: z.string().max(20).optional(),
    date_of_birth: z.string().optional(),
    place_of_birth: z.string().max(100).optional(),
    blood_type_id: z.number().int().optional(),
    country_id: z.number().int().optional(),
    gender_id: z.number().int().optional(),
    eps: z.string().max(100).optional(),
    tax_responsability_id: z.number().int().optional(),
    profession: z.string().max(100).optional(),
    how_did_you_hear_id: z.number().int().optional(),
    expiration_date: z.string().optional(),
    observations: z.string().max(250).optional(),
});

export type ClientFormValues = z.infer<typeof clientSchema>;

interface ClientFormProps {
    actionModule: ActionModule;
    setActionModule: (val: ActionModule) => void;
    getClients: () => void;
    currentClient: Client | undefined;
}

export function ClientForm({ actionModule, setActionModule, getClients, currentClient }: ClientFormProps) {

    const [isSaving, setIsSaving] = useState<boolean>(false);

    const form = useForm<ClientFormValues>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            enrollment_date: format(new Date(), 'yyyy-MM-dd'),
            is_leader: false,
            is_active: true
        }
    });

    useEffect(() => {
        if (currentClient) {
            form.reset({
                enrollment_date: currentClient.enrollment_date ?? "",
                document_type_id: currentClient.document_type_id,
                identification: currentClient.identification ?? "",
                first_name: currentClient.first_name ?? "",
                last_name: currentClient.last_name ?? "",
                person_type_id: currentClient.person_type_id ?? undefined,
                is_leader: currentClient.is_leader == 1 ? true : false,
                is_active: currentClient.is_active == 1 ? true : false,
                email: currentClient.email ?? "",
                phone: currentClient.phone ?? "",
                address: currentClient.address ?? "",
                contact_emergency: currentClient.contact_emergency ?? "",
                phone_emergency: currentClient.phone_emergency ?? "",
                date_of_birth: currentClient.date_of_birth ?? "",
                place_of_birth: currentClient.place_of_birth ?? "",
                blood_type_id: currentClient.blood_type_id ?? undefined,
                country_id: currentClient.country_id ?? undefined,
                gender_id: currentClient.gender_id ?? undefined,
                eps: currentClient.eps ?? "",
                tax_responsability_id: currentClient.tax_responsability_id ?? undefined,
                profession: currentClient.profession ?? "",
                how_did_you_hear_id: currentClient.how_did_you_hear_id ?? undefined,
                expiration_date: currentClient.expiration_date ?? "",
                observations: currentClient.observations ?? "",
            });
        } else {
            form.reset({
                enrollment_date: format(new Date(), "yyyy-MM-dd"),
                is_leader: false,
                is_active: true,
                document_type_id: undefined,
                identification: "",
                first_name: "",
                last_name: "",
                person_type_id: undefined,
                email: "",
                phone: "",
                address: "",
                contact_emergency: "",
                phone_emergency: "",
                date_of_birth: "",
                place_of_birth: "",
                blood_type_id: undefined,
                country_id: undefined,
                gender_id: undefined,
                eps: "",
                tax_responsability_id: undefined,
                profession: "",
                how_did_you_hear_id: undefined,
                expiration_date: "",
                observations: "",
            });
        }
    }, [currentClient, form]);

    const onSubmit = async (values: ClientFormValues) => {
        setIsSaving(true);

        let response = null;

        if (currentClient?.id) {
            response = await ClientService.update(values, currentClient.id);
        } else {
            response = await ClientService.store(values);
        }

        if (response.success) {
            setActionModule('dashboard');
            getClients();
        } else {
            toast("Error", { description: response.message })
        }
        setIsSaving(false);
    };

    return (
        <div className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <BasicData control={form.control} actionModule={actionModule} />

                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                        <ContactInformation control={form.control} actionModule={actionModule} />

                        <AdditionalData control={form.control} actionModule={actionModule} />
                    </div>

                    <OtherData control={form.control} actionModule={actionModule} />

                    <div className="flex justify-end gap-3">
                        {isSaving ? (
                            <Loader className="animate-spin" />
                        ) : (
                            <>
                                <Button variant="outline" onClick={() => setActionModule('dashboard')} type="button">Cancelar</Button>
                                <Button type="submit">{actionModule === 'create' ? 'Guardar' : "Actualizar"}</Button>
                            </>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
}
