import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { BasicData } from "./form/BasicData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { ContactInformation } from "./form/ContactInformation";
import { format } from "date-fns";
import { AdditionalData } from "./form/AdditionalData";

export const clientSchema = z.object({
    enrollment_date: z.string().min(1, "La fecha de inscripción es obligatoria"), // YYYY-MM-DD
    document_type_id: z.number().int().min(1, "Tipo de documento obligatorio"),
    identification: z.string().min(1, "Identificación obligatoria").max(50),
    first_name: z.string().min(1, "El nombre es obligatorio").max(255),
    last_name: z.string().min(1, "El apellido es obligatorio").max(255),
    person_type_id: z.number().int().min(1).nullable(), // puede ser null
    is_leader: z.boolean(),
    email: z.string().email("Correo no válido"),
    phone: z.string().max(20).optional(),
    address: z.string().max(255).optional(),
    contact_emergency: z.string().max(100).optional(),
    phone_emergency: z.string().max(20).optional(),
    date_of_birth: z.string().nullable(),
    place_of_birth: z.string().optional(),
    blood_type_id: z.string().optional(),



    tax_responsability_id: z.number().int().min(1).nullable(),
    country_id: z.number().int().min(1).nullable(),
    gender_id: z.number().int().min(1).nullable(),
    eps: z.string().max(100).nullable(),
    profession: z.string().max(100).nullable(),
    how_did_you_hear_id: z.number().int().min(1).nullable(),
    expiration_date: z.string().nullable(), // YYYY-MM-DD
    observations: z.string().max(1000).nullable(), // puedes ajustar el max
});

export type ClientFormValues = z.infer<typeof clientSchema>;

export function ClientForm() {

    const form = useForm<ClientFormValues>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            enrollment_date: format(new Date(), 'yyyy-MM-dd')
        }
    });

    const onSubmit = async () => {
        console.log("Submit")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
                <BasicData control={form.control} />

                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                    <ContactInformation control={form.control} />

                    <AdditionalData control={form.control} />
                </div>


                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
