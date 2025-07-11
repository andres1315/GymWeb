import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ClientService from "@/services/client/ClientService";
import type { Client } from "@/utils/interfaces/client";
import { Loader, Plus, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import type { ActionModule } from "../../page/Client";

interface ClientListProps {
    clients: Client[];
    setCurrentClient: (val: Client | undefined) => void;
    currentClient: Client | undefined;
    isLoading: boolean;
    setActionModule: (val: ActionModule) => void;
}

export function ClientList({ clients, currentClient, setCurrentClient, isLoading, setActionModule }: ClientListProps) {
    return (
        <div className="w-96 p-6 backdrop-blur-xl bg-white/5 border-r border-white/10 flex flex-col h-full">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Clientes</h2>
                    <div className="flex space-x-2">
                        <Select /* value={filterActive} onValueChange={setFilterActive} */>
                            <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="active">Activos</SelectItem>
                                <SelectItem value="inactive">Inactivos</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            size="sm"
                            className="bg-white/10 hover:bg-white/20 border-white/20"
                            onClick={() => setActionModule('create')}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Plans List */}
            <div className="space-y-1 h-full overflow-y-auto">

                {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                        <Loader className="animate-spin" />
                    </div>
                ) : (
                    clients.length ? (
                        clients.map((client, index) => (
                            <Card
                                key={client.id}
                                className={`cursor-pointer transition-all duration-500 scale-95 hover:scale-100 backdrop-blur-sm border-white/10 ${currentClient?.id === client.id
                                    ? "bg-gradient-to-r from-emerald-500/30 to-teal-600/30 border-emerald-500/50 shadow-lg"
                                    : "bg-white/5 hover:bg-white/10"
                                    }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                                onClick={() => {
                                    setCurrentClient(client)
                                    setActionModule('view')
                                }}
                            >
                                <CardContent className="">
                                    <div className="flex items-center justify-between mb-3">
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
                                        {client.is_active ? (
                                            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                                                Activo
                                            </Badge>
                                        ) : (
                                            <Badge
                                                variant="secondary"
                                                className="bg-gray-500/20 text-gray-400"
                                            >
                                                Inactivo
                                            </Badge>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            No se encontraron registros
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
