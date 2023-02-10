import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HotColumn, HotTable } from '@handsontable/react';
import "handsontable/dist/handsontable.full.css";
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, esMX } from 'handsontable/i18n';
import getConfig from '../utils/getConfig';


const ReportContact = () => {

    const [getTomador, setGetTomador] = useState([]);
    const [test, setTest] = useState(true)
    const [test4, setTest4] = useState(true)
    const [test5, setTest5] = useState(true)
    const [getFilterFD, setGetFilterFD] = useState("")
    const [getFilterFH, setGetFilterFH] = useState("")
    const [ dataFilter, setDataFilter] = useState([]);
    const [getFilterContacthoy, setGetFilterContacthoy] = useState(false)


    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/contacto', getConfig())
            .then(res => setGetTomador(res.data))

        if(getTomador !== ""){
            setDataFilter(getTomador)
        }
    }, [test])

    useEffect(() => {
        
        if (getFilterFH !== ""){
            setDataFilter(dataFilter.filter(fecha => fecha.createdAt >= getFilterFD && fecha.createdAt <= getFilterFH))
        }

    }, [test4])

    // create a new `Date` object
    let today = new Date();     

// `getDate()` returns the day of the month (from 1 to 31)
    let day = today.getDate();

// `getMonth()` returns the month (from 0 to 11)
    let month = today.getMonth() + 1;

// `getFullYear()` returns the full year
    let year = today.getFullYear(); 

    useEffect(() => {
        
        if (getFilterContacthoy === true){
            setDataFilter(dataFilter.filter((e => e.createdAt === `${year}-${month}-${day}`)))
        }

    }, [test5])

    console.log(getTomador.filter(fecha => fecha.createdAt >= "2023-02-10"))

    setTimeout(() => {
        setTest(test != true ? true : false);
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
                            <label htmlFor="filter">Contactos de hoy:</label>
                            <input type="checkbox" onChange={(e) => setGetFilterContacthoy(e.target.checked)} />
                    </div>
                </div>
                <i class="fa-solid fa-cloud-arrow-down" onClick={() => descargarArchivo()}><button></button></i>
            </div>
            <div className='container-report-table-t'>
            {
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
                    <HotColumn data="origen" title='Origen' readOnly={true}/>
                    <HotColumn data="fuente" title='Fuente' readOnly={true}/>
                    <HotColumn data="proposito" title='proposito' readOnly={true}/>
                    <HotColumn data="estatus" title='estatus' readOnly={true}/>
                    <HotColumn data="motivo1" title='motivo1' readOnly={true}/>
                    <HotColumn data="motivo2" title='motivo2' readOnly={true}/>
                    <HotColumn data="motivo3" title='motivo3' readOnly={true}/>
                    <HotColumn data="observacion" title='observacion' readOnly={true}/>
                    <HotColumn data="tomador.firstname" title='Nombre' readOnly={true}/>
                    <HotColumn data="tomador.lastname" title='Apellido' readOnly={true}/>
                    <HotColumn data="tomador.ci" title='CI' readOnly={true}/>




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

export default ReportContact;