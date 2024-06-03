import  React from 'react';
import axios from "axios";
import estilos from './Login.module.css';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom'
 
const schemaLogin = z.object({
    usuario:z.string()
            .min(1, "O minimo é de 5 caracteres")
            .max(15, "O maximo são 15 caracteres"),
    senha:z.string()
            .min(2, "Informe 4 caracteres")
            .max(20, "O maximo são 8 caracteres"),
});
 
export function Login(){
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{ errors }} =useForm({
        resolver: zodResolver(schemaLogin)
    });
 
    async function obterDadosFormulario(data){
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/token', {
                username: data.usuario,
                password: data.senha
            });
            const { access, refresh} = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
 
            console.log("Login bem sucedido");
            navigate('home');
            }
            catch(error){
                    console.log("Erro na autenticação", error);
            }
    }
 
    return(
        <div className={estilos.conteiner}>
            <p className={estilos.titulo}>Login</p>
 
            <form className={estilos.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
                <input
                    {...register('usuario')}
                    className={estilos.campo}
                    placeholder = "Usuário"                
                />
                {errors.usuario &&(
                    <p>{errors.usuario.message}</p>
                )}
                <input
                    {...register('senha')}
                    type = "password"
                    className={estilos.campo}
                    placeholder="Senha"
                />
                {errors.senha &&(
                    <p>{errors.senha.message}</p>
                )}
                <button className={estilos.botao}>Entrar</button>
            </form>
        </div>
    );
 
 
}
 