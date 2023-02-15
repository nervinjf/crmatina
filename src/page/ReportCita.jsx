
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
        header: 'Cita',
        columns: [
            columnHelper.accessor(({ enviaCotiza }) => enviaCotiza, {
                id: "enviaCotiza",
                header: "Envio Cotazacion",
            }),
            columnHelper.accessor(({ statusSuscripcion }) => statusSuscripcion, {
                id: "statusSuscripcion",
                header: "Estatus",
            }),
            columnHelper.accessor(({ fecha }) => new Date(fecha).toLocaleString('es-VE', { timeZone: 'UTC' }), {
                id: "fecha",
                header: "Fecha de cita",
            }),
            columnHelper.accessor(({ modoCita }) => modoCita, {
                id: "modoCita",
                header: "Modo de Cita",
            }),
            columnHelper.accessor(({ primaAnual }) => primaAnual, {
                id: "primaAnual",
                header: "Prima Anual",
            }),
            columnHelper.accessor(({ poliza }) => poliza, {
                id: "poliza",
                header: "Poliza",
            }),
            columnHelper.accessor(({ createdAt }) => new Date(createdAt).toLocaleString('es-VE', { timeZone: 'UTC' }), {
                id: "createdAt",
                header: "Fecha de creacion",
            }),
        ]
    }),
    columnHelper.group({
        header: 'Usuario',
        columns: [
            columnHelper.accessor(({ Users }) => Users.firstname, {
                id: "firstnameU",
                header: "Nombre",
            }),
            columnHelper.accessor(({ Users }) => Users.lastname, {
                id: "lastnameU",
                header: "Apellido",
            }),
        ]
    })
    
]

const ReportCita = () => {

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
            // setData(data.filter)
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
            setDataFilter(dataFilter.filter((e => e.createdAt === getFilterFHoy)))
        }

    }, [test])

    setTimeout(() => {
        setTest(test != true ? true : false);
    }, "1800")

    

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/cita', getConfig())
            .then(res => setData(res.data.filter(fecha => fecha.fecha > '01/01/2000')));
    }, []);

    const date = new Date()

    const MESES = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
      ];

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
                        <label htmlFor="filter">Citas de hoy:</label>
                        <input type="checkbox" onChange={(e) => setGetFilterFHoy(e.target.checked)} />
                    </div>
                </div>
                <DownloadTableExcel
                    filename={'Reporte Cita' + " " +dateNow}
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

export default ReportCita;