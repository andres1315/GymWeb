import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Users } from "lucide-react";

export function TopCard({selectedPlan}) {
  return (
    <Card className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border-white/20 shadow-2xl">
      <CardContent className="px-4 ">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div
              className={`p-4 rounded-2xl bg-gradient-to-r ${selectedPlan.color} shadow-2xl`}
            >
              <selectedPlan.icon className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                {selectedPlan.name}
              </h3>
              <p className="text-gray-300">Plan de membresía premium</p>
            </div>
          </div>
        </div>

        {/* Advanced Metrics Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center p-2 rounded-xl bg-white/5 backdrop-blur-sm">
            <DollarSign className="h-4 w-4 text-emerald-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-white">
              ${selectedPlan.price.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">Precio Mensual</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-white/5 backdrop-blur-sm">
            <Users className="h-4 w-4 text-blue-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-white">
              {selectedPlan.members}
            </p>
            <p className="text-xs text-gray-400">Miembros Activos</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
