import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './style/button.css'
import axios from 'axios';
import Navbarn from './page/Navbarn'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Registros from './page/Registros';
import Registrar from './page/Registrar';
import Home from './page/Home';
import Calendar from './page/Calendar'
import TomadorDetails from './page/TomadorDetails';
import RegisterUser from './page/RegisterUser';
import Pivote from './page/Pivote';
import LogIn from './Component/LogIn';
import ProtectedRoutes from './Component/ProtectedRoutes';
import getConfig from './utils/getConfig';


function App() {

  const [userSelected, setUserSelected] = useState(null);
  const [ act, setAct ] = useState(false)

  const selectRegister = (data) => {
    setUserSelected(data)
  }

  useEffect(() => {
    axios.get(`https://atina-neb-production.up.railway.app/api/v1/tomador`, getConfig())
        .catch(error => {
            console.log(error.response)
            if (error.response.status === 400) {
                    localStorage.removeItem("userData");
            }
        })
  }, [act])

  setTimeout(() => {
    setAct(act != true ? true : false);
}, "3600000")


  return (
    <div className='body'>
      <HashRouter>
        <Navbarn />
        <Routes>
          <Route path='/login' element={<LogIn />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/registrar' element={<Registrar />} />
            <Route path='/registros' element={<Registros />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path="/tomadordetails/:id" element={<TomadorDetails />} />
            <Route path="/registeruser" element={<RegisterUser />} />
            <Route path="/pivote" element={<Pivote />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
