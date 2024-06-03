import estilos from './Lateral.module.css'
import { Link } from 'react-router-dom'

export function Lateral() {
    return (
        <aside className={estilos.container}>
            <header>
                <div className={estilos.perfil}>
                    <img
                        className={estilos.avatar}
                        src='https://avatars.githubusercontent.com/u/148149959?v=4'
                    />

                    <strong>Murilo</strong>

                </div>

            </header>
            <section>
                <Link className={estilos.botao} to='/cadSensor'>
                    Cadastrar Sensor
                </Link>
                <Link className={estilos.botao} to='/cadUsuario'>
                    Cadastrar Usuário
                </Link>
                <Link className={estilos.botao} to='/'>
                    Sair
                </Link>
            </section>

        </aside>
    )
} 