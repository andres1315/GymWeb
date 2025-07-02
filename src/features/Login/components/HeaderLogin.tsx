export function HeaderLogin() {
  return (
    <section className="space-y-4 text-center pb-4">
      <div className="flex justify-center">
        <div className="relative overflow-hidden rounded-2xl bg-primary p-4">
          <div className="relative z-10 h-12 w-12 text-white" />
          <div className="absolute inset-0 h-full w-full" />
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold">{import.meta.env.VITE_APP_NAME}</h2>
        
      </div>
      <div>
        <h3 className="text-2xl">Iniciar Sesión</h3>
        <p>Accede a tu cuenta para continuar</p>
      </div>
    </section>
  );
}
