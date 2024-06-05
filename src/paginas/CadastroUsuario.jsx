import React, { useState } from 'react';
import axios from "axios";
import estilos from './CadastroUsuario.module.css';
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

export function CadastroUsuario() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaLogin)
    });

    async function obterTokenAdministrador() {
        try {
            const response = await axios.post('http://localhost:8000/api/token', {
                username: 'joao',  // substitua pelo username do administrador
                password: '123'  // substitua pela senha do administrador
            });

            return response.data.access;
        } catch (error) {
            console.error("Erro ao obter token do administrador", error);
            alert("Erro ao obter token do administrador. Por favor, tente novamente.");
            throw error;
        }
    }

    async function obterDadosFormulario(data) {
        try {
            const adminToken = await obterTokenAdministrador();

            await axios.post('http://localhost:8000/api/create_user', {
                username: data.usuario,
                password: data.senha
            }, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            });

            // Envia os dados de login para obter o token do usuário recém-criado
            const response = await axios.post('http://localhost:8000/api/token', {
                username: data.usuario,
                password: data.senha
            });

            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            console.log("Cadastro e autenticação realizados com sucesso");
            alert("Cadastro e autenticação realizados com sucesso");
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log("Usuário já cadastrado");
                alert("Usuário já cadastrado!");
            } else if (error.response && error.response.status === 401) {
                console.log("Não autorizado", error);
                alert("Erro de autorização. Por favor, tente novamente.");
            } else {
                console.log("Erro na autenticação", error);
                alert("Erro ao realizar o cadastro. Por favor, tente novamente.");
            }
        }
    }

    return (
        <div className={estilos.conteiner}>
            <p className={estilos.titulo}>Cadastre-se</p>

            <form className={estilos.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
                <input
                    {...register('usuario')}
                    className={estilos.campo}
                    placeholder="Usuário"
                />
                {errors.usuario && (
                    <p>{errors.usuario.message}</p>
                )}
                <input
                    {...register('senha')}
                    type="password"
                    className={estilos.campo}
                    placeholder="Senha"
                />
                {errors.senha && (
                    <p>{errors.senha.message}</p>
                )}
                <button className={estilos.botao}>Cadastrar</button>
            </form>
        </div>
    );
}
