import { authService } from "@/services/auth/AuthService";
import { BasicData } from "@/features/Home/components/client/form/BasicData";
import { Button } from "@/components/ui/button";
import { clientSchema, type ClientFormValues } from "@/features/Home/components/client/ClientForm";
import { ContactInformation } from "@/features/Home/components/client/form/ContactInformation";
import { Form } from "@/components/ui/form"
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { OtherData } from "@/features/Home/components/client/form/OtherData";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useUserStore } from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import ClientService from "@/services/client/ClientService";


function ClientForm() {
    const navigate = useNavigate()
    const { setUser } = useUserStore();
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const form = useForm<ClientFormValues>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            enrollment_date: format(new Date(), 'yyyy-MM-dd'),
            is_leader: false,
            is_active: true,
            is_external: true
        }
    });

    useEffect(() => {
        validateAutentication();
    }, [])

    const validateAutentication = async () => {
        const response = await authService.isAuthenticated();
        if (response) {
            setUser({ ...response, isLogin: true })
            navigate('/home/dashboard', { replace: true })
        }
    }

    const onSubmit = async (values: ClientFormValues) => {
        setIsSaving(true);

        const response = await ClientService.storeExternal(values);
        if (!response.success) {
            toast("Error", { description: response.message })
        } else {
            location.reload();
        }

        setIsSaving(false);
    };

    const goToLogin = () => {
        navigate('/login', { replace: true })
    }

    return (
        <div className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <BasicData control={form.control} actionModule={"create"} isExternal={true} />

                    <ContactInformation control={form.control} actionModule={"create"} isExternal={true} />

                    <OtherData control={form.control} actionModule={"create"} isExternal={true} />

                    <div className="flex justify-end gap-3">
                        {isSaving ? (
                            <Loader className="animate-spin" />
                        ) : (
                            <>
                                <Button variant="outline" type="button" onClick={goToLogin}>Cancelar</Button>
                                <Button type="submit">Confirmar</Button>
                            </>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default ClientForm;
