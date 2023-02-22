import React, { useEffect, useMemo, useState } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Box, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import axios from 'axios';
import getConfig from '../utils/getConfig';

const columnHelper = createColumnHelper();
const columns = [
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
    columnHelper.accessor(({ codigo }) => codigo, {
        id: "codigo",
        header: "Codigo",
    }),
    columnHelper.accessor(({ tipo }) => tipo, {
        id: "tipo",
        header: "Tipo",
    }),
    columnHelper.accessor(({ plan }) => plan, {
        id: "plan",
        header: "Plan",
    }),
    columnHelper.accessor(({ asegurados }) => asegurados, {
        id: "asegurados",
        header: "Asegurados",
    }),
    columnHelper.accessor(({ enviaCotiza }) => enviaCotiza, {
        id: "enviaCotiza",
        header: "Envio Cotazacion",
    }),
    columnHelper.accessor(({ primaAnual }) => primaAnual, {
        id: "primaAnual",
        header: "Prima Anual",
    }),
    columnHelper.accessor(({ createdAt }) => new Date(createdAt).toLocaleString('es-VE', { timeZone: 'UTC' }), {
        id: "createdAt",
        header: "Fecha de creacion",
    }),
    columnHelper.accessor(({ Users }) => Users.firstname, {
        id: "firstnameU",
        header: "Nombre Usuario",
    }),
    columnHelper.accessor(({ Users }) => Users.lastname, {
        id: "lastnameU",
        header: "Apellido Usuario",
    }),
]


const Testing = () => {

    const [data, setData] = useState([]);
    const defaultData = useMemo(() => [], [])

    useEffect(() => {
        // const loadData = async () => {
        //     const { data } = await 
        axios.get('http://crmatina.nebconnection.com/api/v1/cita', getConfig())
            .then(res => setData(res.data));
    }, []);

    console.log(data)



    // const ddddd = getTomador.filter(e => e.plan === "Premium - 100.000$");
    const table = useReactTable({
        data: data ?? defaultData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            <Box >
                <Paper >
                    <TableContainer >
                        <Table >
                            <TableHead>
                                {
                                    table.getHeaderGroups().map(headerGroup => (
                                        <TableRow key={headerGroup.id} >
                                            {
                                                headerGroup.headers.map(header => (
                                                    <tableCell key={header.id} >
                                                        {header.isPlaceholder ? null :
                                                            flexRender(header.column.columnDef.header,
                                                                header.getContext())
                                                        }
                                                    </tableCell>

                                                ))
                                            }
                                        </TableRow>
                                    ))
                                }
                            </TableHead>
                            <TableBody  >
                                {
                                    table.getRowModel().rows.map(row => (
                                        <TableRow key={row.id}>
                                            {
                                                row.getVisibleCells().map(cell => (
                                                    <TableCell key={cell.id} >
                                                        {
                                                            flexRender(cell.column.columnDef.cell,
                                                                cell.getContext())
                                                        }
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </div>
    );
};

export default Testing;