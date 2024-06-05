import React from "react"
import { Routes, Route } from "react-router-dom"
import { Login } from '../paginas/Login'
import { Home } from '../paginas/Home'
import { Sensor } from '../paginas/Sensor'
import {CadastrarSensor} from '../paginas/CadastroSensores'
import { Localizacao } from "../paginas/Localizacao"
import {CadastroUsuario} from "../paginas/CadastroUsuario"



export function Rotas() {
    return (
        <Routes>

            <Route path='/' element={<Login />} />
            <Route path="cadUser" element={<CadastroUsuario />} />


            <Route path='/home' element={<Home />}>
                <Route index element={<Sensor />} />
                <Route path="cadSensor" element={<CadastrarSensor />} />
                <Route path='localizacao' element={<Localizacao />} />


            </Route>

        </Routes>
    )
}