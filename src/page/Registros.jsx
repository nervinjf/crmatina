import React from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getRegistros, getRegistrosThunk } from '../store/slice/getForm.slice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HotColumn, HotTable } from '@handsontable/react';
import "handsontable/dist/handsontable.full.css";
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, esMX } from 'handsontable/i18n'
// import { getDefaultMiddleware } from 'react-redux/toolkit';
import getConfig from '../utils/getConfig';


const Registros = () => {

    const navigate = useNavigate();

    const [getTomador, setGetTomador] = useState([]);
    const [ numberFilter, setNumberFilter ] = useState("");
    const [ nombreFilter, setNombreFilter ] = useState("");
    const [ getTomadorFilter, setGetTomadorFilter ] = useState([])
    const [ getIdTomador, setGetIdToamdor ] = useState(null);

    let tomadorFilter; 

    const FilterContac = (e) => {
        setNumberFilter(e.target.value)
    //    setGetTomadorFilter(getTomador.filter(e => e.contacto.length === Number(numero)));
    }
    const NombreFilter = (e) => {
        setNombreFilter(e.target.value)
    //    setGetTomadorFilter(getTomador.filter(e => e.contacto.length === Number(numero)));
    }

    let result = getTomador;
    if(!numberFilter){
        result 
    } else {
        result = result.filter(e => e.contacto.length === Number(numberFilter));
        // console.log(result.filter(e => e.contacto.length === Number(numberFilter)));
    }

    if(!nombreFilter){
        result
    } else {
        result = result.filter(e => e.firstname.toLowerCase().includes(nombreFilter.toLocaleLowerCase()));
    }


     registerAllModules();
    registerLanguageDictionary(esMX)

    const hotTableComponent = React.useRef(null);

    useEffect(() => {
        axios.get('http://crmatina.nebconnection.com/api/v1/tomador', getConfig())
            .then(res => setGetTomador(res.data))

        console.log(nombreFilter)
    }, [ ])


    return (
        <>
        <div className='table-register-filter'>
            <h3>Filtros</h3>
            <div className='table-register-filter-items'>
                <p>Contactos: </p>
                <select value={numberFilter} name="" id="" onChange={FilterContac}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div className='table-register-filter-items'>
            <input type="text" placeholder='Nombre' value={nombreFilter}  onChange={NombreFilter} />
            </div>
        </div>
        <div className='table-register'>
            {/* {
                getTomador &&
                <HotTable
                    ref={hotTableComponent}
                    data={result}
                    language={esMX.languageCode}
                    licenseKey="non-commercial-and-evaluation"
                    colHeaders={true}
                    rowHeaders={true}
                    columnSorting={true}
                    mergeCells={true}
                    contextMenu={true}
                    // filters={true}
                    filters={["begins_with", "between", "by_value", "contains", "empty", "ends_with", "eq", "gt", "gte", "lt", "lte", "none",
                        "not_between", "not_contains", "not_empty", "neq"]}
                    dropdownMenu={true}

                >
                    <HotColumn data="firstname" title='Nombre' onClick={() => navigate(`/tomadordetails/${gett.id}`)} readOnly={true}/>
                    <HotColumn data="lastname" title='Apellido' readOnly={true}/>
                    <HotColumn data="ci" title='CI' readOnly={true}/>
                    <HotColumn data="email" title='Correo' readOnly={true}/>
                    <HotColumn data="phone1" title='Telefono 1' readOnly={true}/>
                    <HotColumn data="phone2" title='Telefono 2' readOnly={true}/>
                    <HotColumn data="phone3" title='Telefono 3' readOnly={true}/>
                    <HotColumn data="address1" title='Direccion 1' readOnly={true}/>
                    <HotColumn data="address2" title='Direccion 2' readOnly={true}/>
                    <HotColumn data="fNacimiento" title='Fecha Nacimiento' readOnly={true}/>
                    <HotColumn data="patologia" title='Patologia' readOnly={true}/>
                    <HotColumn data="medicamentos" title='Medicamentos' readOnly={true}/>




                </HotTable>
            } */}
            <Table striped bordered hover>
                <thead className='color-table'>
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
                        result?.map(gett => (
                            <tr key={gett.id}>
                                <th onClick={() => navigate(`/tomadordetails/${gett.id}`)}>{gett.firstname}</th>
                                <th>{gett.lastname}</th>
                                <th>{gett.ci}</th>
                                <th>{gett.email}</th>
                                <th>{new Date(gett?.fechatime).toLocaleString('es-VE', { timeZone: 'UTC' })}</th>
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