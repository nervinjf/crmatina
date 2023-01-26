import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HotColumn, HotTable } from '@handsontable/react';
import "handsontable/dist/handsontable.full.css";
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, esMX } from 'handsontable/i18n';
import getConfig from '../utils/getConfig';


const ReportContact = () => {

    const [getTomador, setGetTomador] = useState([]);

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/contacto', getConfig())
            .then(res => setGetTomador(res.data))
    }, [])



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
            <i class="fa-solid fa-cloud-arrow-down" onClick={() => descargarArchivo()}><button></button></i> 
            </div>
            <div className='container-report-table-t'>
            {
                getTomador &&
                <HotTable
                    ref={hotTableComponent}
                    data={getTomador}
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
        </div>
    );
};

export default ReportContact;