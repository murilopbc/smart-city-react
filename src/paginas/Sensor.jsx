
import React, { useEffect, useState } from "react";
import axios from "axios";
import estilos from './Sensor.module.css';
import { Link } from 'react-router-dom'

export function Sensor() {
    const [sensores, setSensores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSensores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/sensores/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSensores(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }
        fetchSensores();
    }, []);

    if (loading) {
        return <div className={estilos.loading}>Carregando</div>;
    }

    if (error) {
        return <div className={estilos.error}>Erro ao carregar os dados: {error.message}</div>;
    }

    // Add a guard clause to check if sensores is an array
    if (!Array.isArray(sensores)) {
        return <div className={estilos.error}>Erro: dados de sensores inválidos</div>;
    }

    return (
        <div className={estilos.container}>
             <h1 className={estilos.titulo}>Lista de Sensores</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Localização</th>
                        <th>Responsável</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Alterar Dados</th>
                    </tr>
                </thead>
                <tbody>
                    {sensores.map(sensor => (
                        <tr key={sensor.id}>
                            <td>{sensor.id}</td>
                            <td>{sensor.tipo}</td>
                            <td>{sensor.localizacao}</td>
                            <td>{sensor.responsavel}</td>
                            <td>{sensor.latitude}</td>
                            <td>{sensor.longitude}</td>
                            <td><Link to={`alterar-sensor/${sensor.id}`}>Alterar</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}