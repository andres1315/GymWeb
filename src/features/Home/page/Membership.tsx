import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  Save,
  Settings,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ListMemberShip } from "../components/membership/ListMemberShip";
import { TopCard } from "../components/membership/TopCard";
import { SettingMemberShip } from "../components/membership/SettingMemberShip";
import { useMembershipQuery } from "../hooks/membership/useMembershipQuery";

const membershipPlans = [
  {
    id: 1,
    name: "MENSUAL",
    active: true,
    price: 79000,
    members: 245,
    growth: 12,
    color: "from-emerald-500 to-teal-600",
    icon: Calendar,
  },
  {
    id: 2,
    name: "TRIMESTRE",
    active: true,
    price: 210000,
    members: 89,
    growth: 8,
    color: "from-blue-500 to-cyan-600",
    icon: TrendingUp,
  },
  {
    id: 3,
    name: "SEMESTRE",
    active: false,
    price: 390000,
    members: 34,
    growth: -2,
    color: "from-purple-500 to-violet-600",
    icon: Star,
  },
  {
    id: 4,
    name: "FAMILIAR",
    active: true,
    price: 150000,
    members: 67,
    growth: 15,
    color: "from-pink-500 to-rose-600",
    icon: Users,
  },
  {
    id: 5,
    name: "ANUAL",
    active: true,
    price: 720000,
    members: 23,
    growth: 5,
    color: "from-amber-500 to-orange-600",
    icon: Zap,
  },
  {
    id: 6,
    name: "VIP PREMIUM",
    active: true,
    price: 250000,
    members: 12,
    growth: 25,
    color: "from-gradient-to-r from-yellow-400 via-red-500 to-pink-500",
    icon: Star,
  },
];

export const Membership = () => {
  const {GetAllMemberships} = useMembershipQuery()
  const {data:ListMembership, isLoading:isLoadingListMembership} =  GetAllMemberships()
  const [selectedPlan, setSelectedPlan] = useState(membershipPlans[0]);

  const [filterActive, setFilterActive] = useState("all");

  const filteredPlans = membershipPlans.filter((plan) => {
    const matchesSearch = plan.name.toLowerCase().includes("");
    const matchesFilter =
      filterActive === "all" ||
      (filterActive === "active" && plan.active) ||
      (filterActive === "inactive" && !plan.active);
    return matchesSearch && matchesFilter;
  });

  

  
  useEffect(()=>{
    console.log({ListMembership})
  },[ListMembership])
  return (
    <div className="flex w-full ">
      <ListMemberShip
        filterActive={filterActive}
        setFilterActive={setFilterActive}
        filteredPlans={filteredPlans}
        setSelectedPlan={setSelectedPlan}
        selectedPlan={selectedPlan}
      />

      <div className="flex-1  overflow-auto">
        <div className="max-w-6xl mx-auto space-y-4">
          <TopCard selectedPlan={selectedPlan} />

          <SettingMemberShip />
        </div>
      </div>
    </div>
  );
};
