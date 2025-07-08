import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Activity, Calendar, Clock, CreditCard, DollarSign, Plus, Save, Settings, Star, TrendingUp, Users, Zap } from "lucide-react";
import { useState } from "react";

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
]


export const Membership = () => {
  const [selectedPlan, setSelectedPlan] = useState(membershipPlans[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterActive, setFilterActive] = useState("all")
  const [animateCards, setAnimateCards] = useState(false)

  const filteredPlans = membershipPlans.filter((plan) => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterActive === "all" ||
      (filterActive === "active" && plan.active) ||
      (filterActive === "inactive" && !plan.active)
    return matchesSearch && matchesFilter
  })
  return (
    <div className="flex h-[calc(100vh-5rem)] relative">
        <div className="w-96 p-6 backdrop-blur-xl bg-white/5 border-r border-white/10">
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
                <Button size="sm" className="bg-white/10 hover:bg-white/20 border-white/20">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Card className="bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border-emerald-500/30 backdrop-blur-sm">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-emerald-400" />
                    <div>
                      <p className="text-xs text-emerald-300">Total Miembros</p>
                      <p className="text-lg font-bold text-white">470</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-purple-400" />
                    <div>
                      <p className="text-xs text-purple-300">Ingresos Mes</p>
                      <p className="text-lg font-bold text-white">$45M</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Plans List */}
          <div className="space-y-3 max-h-[calc(100vh-20rem)] overflow-y-auto custom-scrollbar">
            {filteredPlans.map((plan, index) => {
              const IconComponent = plan.icon
              return (
                <Card
                  key={plan.id}
                  className={`cursor-pointer transition-all duration-500 hover:scale-105 backdrop-blur-sm border-white/10 ${
                    selectedPlan.id === plan.id
                      ? "bg-gradient-to-r from-emerald-500/30 to-teal-600/30 border-emerald-500/50 shadow-2xl shadow-emerald-500/25"
                      : "bg-white/5 hover:bg-white/10"
                  } ${animateCards ? "animate-in slide-in-from-left duration-700" : ""}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl bg-gradient-to-r ${plan.color} shadow-lg`}>
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-sm">{plan.name}</h3>
                          <p className="text-xs text-gray-300">${plan.price.toLocaleString()}</p>
                        </div>
                      </div>
                      {plan.active ? (
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">Activo</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-500/20 text-gray-400">
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

                    <Progress value={(plan.members / 500) * 100} className="mt-2 h-1" />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <Card className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${selectedPlan.color} shadow-2xl`}>
                      <selectedPlan.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-1">{selectedPlan.name}</h1>
                      <p className="text-gray-300">Plan de membresía premium</p>
                    </div>
                  </div>
                 
                </div>

                {/* Advanced Metrics Grid */}
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                    <DollarSign className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">${selectedPlan.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Precio Mensual</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                    <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{selectedPlan.members}</p>
                    <p className="text-xs text-gray-400">Miembros Activos</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                    <TrendingUp className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">
                      {selectedPlan.growth > 0 ? "+" : ""}
                      {selectedPlan.growth}%
                    </p>
                    <p className="text-xs text-gray-400">Crecimiento</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                    <Activity className="h-6 w-6 text-pink-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">94%</p>
                    <p className="text-xs text-gray-400">Satisfacción</p>
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
                        <Label className="text-white font-medium">Fecha de Vcto</Label>
                        <p className="text-xs text-gray-400 mt-1">Generar Movimiento de Fecha de vencimiento</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <div>
                        <Label className="text-white font-medium">Factura</Label>
                        <p className="text-xs text-gray-400 mt-1">Generar Factura de Venta</p>
                        
                      </div>
                      <Switch className="data-[state=checked]:bg-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <div>
                        <Label className="text-white font-medium">Código de Cliente</Label>
                        <p className="text-xs text-gray-400 mt-1">Generar código único por cliente</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <div>
                        <Label className="text-white font-medium">Generar Movimiento de Fecha de Vcto</Label>
                        
                      </div>
                      <Switch className="data-[state=checked]:bg-emerald-500" />
                    </div>

                    

                    <div className="space-y-3">
                      <Label className="text-white font-medium">Entradas Máximas por Día</Label>
                      <div className="px-4 py-3 rounded-xl bg-white/5">
                        <Slider defaultValue={[3]} max={10} min={1} step={1} className="w-full" />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>1</span>
                          <span className="text-emerald-400 font-medium">3 entradas</span>
                          <span>10</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white font-medium">Descuento Aplicable (%)</Label>
                      <div className="px-4 py-3 rounded-xl bg-white/5">
                        <Slider defaultValue={[0]} max={50} min={0} step={5} className="w-full" />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>0%</span>
                          <span className="text-purple-400 font-medium">Sin descuento</span>
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
                      <Label className="text-white font-medium mb-3 block">Días de la Semana</Label>
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
                      <p className="text-xs text-gray-400 mt-2">Lunes a Viernes habilitados</p>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white font-medium">Horario de Acceso</Label>
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
                        <Label className="text-white font-medium">Validación Manual</Label>
                        <p className="text-xs text-gray-400 mt-1">Requiere aprobación del staff</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                        <Label className="text-white font-medium">Fecha de Vcto</Label>
                        <p className="text-xs text-gray-400 mt-1">Generar Movimiento de Fecha de vencimiento</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <div>
                        <Label className="text-white font-medium">Factura</Label>
                        <p className="text-xs text-gray-400 mt-1">Generar Factura de Venta</p>
                        
                      </div>
                      <Switch className="data-[state=checked]:bg-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <div>
                        <Label className="text-white font-medium">Código de Cliente</Label>
                        <p className="text-xs text-gray-400 mt-1">Generar código único por cliente</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <div>
                        <Label className="text-white font-medium">Generar Movimiento de Fecha de Vcto</Label>
                        
                      </div>
                      <Switch className="data-[state=checked]:bg-emerald-500" />
                    </div>

                    

                    <div className="space-y-3">
                      <Label className="text-white font-medium">Entradas Máximas por Día</Label>
                      <div className="px-4 py-3 rounded-xl bg-white/5">
                        <Slider defaultValue={[3]} max={10} min={1} step={1} className="w-full" />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>1</span>
                          <span className="text-emerald-400 font-medium">3 entradas</span>
                          <span>10</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white font-medium">Descuento Aplicable (%)</Label>
                      <div className="px-4 py-3 rounded-xl bg-white/5">
                        <Slider defaultValue={[0]} max={50} min={0} step={5} className="w-full" />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>0%</span>
                          <span className="text-purple-400 font-medium">Sin descuento</span>
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
                      <Label className="text-white font-medium mb-3 block">Días de la Semana</Label>
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
                      <p className="text-xs text-gray-400 mt-2">Lunes a Viernes habilitados</p>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white font-medium">Horario de Acceso</Label>
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
                        <Label className="text-white font-medium">Validación Manual</Label>
                        <p className="text-xs text-gray-400 mt-1">Requiere aprobación del staff</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

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
                    <Label className="text-white font-medium">Métodos de Pago</Label>
                    <div className="space-y-2">
                      {["Efectivo", "Tarjeta de Crédito", "Transferencia", "PayPal"].map((method) => (
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
                    <Label className="text-white font-medium">Configuración Avanzada</Label>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <span className="text-white text-sm">Pagos Parciales</span>
                        <Switch className="data-[state=checked]:bg-purple-500" />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <span className="text-white text-sm">Auto-renovación</span>
                        <Switch className="data-[state=checked]:bg-purple-500" />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <span className="text-white text-sm">Recordatorios</span>
                        <Switch className="data-[state=checked]:bg-purple-500" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white font-medium">Integración Contable</Label>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs text-gray-400">Código P.U.C.</Label>
                        <Input placeholder="01-MENSUALIDAD" className="bg-white/10 border-white/20 text-white mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-400">Centro de Costo</Label>
                        <Select>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gym">Gimnasio Principal</SelectItem>
                            <SelectItem value="classes">Clases Grupales</SelectItem>
                            <SelectItem value="personal">Entrenamiento Personal</SelectItem>
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
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
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
  )
};