import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HotColumn, HotTable } from '@handsontable/react';
import "handsontable/dist/handsontable.full.css";
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, esMX } from 'handsontable/i18n';

const Calendar = () => {

  const [getTomador, setGetTomador] = useState([]);

  useEffect(() => {
    axios.get('https://atina-neb-production.up.railway.app/api/v1/contacto')
      .then(res => setGetTomador(res.data))
  }, [])

  

  registerAllModules();
  registerLanguageDictionary(esMX)

  const hotTableComponent = React.useRef(null);

  const descargarArchivo = () =>{
    const pluginDescarga = hotTableComponent.current.hotInstance.getPlugin("exportFile");

    pluginDescarga.downloadFile("csv", { 
      filename: "Report",
      fileExtension: "csv",
      MimeType: "text/csv",
      columnHeaders: true,
     })
  }


  return (
    <>
      <h1>Hola Gente</h1>
      <button onClick={() => descargarArchivo()}>Descargar Archivo</button>
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
          filters={true}
          dropdownMenu={true}
        >
          <HotColumn data="origen" title='Origen'/>
          <HotColumn data="fuente" title='Fuente'/>
          <HotColumn data="proposito" title='proposito'/>
          <HotColumn data="estatus" title='estatus'/>
          <HotColumn data="motivo1" title='motivo1'/>
          <HotColumn data="motivo2" title='motivo2'/>
          <HotColumn data="motivo3" title='motivo3'/>
          <HotColumn data="observacion" title='observacion'/>
          <HotColumn data="tomador.firstname" title='Nombre'/>
          <HotColumn data="tomador.lastname" title='Apellido'/>
          <HotColumn data="tomador.ci" title='CI'/>




        </HotTable>
      }
    </>
  );
};

export default Calendar;