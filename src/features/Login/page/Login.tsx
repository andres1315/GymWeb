import { BackgroundGradient } from "@/components/ui/customTheme"
import { HeaderLogin } from "../components/HeaderLogin"
import { AuthForm } from "../components/AuthForm"

function Login(){
  return(
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
      <div className="relative z-10 mx-4 w-full max-w-md">
        <BackgroundGradient className="rounded-[22px] bg-white p-4 sm:p-10 dark:bg-zinc-900">
          <div className="border-0 bg-transparent shadow-none">
            <HeaderLogin />
            <AuthForm />
          </div>
        </BackgroundGradient>
      </div>
    </main>
  )
}

export default Login