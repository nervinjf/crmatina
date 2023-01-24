import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HotColumn, HotTable } from '@handsontable/react';
import "handsontable/dist/handsontable.full.css";
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, esMX } from 'handsontable/i18n'


const ReportTomador = () => {

    const [getTomador, setGetTomador] = useState([]);

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/tomador')
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
                    // mergeCells={true}
                    // contextMenu={true}
                    // filters={true}
                    filters={["begins_with", "between", "by_value", "contains", "empty", "ends_with", "eq", "gt", "gte", "lt", "lte", "none",
                        "not_between", "not_contains", "not_empty", "neq"]}
                    dropdownMenu={true}

                >
                    <HotColumn data="id" title='id' readOnly={true}/>
                    <HotColumn data="firstname" title='Nombre' readOnly={true}/>
                    <HotColumn data="lastname" title='Apellido' readOnly={true}/>
                    <HotColumn data="ci" title='Cedula' readOnly={true}/>
                    <HotColumn data="email" title='Correo' readOnly={true}/>
                    <HotColumn data="phone1" title='Telefono' readOnly={true}/>
                    <HotColumn data="phone2" title='Telefono 2' readOnly={true}/>
                    <HotColumn data="phone3" title='Telefono 3' readOnly={true}/>
                    <HotColumn data="address1" title='Direccion' readOnly={true}/>
                    <HotColumn data="address1" title='Direccion 2' readOnly={true}/>
                    <HotColumn data="fNacimiento" title='Fecha Nacimiento' readOnly={true}/>
                    <HotColumn data="patologia" title='Patologia' readOnly={true}/>
                    <HotColumn data="medicamentos" title='Medicamentos' readOnly={true}/>




                </HotTable>
            }
            </div>
        </div>
    );
};

export default ReportTomador;