import React from 'react';
import axios from "axios";
import estilos from './Login.module.css';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const schemaLogin = z.object({
    usuario: z.string()
        .min(1, "O mínimo é de 5 caracteres")
        .max(15, "O máximo são 15 caracteres"),
    senha: z.string()
        .min(2, "Informe 4 caracteres")
        .max(20, "O máximo são 8 caracteres"),
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

            console.log("Login realizado com sucesso");
            alert("Login realizado com sucesso");
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("Usuário ou senha incorretos");
                alert("Usuário ou senha incorretos. Tente novamente.");
            } else {
                console.log("Erro na autenticação", error);
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
