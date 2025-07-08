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
import { Plus, TrendingUp } from "lucide-react";

export function ListMemberShip({
  setSelectedPlan,
  filteredPlans,
  setFilterActive,
  filterActive,
  selectedPlan,
}) {
  return (
    <div className="w-96 p-6 backdrop-blur-xl bg-white/5 border-r border-white/10 flex flex-col h-full">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Planes Activos</h2>
          <div className="flex space-x-2">
            <Select value={filterActive} onValueChange={setFilterActive}>
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
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        
      </div>

      {/* Plans List */}
      <div className="space-y-1 h-full overflow-y-auto">
        {filteredPlans.map((plan, index) => {
          const IconComponent = plan.icon;
          return (
            <Card
              key={plan.id}
              className={`cursor-pointer transition-all duration-500 scale-95 hover:scale-100 backdrop-blur-sm border-white/10 ${
                selectedPlan.id === plan.id
                  ? "bg-gradient-to-r from-emerald-500/30 to-teal-600/30 border-emerald-500/50 shadow-2xl shadow-emerald-500/25"
                  : "bg-white/5 hover:bg-white/10"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedPlan(plan)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-r ${plan.color} shadow-lg`}
                    >
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-gray-300">
                        ${plan.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {plan.active ? (
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

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">{plan.members} miembros</span>
                  <div
                    className={`flex items-center space-x-1 ${
                      plan.growth > 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    <TrendingUp className="h-3 w-3" />
                    <span>
                      {plan.growth > 0 ? "+" : ""}
                      {plan.growth}%
                    </span>
                  </div>
                </div>

                <Progress
                  value={(plan.members / 500) * 100}
                  className="mt-2 h-1"
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
