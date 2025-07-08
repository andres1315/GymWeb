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
import { useState } from "react";
import { ListMemberShip } from "../components/membership/ListMemberShip";

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

          {/* Advanced Configuration Panels */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left Panel - Core Settings */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-emerald-400" />
                  <span>Configuración Principal</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                      <Label className="text-white font-medium">Pago</Label>
                      <p className="text-xs text-gray-400 mt-1">Generar Pago</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                      <Label className="text-white font-medium">
                        Fecha de Vcto
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">
                        Generar Movimiento de Fecha de vencimiento
                      </p>
                    </div>
                    <Switch className="data-[state=checked]:bg-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                      <Label className="text-white font-medium">Factura</Label>
                      <p className="text-xs text-gray-400 mt-1">
                        Generar Factura de Venta
                      </p>
                    </div>
                    <Switch className="data-[state=checked]:bg-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                      <Label className="text-white font-medium">
                        Código de Cliente
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">
                        Generar código único por cliente
                      </p>
                    </div>
                    <Switch className="data-[state=checked]:bg-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                      <Label className="text-white font-medium">
                        Generar Movimiento de Fecha de Vcto
                      </Label>
                    </div>
                    <Switch className="data-[state=checked]:bg-emerald-500" />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white font-medium">
                      Entradas Máximas por Día
                    </Label>
                    <div className="px-4 py-3 rounded-xl bg-white/5">
                      <Slider
                        defaultValue={[3]}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>1</span>
                        <span className="text-emerald-400 font-medium">
                          3 entradas
                        </span>
                        <span>10</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white font-medium">
                      Descuento Aplicable (%)
                    </Label>
                    <div className="px-4 py-3 rounded-xl bg-white/5">
                      <Slider
                        defaultValue={[0]}
                        max={50}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>0%</span>
                        <span className="text-purple-400 font-medium">
                          Sin descuento
                        </span>
                        <span>50%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Panel - Access & Restrictions */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span>Control de Acceso</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                    <Label className="text-white font-medium mb-3 block">
                      Días de la Semana
                    </Label>
                    <div className="grid grid-cols-7 gap-2">
                      {["L", "M", "X", "J", "V", "S", "D"].map((day, index) => (
                        <div key={day} className="text-center">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium cursor-pointer transition-all ${
                              index < 5
                                ? "bg-emerald-500 text-white shadow-lg"
                                : "bg-white/10 text-gray-400 hover:bg-white/20"
                            }`}
                          >
                            {day}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Lunes a Viernes habilitados
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white font-medium">
                      Horario de Acceso
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-400">Desde</Label>
                        <Input
                          type="time"
                          defaultValue="06:00"
                          className="bg-white/10 border-white/20 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-400">Hasta</Label>
                        <Input
                          type="time"
                          defaultValue="22:00"
                          className="bg-white/10 border-white/20 text-white mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                      <Label className="text-white font-medium">
                        Validación Manual
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">
                        Requiere aprobación del staff
                      </p>
                    </div>
                    <Switch className="data-[state=checked]:bg-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Left Panel - Core Settings */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Settings className="h-5 w-5 text-emerald-400" />
                <span>Configuración Adicional</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="gap-6 grid grid-cols-2">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <Label className="text-white font-medium">
                      Dcto Cumpleaños
                    </Label>
                    <p className="text-xs text-gray-400 mt-1">
                      % Descuento mes de Cumpleaños
                    </p>
                  </div>
                  <Switch className="data-[state=checked]:bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <Label className="text-white font-medium">
                      Obsequio / Dcto
                    </Label>
                    <p className="text-xs text-gray-400 mt-1">
                      Elige Obsequio o Descuento de Cumpleaños
                    </p>
                  </div>
                  <Switch className="data-[state=checked]:bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <Label className="text-white font-medium">
                      Dcto Pronto Pago
                    </Label>
                    <p className="text-xs text-gray-400 mt-1">
                      Descento por Pronto Pago
                    </p>
                  </div>
                  <Switch className="data-[state=checked]:bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <Label className="text-white font-medium">
                      Dcto Pronto Pago 1er pago
                    </Label>
                    <p className="text-xs text-gray-400 mt-1">
                      Aplica Descuento Pronto Pago desde el 1er Pago
                    </p>
                  </div>
                  <Switch className="data-[state=checked]:bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <Label className="text-white font-medium">
                      Incremento por Mora en Pago
                    </Label>
                  </div>
                  <Switch className="data-[state=checked]:bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <Label className="text-white font-medium">
                      Genera Plan Pago
                    </Label>
                  </div>
                  <Switch className="data-[state=checked]:bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <Label className="text-white font-medium">
                      Inicia 1er día del Mes
                    </Label>
                  </div>
                  <Switch className="data-[state=checked]:bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <Label className="text-white font-medium">
                      Contiene paquetes de clases
                    </Label>
                  </div>
                  <Switch className="data-[state=checked]:bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <Label className="text-white font-medium">
                      Expide FICHA
                    </Label>
                  </div>
                  <Switch className="data-[state=checked]:bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <Label className="text-white font-medium">
                      Captar Abonos
                    </Label>
                  </div>
                  <Switch className="data-[state=checked]:bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <Label className="text-white font-medium">Genera CxC</Label>
                  </div>
                  <Switch className="data-[state=checked]:bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <Label className="text-white font-medium">
                      Permite Ingreso a todas las sedes
                    </Label>
                  </div>
                  <Switch className="data-[state=checked]:bg-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Configuration */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-purple-400" />
                <span>Configuración de Pagos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label className="text-white font-medium">
                    Métodos de Pago
                  </Label>
                  <div className="space-y-2">
                    {[
                      "Efectivo",
                      "Tarjeta de Crédito",
                      "Transferencia",
                      "PayPal",
                    ].map((method) => (
                      <div
                        key={method}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <Checkbox className="border-white/30" />
                        <span className="text-white text-sm">{method}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-white font-medium">
                    Configuración Avanzada
                  </Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <span className="text-white text-sm">
                        Pagos Parciales
                      </span>
                      <Switch className="data-[state=checked]:bg-purple-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <span className="text-white text-sm">
                        Auto-renovación
                      </span>
                      <Switch className="data-[state=checked]:bg-purple-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <span className="text-white text-sm">Recordatorios</span>
                      <Switch className="data-[state=checked]:bg-purple-500" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-white font-medium">
                    Integración Contable
                  </Label>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-gray-400">
                        Código P.U.C.
                      </Label>
                      <Input
                        placeholder="01-MENSUALIDAD"
                        className="bg-white/10 border-white/20 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-400">
                        Centro de Costo
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="classes">
                            Clases Grupales
                          </SelectItem>
                          <SelectItem value="personal">
                            Entrenamiento Personal
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancelar
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg">
              <Save className="mr-2 h-4 w-4" />
              Guardar Configuración
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
