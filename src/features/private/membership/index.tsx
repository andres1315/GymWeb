import { useState } from "react";

import { SettingMemberShip } from "./components/SettingMemberShip";

import type { MembershipSaved } from "./models/MembershipSaved";
import { ListMemberShip } from "./components/ListMemberShip";
import { TopCard } from "./components/TopCard";
import { useMembershipQuery } from "./hooks/useMembershipQuery";
import PageLoader from "@/components/page-loader";

const Membership = () => {
  const { GetAllMemberships } = useMembershipQuery();
  const { data: ListMembership, isLoading: isLoadingListMembership } =
    GetAllMemberships();

  /*STATE  */
  const [selectedPlan, setSelectedPlan] = useState<MembershipSaved | null>(
    null
  );
  const [filterActive, setFilterActive] = useState("all");
  const [isCreate, setIsCreate] = useState(false);

  const filteredPlans =
    ListMembership?.data?.filter((plan: MembershipSaved) => {
      const matchesFilter =
        filterActive === "all" ||
        (filterActive === "active" && plan.is_active) ||
        (filterActive === "inactive" && !plan.is_active);
      return matchesFilter;
    }) || [];

  return (
    <div className="grid grid-cols-12 w-full mx-2">
      <PageLoader loading={isLoadingListMembership} />
      <ListMemberShip
        filterActive={filterActive}
        setFilterActive={setFilterActive}
        filteredPlans={filteredPlans}
        setSelectedPlan={setSelectedPlan}
        selectedPlan={selectedPlan}
        setIsCreate={setIsCreate}
      />

      <div className="flex-1 overflow-auto col-span-12 lg:col-span-9 mt-6 lg:mt-0 lg:mx-4">
        <div className="md:max-w-6xl mx-auto space-y-4">
          {selectedPlan && <TopCard selectedPlan={selectedPlan} />}
          {(isCreate || selectedPlan) && (
            <SettingMemberShip
              isCreate={isCreate}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              setIsCreate={setIsCreate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Membership;
