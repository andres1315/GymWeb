import { ClientForm } from "../components/client/ClientForm";
import { ClientList } from "../components/client/ClientList";
import { HomeClients } from "../components/client/HomeClients";
import { useEffect, useState } from "react";
import ClientService from "@/services/client/ClientService";
import type { Client as IClient } from "@/utils/interfaces/client";

export type ActionModule = 'create' | 'update' | 'view' | 'dashboard';

export const Client = () => {

  const [actionModule, setActionModule] = useState<ActionModule>('dashboard');

  const [clients, setClients] = useState<IClient[]>([]);
  const [currentClient, setCurrentClient] = useState<IClient>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getClients()
  }, [])

  const getClients = async () => {
    setIsLoading(true);
    const clients = await ClientService.getAll();
    if (clients.success) {
      setClients(clients.data ?? [])
    }
    setIsLoading(false);
  }

  return (
    <div className="flex w-full">
      <ClientList
        isLoading={isLoading}
        clients={clients}
        currentClient={currentClient}
        setCurrentClient={setCurrentClient}
        setActionModule={setActionModule}
        getClients={getClients}
      />

      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-4">
          {(actionModule == 'create' || actionModule == "update" || actionModule == "view") && (
            <ClientForm
              actionModule={actionModule}
              setActionModule={setActionModule}
              getClients={getClients}
              currentClient={currentClient}
            />
          )}

          {actionModule == 'dashboard' && (
            <HomeClients />
          )}
        </div>
      </div>
    </div>
  );
};
