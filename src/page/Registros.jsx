import React from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getRegistros, getRegistrosThunk } from '../store/slice/getForm.slice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { getDefaultMiddleware } from 'react-redux/toolkit';

const Registros = () => {

    const navigate = useNavigate();

    const [getTomador, setGetTomador] = useState([]);
    const [ numberFilter, setNumberFilter ] = useState(0);
    const [ getTomadorFilter, setGetTomadorFilter ] = useState([])
    const [ getIdTomador, setGetIdToamdor ] = useState(null);

    let tomadorFilter; 

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/tomador')
            .then(res => setGetTomador(res.data))

        tomadorFilter = setGetTomadorFilter(getTomador.filter(e => e.contacto.length === Number(numberFilter)));
        console.log(getTomadorFilter)
    }, [numberFilter || getTomador ])

    // console.log(get)

    // console.log(new Date(get.data?.fechatime).toString())


    return (
        <>
        <div className='table-register-filter'>
            <h3>Filtros</h3>
            <div className='table-register-filter-items'>
                <p>Contactos: </p>
                <select name="" id="" onChange={e => setNumberFilter(e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>
        <div className='table-register'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>CI</th>
                        <th>Correo</th>
                        <th>phone1</th>
                        <th>phone2</th>
                        <th>phone3</th>
                        <th>Direccion</th>
                        <th>Direccion2</th>
                        <th>Fecha Nacimiento</th>
                        <th>Patologia</th>
                        <th>Medicamentos</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getTomadorFilter?.map(gett => (
                            <tr key={gett.id}>
                                <th onClick={() => navigate(`/tomadordetails/${gett.id}`)}>{gett.firstname}</th>
                                <th>{gett.lastname}</th>
                                <th>{gett.ci}</th>
                                <th>{gett.email}</th>
                                {/* <th>{new Date(gett?.fechatime).toLocaleString('es-VE', { timeZone: 'UTC' })}</th> */}
                                <th>{gett.phone1}</th>
                                <th>{gett.phone2}</th>
                                <th>{gett.phone3}</th>
                                <th>{gett.address1}</th>
                                <th>{gett.address2}</th>
                                <th>{gett.fNacimiento}</th>
                                <th>{gett.patologia}</th>
                                <th>{gett.medicamentos}</th>
                                
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </div>
        </>
    );
};

export default Registros;