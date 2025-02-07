import estilos from './Home.module.css'
import { Header } from '../componentes/Header'
import { Lateral } from '../componentes/Lateral'
import { Outlet } from 'react-router-dom'

export function Home() {

  return (
    <div className={estilos.gridContainer}>
      <Header />
      <Lateral />
      <Outlet/>

    </div>
  )
}