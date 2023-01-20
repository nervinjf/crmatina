import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HotColumn, HotTable } from '@handsontable/react';
import "handsontable/dist/handsontable.full.css";
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, esMX } from 'handsontable/i18n'

const ReportCotiz = () => {

    const [getTomador, setGetTomador] = useState([]);
    const [getFilterT, setGetFilterT] = useState([]);
    const [getFilterP, setGetFilterP] = useState([]);
    const [test, setTest] = useState(true)
    const [getFilterTipo, setGetFilterTipo] = useState("");
    const [getFilterPlan, setGetFilterPlan] = useState("");
    const [getFilterPlan2, setGetFilterPlan2] = useState([]);
    const [getFilterFD, setGetFilterFD] = useState("")
    const [getFilterFH, setGetFilterFH] = useState("")
    const [getFilterFecha, setGetFilterFecha] = useState([])
    const [getFilterFechaALL, setGetFilterFechaALL] = useState([])


    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/cita')
            .then(res => setGetTomador(res.data))

        setGetFilterT(getTomador.filter(e => e.tipo === getFilterTipo))
        setGetFilterP(getTomador.filter(e => e.plan === getFilterPlan))
        setGetFilterPlan2(getTomador.filter(e => e.plan === getFilterPlan).filter(e => e.tipo === getFilterTipo))
        const filteredPrice = getTomador.filter(fecha => fecha.createdAt > getFilterFD && fecha.createdAt < getFilterFH)
        setGetFilterFechaALL(getTomador.filter(e => e.plan === getFilterPlan).filter(e => e.tipo === getFilterTipo).filter(fecha => fecha.createdAt > getFilterFD && fecha.createdAt < getFilterFH))

        setGetFilterFecha(filteredPrice)
        console.log(getFilterFecha)

    }, [test])

    setInterval(() => {
        setTest(test != true ? true : false);
    }, "2000")



    registerAllModules();
    registerLanguageDictionary(esMX)

    const hotTableComponent = React.useRef(null);

    const descargarArchivo = () => {
        const pluginDescarga = hotTableComponent.current.hotInstance.getPlugin("exportFile");

        pluginDescarga.downloadFile("csv", {
            filename: "Report",
            fileExtension: "csv",
            MimeType: "text/csv",
            columnHeaders: true,
        })
    }






    return (
        <div className='container-report-table'>
            <div className='container-report-table-button'>
                <div className='container-report-table-button-filter'>
                    <div className='container-report-table-filter'>
                        <label htmlFor="filter">Tipo: </label>
                        <select name="" id="" onChange={(e) => setGetFilterTipo(e.target.value)}>
                            <option value="">--Seleccione tipo de Poliza--</option>
                            <option value="Salud">Salud</option>
                            <option value="Mascotas">Mascotas</option>
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
                </div>
                <i class="fa-solid fa-cloud-arrow-down" onClick={() => descargarArchivo()}><button></button></i>
            </div>
            <div className='container-report-table-t'>
                {
                    getTomador &&
                    <HotTable
                        ref={hotTableComponent}
                        data={
                            getFilterTipo !== "" && getFilterPlan !== "" && getFilterFD !== "" && getFilterFH !== "" ? getFilterFechaALL :
                                getFilterTipo !== "" && getFilterPlan !== "" ? getFilterPlan2 :
                                    getFilterFD !== "" && getFilterFH !== "" ? getFilterFecha :
                                        getFilterTipo !== "" ? getFilterT :
                                            getFilterPlan !== "" ? getFilterP : getTomador
                        }
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
                        <HotColumn data="tomador.firstname" title='Nombre' readOnly={true} />
                        <HotColumn data="tomador.lastname" title='Apellido' readOnly={true} />
                        <HotColumn data="tomador.ci" title='CI' readOnly={true} />
                        <HotColumn data="codigo" title='Codigo' readOnly={true} />
                        <HotColumn data="tipo" title='Tipo' readOnly={true} />
                        <HotColumn data="plan" title='Plan' readOnly={true} />
                        <HotColumn data="asegurados" title='Asegurados' readOnly={true} />
                        <HotColumn data="efectivo" title='Efectivo' readOnly={true} />
                        <HotColumn data="fPago" title='Forma Pago' readOnly={true} />
                        <HotColumn data="tiempo" title='Tiempo' readOnly={true} />
                        <HotColumn data="poliza" title='Poliza' readOnly={true} />
                        <HotColumn data="enviaCotiza" title='Envio Cotizacion' readOnly={true} />
                        {/* <HotColumn data="fecha" title='Fecha Cita' readOnly={true}/> */}
                        {/* <HotColumn data="fCliente" title='Fecha Cliente' readOnly={true}/>
                    <HotColumn data="fDevolucion" title='Fecha Devolucion' readOnly={true}/>
                    <HotColumn data="statusSuscripcion" title='Status Suscripcion' readOnly={true}/>
                    <HotColumn data="tomador.firstname" title='Nombre' readOnly={true}/>
                    <HotColumn data="tomador.lastname" title='Apellido' readOnly={true}/>
                    <HotColumn data="tomador.ci" title='CI' readOnly={true}/>
                    <HotColumn data="Users.firstname" title='Usuario' readOnly={true}/> */}




                    </HotTable>
                }
            </div>
        </div>
    );
};

export default ReportCotiz;