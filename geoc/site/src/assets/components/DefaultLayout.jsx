import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../../axios-client.js";

export default function DefaultLayout() {
   const { user, token, setUser, setToken } = useStateContext()

   if (!token) {
      return <Navigate to="/login" />
   }

   const onLogout = (ev) => {
      ev.preventDefault();
      axiosClient.post('/logout')
         .then(() => {
            setUser({})
            setToken(null)
         })
   }

   useEffect(() => {
      axiosClient.get('/user')
         .then(({ data }) => {
            setUser(data)
         })
   }, [])

   return (
      <div id="defaultLayout">
         <aside>
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/users">Usuários</Link>
         </aside>
         <div className="content">
            <header>
               <div>Header</div>
               <div>
                  Olá, {user.name}!
                  <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
               </div>
            </header>
            <main>
               <Outlet />
            </main>
         </div>
      </div>
   );
}