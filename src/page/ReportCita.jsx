import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HotColumn, HotTable } from '@handsontable/react';
import "handsontable/dist/handsontable.full.css";
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, esMX } from 'handsontable/i18n'

const ReportCita = () => {

    const [getTomador, setGetTomador] = useState([]);

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/cita')
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
                    <HotColumn data="codigo" title='Codigo' />
                    <HotColumn data="fecha" title='Fecha' />
                    <HotColumn data="tipo" title='Tipo' />
                    <HotColumn data="plan" title='Plan' />
                    <HotColumn data="asegurados" title='Asegurados' />
                    <HotColumn data="fPago" title='Fecha Pago' />
                    <HotColumn data="efectivo" title='Efectivo' />
                    <HotColumn data="tiempo" title='Tiempo' />
                    <HotColumn data="fCliente" title='Fecha Cliente' />
                    <HotColumn data="fDevolucion" title='Fecha Devolucion' />
                    <HotColumn data="poliza" title='Poliza' />
                    <HotColumn data="statusSuscripcion" title='Status Suscripcion' />
                    <HotColumn data="tomador.firstname" title='Nombre' />
                    <HotColumn data="tomador.lastname" title='Apellido' />
                    <HotColumn data="tomador.ci" title='CI' />
                    <HotColumn data="Users.firstname" title='Usuario' />




                </HotTable>
            }
            </div>
        </div>
    );
};

export default ReportCita;