import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { Link, Navigate, Outlet } from "react-router-dom";

export default function DefaultLayout() {
   const { user, token } = useStateContext()

   if (!token) {
      return <Navigate to="/login" />
   }

   const onLogout = (ev) => {
      ev.preventDefault();
   }
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