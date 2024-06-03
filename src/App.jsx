import './global.css'
import { BrowserRouter } from 'react-router-dom'
import { Rotas } from './rotas/Rotas'

export function App() {
  return (
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>

  )
}