import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Star, Users } from "lucide-react";
import type { MembershipSaved } from "../../models/membership/MembershipSaved";
interface Props {
  selectedPlan: MembershipSaved;
}
export function TopCard({ selectedPlan }: Props) {
  return (
    <Card className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border-white/20 shadow-2xl py-2">
      <CardContent>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-4">
            <div
              className={`p-3 rounded-2xl bg-gradient-to-r  from-emerald-500 to-teal-600 shadow-2xl`}
            >
              {selectedPlan && <Star className="h-4 w-4 text-white" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white ">
                {selectedPlan?.name}
              </h3>
              <p className="text-gray-300">{selectedPlan.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-1 rounded-xl bg-white/5 backdrop-blur-sm">
            <DollarSign className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
            <p className=" font-bold text-white">
              ${selectedPlan?.price_plan.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">Precio Mensual</p>
          </div>
          <div className="text-center p-1 rounded-xl bg-white/5 backdrop-blur-sm">
            <Users className="h-4 w-4 text-blue-400 mx-auto mb-1" />
            <p className=" font-bold text-white">{0}</p>
            <p className="text-xs text-gray-400">Miembros Activos</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
