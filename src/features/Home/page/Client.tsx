import { ClientForm } from "../components/client/ClientForm";
import { ClientList } from "../components/client/ClientList";
import { HomeClients } from "../components/client/HomeClients";
import { useEffect, useState } from "react";
import ClientService from "@/services/client/ClientService";
import type { Client as IClient } from "@/utils/interfaces/client";

export type ActionModule = 'create' | 'update' | 'view' | 'dashboard';

export type StatusType = 'all' | 'active' | 'inactive';

export const Client = () => {

  const [actionModule, setActionModule] = useState<ActionModule>('dashboard');

  const [page, setPage] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [clients, setClients] = useState<IClient[]>([]);
  const [filterStatus, setFilterStatus] = useState<StatusType>('all');
  const [currentClient, setCurrentClient] = useState<IClient>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getClients()
  }, [])

  useEffect(() => {
    getClients()
  }, [filterStatus])

  const getClients = async (page: string = '') => {
    setIsLoading(true);
    const response = await ClientService.getAll(page, filterStatus);
    if (response.success && response.data?.length) {
      if (response.cursor == null) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setPage(response.cursor ?? "");
      if (page === '') {
        setClients(response.data ?? [])
      } else {
        setClients([...clients, ...(response.data ?? [])])
      }
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
        page={page}
        hasMore={hasMore}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
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
