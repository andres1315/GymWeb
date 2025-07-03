import { AnimatedGradientButton, HoverBorderGradient } from "@/components/ui/customTheme";
import { authService } from "@/services/auth/AuthService";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useUserStore } from "@/store/useUserStore";
import type { LoginCredentials } from "@/common/auth.type";

export function AuthForm() {
  const navigate = useNavigate()
  const { setUser } = useUserStore();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  useEffect(() => {
    validateAutentication();
  }, [])

  const validateAutentication = async () => {
    const response = await authService.isAuthenticated();
    if (response) {
      setUser({ ...response, isLogin: true })
      navigate('/home/dashboard', { replace: true })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await authService.login(formData)
    if (response.success) {
      setUser(response.data ? { ...response.data, isLogin: true } : {})
      navigate('/home/dashboard', { replace: true })
    }
  };

  return (
    <section className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo de email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            Correo Electrónico
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="admin@fitwinner.com"
            value={formData.email}
            onChange={handleChange}
            className="transition-colors focus-within:border-primary/50"
            required
          />
        </div>

        {/* Campo de contraseña */}
        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            Contraseña
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="pr-10 transition-colors focus-within:border-primary/50"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <HoverBorderGradient className="w-full rounded-md">
            <AnimatedGradientButton type="submit" className="w-full">
              <div className="flex items-center justify-center gap-2">
                <Lock className="h-4 w-4" />
                Iniciar Sesión
              </div>
            </AnimatedGradientButton>
          </HoverBorderGradient>

          <div className="flex flex-col space-y-2 text-center">
            <div className="text-sm text-muted-foreground">
              ¿Necesitas ayuda?{' '}
              <Button type="button" variant="link" className="h-auto p-0 text-sm text-primary hover:text-primary/80">
                Contactar soporte
              </Button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
