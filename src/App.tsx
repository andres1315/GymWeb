
import './App.css'
import { ThemeProvider } from './components/themeProvider'

import { AppRouter } from './router/AppRouter'

function App() {
  

  return (
    <ThemeProvider>
      <AppRouter/>
    </ThemeProvider>
  )
}

export default App
