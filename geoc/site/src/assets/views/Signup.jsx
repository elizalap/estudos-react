import { Link } from 'react-router-dom';
import { useRef } from 'react';
import axiosClient from '../../axios-client.js'
import { useStateContext } from '../../contexts/ContextProvider.jsx';

export default function Signup() {
   const nameRef = useRef();
   const emailRef = useRef();
   const passwordRef = useRef();
   const passwordConfirmationRef = useRef();

   const { setUser, setToken } = useStateContext()

   const onSubmit = (ev) => {
      ev.preventDefault();
      const payload = {
         name: nameRef.current.value,
         email: emailRef.current.value,
         password: passwordRef.current.value,
         password_confirmation: passwordConfirmationRef.current.value,
      }
      axiosClient.post('/signup', payload)
         .then(({ data }) => {
            setUser(data.user)
            setToken(data.token)
         })
         .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
               console.log(response.data.errors)
            }
         })
   }

   return (
      <form onSubmit={onSubmit}>
         <h1 className="title">
            Cadastro
         </h1>
         <input ref={nameRef} type="text" placeholder="Nome" />
         <input ref={emailRef} type="email" placeholder="E-mail" />
         <input ref={passwordRef} type="password" placeholder="Senha" />
         <input ref={passwordConfirmationRef} type="password" placeholder="Confirmar senha" />
         <button className="btn btn-block">Signup</button>
         <p className="message">
            Already registered? <Link to="/login">Sign in</Link>
         </p>
      </form>
   );
};