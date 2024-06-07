import React from 'react';
import axios from "axios";
import estilos from './Login.module.css';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const schemaLogin = z.object({
    usuario: z.string()
        .min(3, "O mínimo é de 3 caracteres")
        .max(10, "O máximo são 10 caracteres"),
    senha: z.string()
        .min(3, "Informe 3 caracteres")
        .max(6, "O máximo são 6 caracteres"),
});

export function Login() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaLogin)
    });

    async function obterDadosFormulario(data) {
        try {
            const response = await axios.post('http://localhost:8000/api/token', {
                username: data.usuario,
                password: data.senha
            });
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            alert("Login realizado com sucesso");
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                
                alert("Usuário ou senha incorretos. Tente novamente.");
            } else {
                alert("Erro na autenticação. Por favor, tente novamente.");
            }
        }
    }

    function redirectToSignUp() {
        navigate('/cadUser');
    }

    return (
        <div className={estilos.conteiner}>
            <p className={estilos.titulo}>Login</p>

            <form className={estilos.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
                <input
                    {...register('usuario')}
                    className={estilos.campo}
                    placeholder="Usuário"
                />
                {errors.usuario && (
                    <p className={estilos.error}>{errors.usuario.message}</p>
                )}
                <input
                    {...register('senha')}
                    type="password"
                    className={estilos.campo}
                    placeholder="Senha"
                />
                {errors.senha && (
                    <p className={estilos.error}>{errors.senha.message}</p>
                )}
                <button className={estilos.botao}>Entrar</button>
                <p><a onClick={redirectToSignUp} className={estilos.link}>Cadastre-se</a></p>
            </form>
        </div>
    );
}
