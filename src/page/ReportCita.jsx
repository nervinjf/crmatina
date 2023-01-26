// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { HotColumn, HotTable } from '@handsontable/react';
// import "handsontable/dist/handsontable.full.css";
// import { registerAllModules } from 'handsontable/registry';
// import { registerLanguageDictionary, esMX } from 'handsontable/i18n'
import React from 'react';
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import getConfig from '../utils/getConfig';


const ReportCita = () => {

    const [getTomador, setGetTomador] = useState([]);
    const [test, setTest] = useState(true)
    const [getFilterStatus, setGetFilterStatus] = useState("");
    const [getFilterPlan, setGetFilterPlan] = useState("");
    const [getFilterFD, setGetFilterFD] = useState("")
    const [getFilterFH, setGetFilterFH] = useState("")
    const [getFilterCedula, setGetFilterCedula] = useState("")
    const [getFilterCita, setGetFilterCita] = useState(false)
    const [getFilterCotizacion, setGetFilterCotizacion] = useState(false)
    const [ dataFilter, setDataFilter] = useState([]);

    const PlotlyRenderers = createPlotlyRenderers(Plot);
    const [state, setState] = useState([]);


    useEffect(() => {
        
        if(getTomador !== ""){
            setDataFilter(getTomador)
        }

    }, [test])

    console.log(dataFilter)

    useEffect(() => {
        
        if (getFilterCedula !== "") {
            setDataFilter(dataFilter?.filter(e => Number(e.tomador.ci) === Number(getFilterCedula)))
        }

    }, [test])

    useEffect(() => {
        
        if (getFilterStatus) {
            setDataFilter(dataFilter.filter(e => e.statusSuscripcion === getFilterStatus))
        }

    }, [test])

    useEffect(() => {
        
        if (getFilterPlan){
            setDataFilter(dataFilter.filter(e => e.plan === getFilterPlan))
        }

    }, [test])

    useEffect(() => {
        
        if (getFilterFH){
            setDataFilter(dataFilter.filter(fecha => fecha.createdAt >= getFilterFD && fecha.createdAt <= getFilterFH))
        }

    }, [test])

    useEffect(() => {
        
        if (getFilterCita){
            setDataFilter(dataFilter.filter((e => e.fecha)))
        }

    }, [test])

    useEffect(() => {
        
        if (getFilterCotizacion){
            setDataFilter(dataFilter.filter((e => e.enviaCotiza)))
        }

    }, [test])

    setTimeout(() => {
        setTest(test != true ? true : false);
    }, "1800")
    




    // registerAllModules();
    // registerLanguageDictionary(esMX)

    // const hotTableComponent = React.useRef(null);

    const descargarArchivo = () => {
        const pluginDescarga = hotTableComponent.current.hotInstance.getPlugin("exportFile");

        pluginDescarga.downloadFile("csv", {
            filename: "Report",
            fileExtension: "csv",
            MimeType: "text/csv",
            columnHeaders: true,
        })
    }

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/cita', getConfig())
            .then(res => setGetTomador(res.data))
        // setGetFilterPlan2(getTomador.filter(e => e.plan === getFilterPlan).filter(e => e.tipo === getFilterTipo))
        // const filteredPrice = getTomador.filter(fecha => fecha.createdAt >= getFilterFD && fecha.createdAt <= getFilterFH)
        // setGetFilterFechaALL(getTomador.filter(e => e.plan === getFilterPlan).filter(e => e.tipo === getFilterTipo).filter(fecha => fecha.createdAt >= getFilterFD && fecha.createdAt <= getFilterFH))
        // setGetFilterCitaALL(getTomador.filter(e => e.plan === getFilterPlan).filter(e => e.tipo === getFilterTipo).filter(fecha => fecha.createdAt >= getFilterFD && fecha.createdAt <= getFilterFH).filter(e => e.fecha ))
        // setGetFilterCitaSnPlan(getTomador.filter(e => e.tipo === getFilterTipo).filter(fecha => fecha.createdAt >= getFilterFD && fecha.createdAt <= getFilterFH).filter(e => e.fecha ))
        // setGetFilterC(getTomador.filter(e => e.fecha))

        // setGetFilterFecha(filteredPrice)
      
        // console.log(getFilterCitaALL)

    }, [])


    return (
        <div className='container-report-table'>
            <div className='container-report-table-button'>
                <div className='container-report-table-button-filter'>
                    <div className='container-report-table-filter'>
                        <label htmlFor="filter">Status: </label>
                        <select name="" id="" onChange={(e) => setGetFilterStatus(e.target.value)}>
                            <option value="">--Seleccione tipo de Poliza--</option>
                            <option value="Proceso">Proceso</option>
                            <option value="Concluido">Concluido</option>
                        </select>
                    </div>
                    <div className='container-report-table-filter'>
                        <label htmlFor="filter">Plan: </label>
                        <select name="" id="" onChange={(e) => setGetFilterPlan(e.target.value)}>
                            <option value="">--Seleccione tipo de Poliza--</option>
                            <option value="Premium - 50.000$">Premium - 50.000$</option>
                            <option value="Elite - 200.000$">Elite - 200.000$</option>
                        </select>
                    </div>
                    <div className='container-report-table-filter-f'>
                        <div className='gapp'>
                            <label htmlFor="filter">De: </label>
                            <input type="date" onChange={(e) => setGetFilterFD(e.target.value)} />
                        </div>
                        <div className='gapp'>
                            <label htmlFor="filter">Hasta: </label>
                            <input type="date" onChange={(e) => setGetFilterFH(e.target.value)} />
                        </div>
                    </div>
                    <div className='container-report-table-filter'>
                            <label htmlFor="filter">Cita:</label>
                            <input type="checkbox" onChange={(e) => setGetFilterCita(e.target.checked)} />
                    </div>
                    <div className='container-report-table-filter'>
                            <label htmlFor="filter">Cotizacion:</label>
                            <input type="checkbox" onChange={(e) => setGetFilterCotizacion(e.target.checked)} />
                    </div>
                    <div className='container-report-table-filter acomodar'>
                            <label htmlFor="filter">Cedula:</label>
                            <input type="text" value={getFilterCedula} onChange={(e) => setGetFilterCedula(e.target.value)} />
                    </div>
                </div>
                <i class="fa-solid fa-cloud-arrow-down" onClick={() => descargarArchivo()}><button></button></i>
            </div>
            <div className='container-report-table-t'>
            <PivotTableUI
                data={dataFilter === getTomador ? getTomador : dataFilter}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                onChange={(s) => {
                    setState(s);
                }}
                {...state}
            />
            {/* {
                getTomador &&
                <HotTable
                    ref={hotTableComponent}
                    data={dataFilter === getTomador ? getTomador : dataFilter}
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
                    <HotColumn data="tomador.firstname" title='Nombre' readOnly={true}/>
                    <HotColumn data="tomador.lastname" title='Apellido' readOnly={true}/>
                    <HotColumn data="tomador.ci" title='CI' readOnly={true}/>
                    <HotColumn data="fecha" title='Fecha Cita' readOnly={true}/>
                    <HotColumn data="statusSuscripcion" title='Status Suscripcion' readOnly={true}/>
                    <HotColumn data="modoCita" title='Modalidad Cita' readOnly={true}/>
                    <HotColumn data="citaAcomp" title='Acompañantes' readOnly={true}/>
                    <HotColumn data="enviaCotiza" title='Envio Cotizacion' readOnly={true}/>
                    <HotColumn data="fCliente" title='Fecha envio planilla' readOnly={true}/>
                    <HotColumn data="fDevolucion" title='Fecha devolucion planilla' readOnly={true}/>
                    <HotColumn data="poliza" title='Monto Poliza' readOnly={true}/>
                    <HotColumn data="Users.firstname" title='Usuario' readOnly={true}/>




                </HotTable>
            } */}
            </div>
            <div className='count-length-datos'>
                <h5>Count:</h5>
                <p>{dataFilter === getTomador ? getTomador?.length : dataFilter?.length}</p>
            </div>
        </div>
    );
};

export default ReportCita;