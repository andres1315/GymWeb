import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import type { ActionModule } from "@/features/Home/page/Client";
import type { Client } from "@/utils/interfaces/client";

interface ClientListProps {
    client: Client;
    setCurrentClient: (val: Client | undefined) => void;
    currentClient: Client | undefined;
    setIsOpenDialog: (val: boolean) => void;
    setActionModule: (val: ActionModule) => void;
    getClients: () => void;
    index: number;
}

export function ItemList({ client, currentClient, setCurrentClient, setIsOpenDialog, setActionModule, index }: ClientListProps) {
    return (
        <Card
            className={`cursor-pointer transition-all duration-500 scale-95 hover:scale-100 backdrop-blur-sm mb-3 border-white/10 ${currentClient?.id === client.id
                ? "bg-gradient-to-r from-emerald-500/30 to-teal-600/30 border-emerald-500/50 shadow-lg"
                : "bg-white/5 hover:bg-white/10"
                }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => {
                setCurrentClient(client)
                setActionModule('view')
            }}
        >
            <CardContent className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div>
                            <h3 className="font-semibold text-white text-sm">
                                {client.first_name}{" "}{client.last_name}
                            </h3>
                            <p className="text-xs text-gray-300">
                                Afiliación: {client.enrollment_date}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center gap-3">
                            {client.is_active ? (
                                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                                    Activo
                                </Badge>
                            ) : (
                                <Badge
                                    variant="secondary"
                                    className="bg-red-500/20 text-red-400"
                                >
                                    Inactivo
                                </Badge>
                            )}

                            {client.is_external && (
                                <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                                    Externo
                                </Badge>
                            )}
                        </div>

                        <Popover>
                            <PopoverTrigger asChild>
                                <EllipsisVertical className="mr-2 h-4 w-4" />
                            </PopoverTrigger>
                            <PopoverContent className="w-auto space-y-4">
                                <div className="flex items-center gap-3 cursor-pointer" onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentClient(client)
                                    setActionModule('update')
                                }}>
                                    <Pencil className="text-primary" />
                                    <span>Editar</span>
                                </div>
                                <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
                                    setCurrentClient(client)
                                    setIsOpenDialog(true)
                                }}>
                                    <Trash className="text-red-600" />
                                    <span>Eliminar</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
