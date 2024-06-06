import estilos from './Lateral.module.css'
import { Link } from 'react-router-dom'

export function Lateral() {
    return (
        <aside className={estilos.container}>
            <section className={estilos.container}>
            <Link className={estilos.botao} to='/home'>
                    Visualizar Sensores
                </Link>
                <Link className={estilos.botao} to='/home/cadSensor'>
                    Cadastrar Sensor
                </Link>
                <Link className={estilos.botao} to='/home/localizacao'>
                    Mapa
                </Link>
                <Link className={estilos.botao} to='/'>
                    Sair
                </Link>
            </section>

        </aside>
    )
} 