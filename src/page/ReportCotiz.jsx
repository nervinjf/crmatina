import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HotColumn, HotTable } from '@handsontable/react';
import "handsontable/dist/handsontable.full.css";
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, esMX } from 'handsontable/i18n'

const ReportCotiz = () => {

    const [getTomador, setGetTomador] = useState([]);
    const [test, setTest] = useState(true)
    const [test2, setTest2] = useState(true)
    const [test3, setTest3] = useState(true)
    const [test4, setTest4] = useState(true)
    const [test5, setTest5] = useState(true)
    const [getFilterTipo, setGetFilterTipo] = useState("");
    const [getFilterPlan, setGetFilterPlan] = useState("");
    const [getFilterFD, setGetFilterFD] = useState("")
    const [getFilterFH, setGetFilterFH] = useState("")
    const [getFilterCita, setGetFilterCita] = useState(false)
    const [ dataFilter, setDataFilter] = useState([]);



    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/cita')
            .then(res => setGetTomador(res.data))
        // setGetFilterPlan2(getTomador.filter(e => e.plan === getFilterPlan).filter(e => e.tipo === getFilterTipo))
        // const filteredPrice = getTomador.filter(fecha => fecha.createdAt >= getFilterFD && fecha.createdAt <= getFilterFH)
        // setGetFilterFechaALL(getTomador.filter(e => e.plan === getFilterPlan).filter(e => e.tipo === getFilterTipo).filter(fecha => fecha.createdAt >= getFilterFD && fecha.createdAt <= getFilterFH))
        // setGetFilterCitaALL(getTomador.filter(e => e.plan === getFilterPlan).filter(e => e.tipo === getFilterTipo).filter(fecha => fecha.createdAt >= getFilterFD && fecha.createdAt <= getFilterFH).filter(e => e.fecha ))
        // setGetFilterCitaSnPlan(getTomador.filter(e => e.tipo === getFilterTipo).filter(fecha => fecha.createdAt >= getFilterFD && fecha.createdAt <= getFilterFH).filter(e => e.fecha ))
        // setGetFilterC(getTomador.filter(e => e.fecha))

        // setGetFilterFecha(filteredPrice)
      
        // console.log(getFilterCitaALL)


    // setGetFilterP(

        if(getTomador !== ""){
            setDataFilter(getTomador)
        }
        // if (getFilterTipo !== "") {
        //     setDataFilter(dataFilter.filter(e => e.tipo === getFilterTipo))
        // }
        
        // if (getFilterPlan !== ""){
        //     setDataFilter(dataFilter.filter(e => e.plan === getFilterPlan))
        // }
        
        // if (getFilterFH !== ""){
        //     setDataFilter(dataFilter.filter(fecha => fecha.createdAt >= getFilterFD && fecha.createdAt <= getFilterFH))
        // }

        // if (getFilterCita === true){
        //     setDataFilter(dataFilter.filter((e => e.fecha)))
        // }

        // dataFilter === getTomador ? getTomador : setDataFilter(getFilterT)
        
        console.log(dataFilter)
    }, [test])

    useEffect(() => {
        
        if (getFilterTipo !== "") {
            setDataFilter(dataFilter.filter(e => e.tipo === getFilterTipo))
        }

    }, [test2, test3])

    useEffect(() => {
        
        if (getFilterPlan !== ""){
            setDataFilter(dataFilter.filter(e => e.plan === getFilterPlan))
        }

    }, [test3])

    useEffect(() => {
        
        if (getFilterFH !== ""){
            setDataFilter(dataFilter.filter(fecha => fecha.createdAt >= getFilterFD && fecha.createdAt <= getFilterFH))
        }

    }, [test4])

    useEffect(() => {
        
        if (getFilterCita === true){
            setDataFilter(dataFilter.filter((e => e.fecha)))
        }

    }, [test5])

    setTimeout(() => {
        setTest(test != true ? true : false);
    }, "1500")

    setTimeout(() => {
        setTest2(test != true ? true : false);
    }, "1500")

    setTimeout(() => {
        setTest3(test != true ? true : false);
    }, "1500")

    setTimeout(() => {
        setTest4(test != true ? true : false);
    }, "1500")

    setTimeout(() => {
        setTest5(test != true ? true : false);
    }, "1500")

    



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
                    <div className='container-report-table-filter'>
                            <label htmlFor="filter">Cita:</label>
                            <input type="checkbox" onChange={(e) => setGetFilterCita(e.target.checked)} />
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
                            // getFilterTipo !== "" && getFilterPlan !== "" && getFilterFD !== "" && getFilterFH !== "" && getFilterCita === true ? getFilterCitaALL :
                            // getFilterTipo !== "" && getFilterFD !== "" && getFilterFH !== "" && getFilterCita === true ? getFilterCitaSnPlan :
                            // getFilterTipo !== "" && getFilterPlan !== "" && getFilterFD !== "" && getFilterFH !== "" ? getFilterFechaALL :
                            //     getFilterTipo !== "" && getFilterPlan !== "" ? getFilterPlan2 :
                            //         getFilterFD !== "" && getFilterFH !== "" ? getFilterFecha :
                            //             getFilterTipo !== "" ? getFilterT :
                            //             getFilterCita === true ? getFilterC :
                            //             getFilterPlan !== "" ? getFilterP : getTomador
                            // getTomador !== "" ? getTomador : 
                            dataFilter === getTomador ? getTomador : dataFilter
                            
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
            <div className='count-length-datos'>
                <h5>Count:</h5>
                <p>{dataFilter === getTomador ? getTomador.length : dataFilter.length}</p>
            </div>
        </div>
    );
};

export default ReportCotiz;