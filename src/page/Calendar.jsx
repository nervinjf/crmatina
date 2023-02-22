import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HotColumn, HotTable } from '@handsontable/react';
import "handsontable/dist/handsontable.full.css";
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, esMX } from 'handsontable/i18n';
import ReportContact from './ReportContact';
import ReportCita from './ReportCita';
import ReportTomador from './ReportTomador';
import ReportCotiz from './ReportCotiz';

const Calendar = () => {

  const [ buttonR, setButtonR ] = useState("cita");

  // const [getTomador, setGetTomador] = useState([]);

  // useEffect(() => {
  //   axios.get('http://crmatina.nebconnection.com/api/v1/contacto')
  //     .then(res => setGetTomador(res.data))
  // }, [])



  // registerAllModules();
  // registerLanguageDictionary(esMX)

  // const hotTableComponent = React.useRef(null);

  // const descargarArchivo = () =>{
  //   const pluginDescarga = hotTableComponent.current.hotInstance.getPlugin("exportFile");

  //   pluginDescarga.downloadFile("csv", { 
  //     filename: "Report",
  //     fileExtension: "csv",
  //     MimeType: "text/csv",
  //     columnHeaders: true,
  //    })
  // }


  return (
    <div className='Container-report'>
      <div className='Container-report-select'>
        <button onClick={() => setButtonR("cita")}>Cita</button>
        <button onClick={() => setButtonR("cotiza")}>Cotizacion</button>
        <button onClick={() => setButtonR("contact")}>Contacto</button>
      </div>
      <div>
        {
           buttonR === "cita" ? <ReportCita /> : 
           buttonR === "cotiza" ? <ReportCotiz /> :  
           buttonR === "contact" ? <ReportContact /> : ""           
        }
      </div>
    </div>

    // {/* {
    //   getTomador && 
    //   <HotTable
    //     ref={hotTableComponent}
    //     data={getTomador}
    //     language={esMX.languageCode}
    //     licenseKey="non-commercial-and-evaluation"
    //     colHeaders={true}
    //     rowHeaders={true}
    //     columnSorting={true}
    //     mergeCells={true}
    //     contextMenu={true}
    //     // filters={true}
    //     filters={["begins_with", "between", "by_value", "contains", "empty", "ends_with", "eq", "gt", "gte", "lt", "lte", "none", 
    //     "not_between", "not_contains", "not_empty", "neq"]}
    //     dropdownMenu={true}

    //   >
    //     <HotColumn data="origen" title='Origen'/>
    //     <HotColumn data="fuente" title='Fuente'/>
    //     <HotColumn data="proposito" title='proposito'/>
    //     <HotColumn data="estatus" title='estatus'/>
    //     <HotColumn data="motivo1" title='motivo1'/>
    //     <HotColumn data="motivo2" title='motivo2'/>
    //     <HotColumn data="motivo3" title='motivo3'/>
    //     <HotColumn data="observacion" title='observacion'/>
    //     <HotColumn data="tomador.firstname" title='Nombre'/>
    //     <HotColumn data="tomador.lastname" title='Apellido'/>
    //     <HotColumn data="tomador.ci" title='CI'/>




    //   </HotTable>
    // } */}
  );
};

export default Calendar;