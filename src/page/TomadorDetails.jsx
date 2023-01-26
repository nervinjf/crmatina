import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import RegisterContact from './RegisterContact';
import RegisterCitaC from './RegisterCitaC';
import Loading from './Loading';
import UpdateTomador from './UpdateTomador';
import getConfig from '../utils/getConfig';


const TomadorDetails = () => {

    const { id } = useParams();
    const [tomadorDetails, setToamdorDetails] = useState({});
    const [registerContact, setRegisterContact ] = useState(false)
    const [registerCitaC, setRegisterCitaC ] = useState(false)
    const [updateTomador, setUpdateTomador ] = useState(false)
    const [test, setTest] = useState("")
    const [tomador, setTomador] = useState("")
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`https://atina-neb-production.up.railway.app/api/v1/tomador/${id}`, getConfig())
            .then(res => setToamdorDetails(res.data))
            .finally(() => setLoading(false))
    }, [registerContact || registerCitaC || updateTomador ])

    console.log(tomadorDetails)

    const updateCita = (data) => {
        setRegisterCitaC(true)
        setTest(data)
    }

    const updateToma = (data) => {
        setUpdateTomador(true)
        setTomador(data)
    }

        let hoy = new Date()
        let fechaNacimiento = new Date(tomadorDetails?.fNacimiento)
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
        let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
        if (
          diferenciaMeses < 0 ||
          (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
        ) {
          edad--
        }

    return (
        <div className='contain-tomador-info'>
            {loading && <Loading/>}
            <div className='info-tomador'>
                <div className='contain-info-tomador-input'>
                    <label htmlFor="Nombre">Nombre:</label>
                    <input type="text" value={tomadorDetails?.firstname + " " + tomadorDetails?.lastname} disabled />
                    <label htmlFor="Nombre">Cedula:</label>
                    <input type="text" value={tomadorDetails?.ci} disabled />
                    <label htmlFor="Nombre">Email:</label>
                    <input type="text" value={tomadorDetails?.email} disabled />
                    <label htmlFor="Nombre">Telefono:</label>
                    <input type="text" value={tomadorDetails?.phone1} disabled />
                    <label htmlFor="Nombre">Direccion:</label>
                    <input type="text" value={tomadorDetails?.address1} disabled />
                    <label htmlFor="Nombre">Fecha de Nacimiento:</label>
                    <input type="text" value={tomadorDetails?.fNacimiento} disabled />
                    <label htmlFor="Nombre">Patologia:</label>
                    <input type="text" value={tomadorDetails?.patologia} disabled />
                    <label htmlFor="Nombre">Medicamentos:</label>
                    <input type="text" value={tomadorDetails?.medicamentos} disabled />
                    <label htmlFor="Nombre">Edad:</label>
                    <input type="text" value={edad} disabled />
                </div>
                <div className='info-tomador-update'>
                    <button onClick={() => updateToma(tomadorDetails)}><i class="fa-solid fa-pen-to-square"></i></button>
                </div>
            </div>
            <div className='info-tomador'>
                <div className='info-tomador-title-btn'>
                    <div>
                        <h3>Registrar Cita/Cotizacion</h3>
                    </div>
                    <div>
                        <button  onClick={() => setRegisterCitaC(true)}>Register</button>
                    </div>
                </div>
                <div className='info-tomador-infodetails'>
                    <div className='contain-info-contacto-table'>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Fecha Act.</th>
                                    <th>Tipo de Poliza</th>
                                    <th>Plan</th>
                                    <th>Tiempo</th>
                                    <th>Monto de poliza</th>
                                    <th>Fec. Cita</th>
                                    <th>Status</th>
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    tomadorDetails?.cita?.map(user => (
                                        <tr key={user?.id}>
                                            <td>{new Date(user?.createdAt).toLocaleString('es-VE', { timeZone: 'UTC' })}</td>
                                            <td>{new Date(user?.updatedAt).toLocaleString('es-VE', { timeZone: 'UTC' })}</td>
                                            <td>{user?.tipo}</td>
                                            <td>{user?.plan}</td>
                                            <td>{user?.tiempo}</td>
                                            <td>{user?.poliza}</td>
                                            <td>{new Date(user?.fecha).toLocaleString('es-VE', { timeZone: 'UTC' })}</td>
                                            <td>{user?.statusSuscripcion}</td>
                                            <td><button onClick={() => updateCita(user)}><i class="fa-solid fa-pen-to-square"></i></button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <div className='info-tomador'>
                <div className='info-tomador-title-btn'>
                    <div>
                        <h3>Registrar Contacto</h3>
                    </div>
                    <div>
                        <button onClick={() => setRegisterContact(true)}>Register</button>
                    </div>
                </div>
                <div className='info-tomador-infodetails'>
                    <div className='contain-info-contacto-table'>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Fecha Creacion</th>
                                    <th>Origen</th>
                                    <th>fuente</th>
                                    <th>proposito</th>
                                    <th>motivo1</th>
                                    <th>motivo2</th>
                                    <th>motivo3</th>
                                    <th>observacion</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    tomadorDetails?.contacto?.map(user => (
                                        <tr key={user?.id}>
                                            <td>{new Date(user?.createdAt).toLocaleString('es-VE', { timeZone: 'UTC' })}</td>
                                            <td>{user?.origen}</td>
                                            <td>{user?.fuente}</td>
                                            <td>{user?.proposito}</td>
                                            <td>{user?.motivo1}</td>
                                            <td>{user?.motivo2}</td>
                                            <td>{user?.motivo3}</td>
                                            <td>{user?.observacion}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            {registerContact && <RegisterContact id={id} setRegisterContact={setRegisterContact}/>}
            {registerCitaC && <RegisterCitaC id={id} setRegisterCitaC={setRegisterCitaC} updateCita={test}/>}
            { updateTomador && <UpdateTomador id={id} setUpdateTomador={setUpdateTomador} updateToma={tomador}/>}
        </div>
    );
};

export default TomadorDetails;