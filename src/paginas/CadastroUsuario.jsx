import React, { useState } from 'react';
import axios from "axios";
import estilos from './CadastroUsuario.module.css';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const schemaCadastro = z.object({
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
        resolver: zodResolver(schemaCadastro)
    });
    async function obterDadosFormulario(data) {
        try {
            const response = await axios.post('http://localhost:8000/api/create_user', {
                username: data.usuario,
                password: data.senha
            });

            alert('Usuário cadastrado com sucesso!');
            navigate('/home'); // Redireciona para a página inicial após o cadastro
        } catch (error) {
            console.error('Erro no cadastro do usuário', error);
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
