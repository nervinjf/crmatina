import React from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getRegistros, getRegistrosThunk } from '../store/slice/getForm.slice';
import axios from 'axios';
// import { getDefaultMiddleware } from 'react-redux/toolkit';

const Registros = () => {

    // const [ get, setGet ] = useState([]);

    const dispatch = useDispatch();
    const get = useSelector(state => state.getform.data)

    useEffect(() => {
        dispatch(getRegistrosThunk())
    }, [])

    // console.log(get)

    // console.log(new Date(get.data?.fechatime).toString())


    return (
        <div className='table-register'>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Nombre Cliente</th>
                    <th>Telefono</th>
                    <th>Correo</th>
                    <th>Dirección</th>
                    <th>Fecha</th>
                    <th>Fuente</th>
                    <th>Status</th>
                    <th>Efectiva</th>
                    <th>No Efectivo</th>
                    <th>No Localizable</th>
                    <th>Operador</th>
                    <th>Intentos</th>
                    <th>Appoiment Date</th>
                    <th>Selle</th>
                    <th>Claim</th>
                    <th>Claim Number</th>
                    <th>Compañía de Seguro</th>
                    <th>Número de póliza</th>
                    <th>CLAIM </th>
                    <th>DOL</th>
                    <th>Description</th>
                    <th>Nota</th>
                </tr>
            </thead>
                    <tbody>
                        {/* {
                            // get.data?.map(gett => (
                            //     <tr key={gett.id}>
                            // <th>{gett.id}</th>
                            // <th>{gett.nombre}</th>
                            // <th>{gett.telefono}</th>
                            // <th>{gett.correo}</th>
                            // <th>{gett.direccion}</th>
                            // <th>{new Date(gett?.fechatime).toLocaleString('es-VE', { timeZone: 'UTC' })}</th>
                            // <th>{gett.fuente}</th>
                            // <th>{gett.status}</th>
                            // <th>{gett.efectiva}</th>
                            // <th>{gett.noefectiva}</th>
                            // <th>{gett.nolocalizable}</th>
                            // <th>{gett.operador}</th>
                            // <th>{gett.intentos}</th>
                            // <th>{new Date(gett?.appoimentdate).toLocaleString('es-VE', { timeZone: 'UTC' })}</th>
                            // <th>{gett.selle}</th>
                            // <th>{gett.claim}</th>
                            // <th>{gett.claimnumber}</th>
                            // <th>{gett.companiaseguro}</th>
                            // <th>{gett.numerop}</th>
                            // <th>{gett.claimp}</th>
                            // <th>{gett.dol}</th>
                            // <th>{gett.description}</th>
                            // <th>{gett.nota}</th>
                        </tr>
                            ))
                        } */}
                        
                    </tbody>
        </Table>
        </div>
    );
};

export default Registros;