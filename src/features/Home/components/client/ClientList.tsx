import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EllipsisVertical, Loader, Pencil, Plus, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import ClientService from "@/services/client/ClientService";
import type { ActionModule, StatusType } from "../../page/Client";
import type { Client } from "@/utils/interfaces/client";
import InfiniteScroll from 'react-infinite-scroll-component';
import { ItemList } from "./list/ItemList";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FilterStatus } from "@/utils/interfaces/common";

interface ClientListProps {
    clients: Client[];
    setCurrentClient: (val: Client | undefined) => void;
    currentClient: Client | undefined;
    isLoading: boolean;
    setActionModule: (val: ActionModule) => void;
    getClients: (val?: string) => void;
    page: string;
    hasMore: boolean;
    setFilterStatus: (val: StatusType) => void;
    filterStatus: StatusType;
}

export function ClientList({ clients, currentClient, setCurrentClient, isLoading, setActionModule, getClients, page, hasMore, filterStatus, setFilterStatus }: ClientListProps) {

    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const filters: FilterStatus[] = useMemo(() => {
        return [{
            title: 'Todos',
            value: 'all'
        }, {
            title: 'Activo',
            value: 'active'
        }, {
            title: 'Inactivo',
            value: 'inactive'
        }]
    }, [])

    const deleteClient = async () => {
        if (currentClient) {
            setIsDeleting(true)
            const response = await ClientService.destroy(currentClient.id)
            if (response.success) {
                toast("Válido", { description: "Eliminado satisfactoriamente" })
                setActionModule('dashboard')
                getClients()
            } else {
                toast("Error", { description: response.message })
            }
            setIsOpenDialog(false);
            setIsDeleting(false)
        }
    }

    return (
        <div className="w-96 p-6 backdrop-blur-xl bg-white/5 border-r border-white/10 flex flex-col h-full">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Clientes</h2>
                    <div className="flex space-x-2">
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {filters.map(it => (
                                    <SelectItem value={it.value}>{it.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            size="sm"
                            className="bg-white/10 hover:bg-white/20 border-white/20 cursor-pointer"
                            onClick={() => {
                                setCurrentClient(undefined)
                                setActionModule('create')
                            }}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Plans List */}
            <div
                id="scrollableDiv"
                className="overflow-y-auto"
            >
                {clients.length ? (
                    <InfiniteScroll
                        dataLength={clients.length}
                        next={() => getClients(page)}
                        hasMore={hasMore}
                        loader={
                            <div className="flex items-center justify-center gap-2">
                                <Loader className="animate-spin" />
                            </div>
                        }
                        scrollableTarget="scrollableDiv"
                        style={{ overflow: 'visible' }}
                    >
                        {clients.map((client, index) => (
                            <ItemList
                                key={index}
                                client={client}
                                currentClient={currentClient}
                                getClients={getClients}
                                index={index}
                                setActionModule={setActionModule}
                                setCurrentClient={setCurrentClient}
                                setIsOpenDialog={setIsOpenDialog}
                            />
                        ))}
                    </InfiniteScroll>
                ) : (
                    !isLoading && (
                        <div className="flex items-center justify-center gap-2">
                            No se encontraron registros
                        </div>
                    )
                )}
            </div>

            <Dialog open={isOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>¿Estas seguro?</DialogTitle>
                        <DialogDescription className="mb-3">
                            Cliente: {currentClient?.first_name}{" "}{currentClient?.last_name}

                            <div className="flex justify-end gap-3">
                                {isDeleting ? (
                                    <Loader className="animate-spin" />
                                ) : (
                                    <>
                                        <Button variant="outline" onClick={() => setIsOpenDialog(false)} type="button">Cancelar</Button>
                                        <Button type="button" onClick={deleteClient}>Eliminar</Button>
                                    </>
                                )}
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}
