
import React from 'react';
import { useState, useMemo } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import getConfig from '../utils/getConfig';
import Table from 'react-bootstrap/Table';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useRef } from 'react';

const columnHelper = createColumnHelper();
const columns = [
    columnHelper.group({
        header: "Tomador",
        columns: [
            columnHelper.accessor(({ tomador }) => tomador.firstname, {
                id: "firstname",
                header: "Nombre",
            }),
            columnHelper.accessor(({ tomador }) => tomador.lastname, {
                id: "lastname",
                header: "Apellido",
            }),
            columnHelper.accessor(({ tomador }) => tomador.ci, {
                id: "ci",
                header: "CI",
            }),
            columnHelper.accessor(({ tomador }) => tomador.email, {
                id: "email",
                header: "email",
            }),
        ]
    }),
    columnHelper.group({
        header: 'Contacto',
        columns: [
            columnHelper.accessor(({ origen }) => origen, {
                id: "origen",
                header: "Origen",
            }),
            columnHelper.accessor(({ fuente }) => fuente, {
                id: "fuente",
                header: "Fuente",
            }),
            columnHelper.accessor(({ proposito }) => proposito, {
                id: "proposito",
                header: "Proposito",
            }),
            columnHelper.accessor(({ motivo1 }) => motivo1, {
                id: "motivo1",
                header: "Motivo1",
            }),
            columnHelper.accessor(({ motivo2 }) => motivo2, {
                id: "motivo2",
                header: "Motivo2",
            }),
            columnHelper.accessor(({ motivo3 }) => motivo3, {
                id: "motivo3",
                header: "Motivo3",
            }),
            columnHelper.accessor(({ observacion }) => observacion, {
                id: "observacion",
                header: "Observacion",
            }),
            columnHelper.accessor(({ createdAt }) => new Date(createdAt).toLocaleString('es-VE', { timeZone: 'UTC' }), {
                id: "createdAt",
                header: "Fecha de creacion",
            }),
        ]
    }),
    // columnHelper.group({
    //     header: 'Usuario',
    //     columns: [
    //         columnHelper.accessor(({ Users }) => Users.firstname, {
    //             id: "firstnameU",
    //             header: "Nombre",
    //         }),
    //         columnHelper.accessor(({ Users }) => Users.lastname, {
    //             id: "lastnameU",
    //             header: "Apellido",
    //         }),
    //     ]
    // })
    
]
const ReportContact = () => {
    const [getTomador, setGetTomador] = useState([]);
    const [test, setTest] = useState(true)
    const [getFilterStatus, setGetFilterStatus] = useState("");
    const [getFilterPlan, setGetFilterPlan] = useState("");
    const [getFilterFD, setGetFilterFD] = useState("")
    const [getFilterFH, setGetFilterFH] = useState("")
    const [getFilterCedula, setGetFilterCedula] = useState("")
    const [getFilterFHoy, setGetFilterFHoy] = useState(false)
    const [getFilterCotizacion, setGetFilterCotizacion] = useState(false)
    const [dataFilter, setDataFilter] = useState([]);

    const [data, setData] = useState([]);
    const defaultData = useMemo(() => [], [])

    console.log(data)

    useEffect(() => {

        if (data !== "") {
            setDataFilter(data)
        }

    }, [test])

    useEffect(() => {

        if (getFilterFH) {
            setDataFilter(dataFilter.filter(fecha => fecha.createdAt >= getFilterFD && fecha.createdAt <= getFilterFH))
        }

    }, [test])

    useEffect(() => {

        if (getFilterFHoy) {
            setDataFilter(dataFilter.filter((e => e.createdAt >= dateHoy)))
        }

    }, [test])

    setTimeout(() => {
        setTest(test != true ? true : false);
    }, "1800")

    

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/contacto', getConfig())
            .then(res => setData(res.data));
    }, []);

    const date = new Date()

    const MESES = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
      ];

      const MESESN = [
        "01", "02", "03", "04", "05", "06", "07",
        "08", "09", "10", "11", "12",
      ];
    
    const dateHoy =  date.getFullYear() + '-' + MESESN[date.getMonth()] + '-' + date.getDate();

    const dateNow = date.getDate() + '-' + MESES[date.getMonth()] + '-' + date.getFullYear();

    const table = useReactTable({
        data: dataFilter === data ? data : dataFilter,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const tableRef = useRef(null);

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
                        <label htmlFor="filter">Cotizaciones de hoy:</label>
                        <input type="checkbox" onChange={(e) => setGetFilterFHoy(e.target.checked)} />
                    </div>
                </div>
                <DownloadTableExcel
                    filename={'Reporte Contactos' + " " +dateNow}
                    sheet="Citas"
                    currentTableRef={tableRef.current}
                >

                   <button><i class="fa-solid fa-cloud-arrow-down"></i></button>

                </DownloadTableExcel>
            </div>
            <div className='container-report-table-t'>
                <Table striped bordered hover ref={tableRef}>
                    <thead>
                        {
                            table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} align='center'>
                                    {
                                        headerGroup.headers.map(header => (
                                            <th align="center" key={header.id} colSpan={header.colSpan}>
                                                {header.isPlaceholder ? null :
                                                    flexRender(header.column.columnDef.header,
                                                        header.getContext())
                                                }
                                            </th>

                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody  >
                        {
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <td key={cell.id} align="center">
                                                {
                                                    flexRender(cell.column.columnDef.cell,
                                                        cell.getContext())
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </Table >
            </div >
    <div className='count-length-datos'>
        <h5>Count:</h5>
        <p>{dataFilter === data ? data?.length : dataFilter?.length}</p>
    </div>
        </div >
    );
};

export default ReportContact;