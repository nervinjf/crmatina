import React from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getRegistros, getRegistrosThunk } from '../store/slice/getForm.slice';
import ChartContactoEfectivo from './Charts/ChartContactoEfectivo';
import ChartContacts from './Charts/ChartContacts';
import DashboardDetails from './Charts/DashboardDetails';

const Home = () => {

    const dispatch = useDispatch();
    const get = useSelector(state => state.getform)
    // ------------------------------efectiva-----------------------
    const [totalEfectiva, setTotalEfectiva] = useState();
    const [totalCita, setTotalCita] = useState();
    const [totalNinteresado, setTotalNinteresado] = useState();
    const [totalseguimiento, setTotalseguimiento] = useState();
    const [totalProspecto, setTotalProspecto] = useState();
    const [totalInformacionC, setTotalInformacionC] = useState();
    const [totalconsideracion, setTotalconsideracion] = useState();
    const [totalCorreo, setTotalCorreo] = useState();
    const [totalSMS, setTotalSMS] = useState();
    const [totalRecordatorio, setTotalRecordatorio] = useState();
    const [totalCitaRe, setTotalCitaRe] = useState();
    // ----------------------------noefectiva------------------------
    const [totalNEfectiva, setTotalNEfectiva] = useState();
    const [totalContestadora, setTotalContestadora] = useState();
    const [totalNContesta, setTotalNContesta] = useState();
    const [totalIVR, setTotalIVR] = useState();
    const [totalVLllamar, setTotalVLllamar] = useState();

    const [closee, setClosee] = useState(false);
    const [closen, setClosen] = useState(false);

    useEffect(() => {
        let numero = "hola";
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.efectiva !== "None") {
                newTotal.push(items.efectiva?.length)
            }
        });
        setTotalEfectiva(newTotal)
    }, [get])

    useEffect(() => {
        let numero = "hola";
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.noefectiva !== "None") {
                newTotal.push(items.noefectiva?.length)
            }
        });
        setTotalNEfectiva(newTotal)
    }, [get])

    useEffect(() => {
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.efectiva === "Cita Programada") {
                newTotal.push(items.efectiva?.length)
            }

        });
        setTotalCita(newTotal)
    }, [get])

    useEffect(() => {
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.efectiva === "No Interesado") {
                newTotal.push(items.efectiva?.length)
            }

        });
        setTotalNinteresado(newTotal)
    }, [get])

    useEffect(() => {
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.efectiva === "En Seguimiento") {
                newTotal.push(items.efectiva.length)
            }

        });
        setTotalseguimiento(newTotal)
    }, [get])

    useEffect(() => {
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.efectiva === "Prospecto a Futuro") {
                newTotal.push(items.efectiva.length)
            }

        });
        setTotalProspecto(newTotal)
    }, [get])

    useEffect(() => {
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.efectiva === "Informacion por correo") {
                newTotal.push(items.efectiva.length)
            }

        });
        setTotalInformacionC(newTotal)
    }, [get])

    useEffect(() => {
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.efectiva === "En consideración") {
                newTotal.push(items.efectiva.length)
            }

        });
        setTotalconsideracion(newTotal)
    }, [get])

    useEffect(() => {
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.efectiva === "Correo") {
                newTotal.push(items.efectiva.length)
            }

        });
        setTotalCorreo(newTotal)
    }, [get])

    useEffect(() => {
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.efectiva === "SMS") {
                newTotal.push(items.efectiva.length)
            }

        });
        setTotalSMS(newTotal)
    }, [get])

    useEffect(() => {
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.efectiva === "Recordatorio") {
                newTotal.push(items.efectiva.length)
            }

        });
        setTotalRecordatorio(newTotal)
    }, [get])

    useEffect(() => {
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.efectiva === "Cita re-programada") {
                newTotal.push(items.efectiva.length)
            }

        });
        setTotalCitaRe(newTotal)
    }, [get])

    useEffect(() => {
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.noefectiva === "Contestadora") {
                newTotal.push(items.noefectiva.length)
            }

        });
        setTotalContestadora(newTotal)
    }, [get])

    useEffect(() => {
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.noefectiva === "No Contesta") {
                newTotal.push(items.noefectiva.length)
            }

        });
        setTotalNContesta(newTotal)
    }, [get])

    useEffect(() => {
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.noefectiva === "IVR") {
                newTotal.push(items.noefectiva.length)
            }

        });
        setTotalIVR(newTotal)
    }, [get])

    useEffect(() => {
        let newTotal = [];
        const test = get.data?.forEach(items => {
            if (items.noefectiva === "Volver a llamar") {
                newTotal.push(items.noefectiva.length)
            }

        });
        setTotalVLllamar(newTotal)
    }, [get])

    const closeeChange = () => {
        setClosee(!closee)
    }

    const closenChange = () => {
        setClosen(!closen)
    }

    //   console.log(totalEfectiva)

    return (
        <div className='container-home'>
            <h1>Dashboard</h1>
            <br/>
            <br/>
            <br/>
            {/* <div className='container-grid'>
                <div className='register-cant'>
                    <h2>Registros:</h2>
                    <h2>{get.data?.length}</h2>
                </div>
                <div className='register-cant' onClick={closeeChange} style={{ cursor: "pointer" }}>
                    <h2>Efectivas:</h2>
                    <h2>{totalEfectiva?.length}</h2>
                </div>
                <div className='register-cant' onClick={closenChange} style={{ cursor: "pointer" }}>
                    <h2>No efectivas:</h2>
                    <h2>{totalNEfectiva?.length}</h2>
                </div>
                <div className='register-cant'>
                    <h2>Citas programadas:</h2>
                    <h2>{totalCita?.length}</h2>
                </div>

            </div> */}
            {/* <div className='container-DboardDetails' style={closee === true ? { visibility: "visible", opacity: "100%" } : { visibility: "hidden", opacity: "0%" }}>
                <div className='DboardDetails'>
                    <div className='container-cancel'>
                        <i class="fa-solid fa-xmark" onClick={closeeChange}></i>
                    </div>
                    <h2>Detalles Efectiva</h2>
                    <div className='grid-details'>
                        <div className='DboardDetails-items'>
                            <h3>Cita programada</h3>
                            <p>{totalCita?.length}</p>
                        </div>
                        <div className='DboardDetails-items'>
                            <h3>No interesado</h3>
                            <p>{totalNinteresado?.length}</p>
                        </div>
                        <div className='DboardDetails-items'>
                            <h3>En seguimiento</h3>
                            <p>{totalseguimiento?.length}</p>
                        </div>
                        <div className='DboardDetails-items'>
                            <h3>Prospecto a futuro</h3>
                            <p>{totalProspecto?.length}</p>
                        </div>
                        <div className='DboardDetails-items'>
                            <h3>Informacion por correo</h3>
                            <p>{totalInformacionC?.length}</p>
                        </div>
                        <div className='DboardDetails-items'>
                            <h3>En consideración</h3>
                            <p>{totalconsideracion?.length}</p>
                        </div>
                        <div className='DboardDetails-items'>
                            <h3>Correo</h3>
                            <p>{totalCorreo?.length}</p>
                        </div>
                        <div className='DboardDetails-items'>
                            <h3>SMS</h3>
                            <p>{totalSMS?.length}</p>
                        </div>
                        <div className='DboardDetails-items'>
                            <h3>Recordatorio</h3>
                            <p>{totalRecordatorio?.length}</p>
                        </div>
                        <div className='DboardDetails-items'>
                            <h3>Cita re-programada</h3>
                            <p>{totalCitaRe?.length}</p>
                        </div>

                    </div>
                </div>
            </div> */}
            {/* <div className='container-DboardDetails' style={closen === true ? { visibility: "visible", opacity: "100%" } : { visibility: "hidden", opacity: "0%" }}>
                <div className='DboardDetails'>
                    <div className='container-cancel'>
                        <i class="fa-solid fa-xmark" onClick={closenChange}></i>
                    </div>
                    <h2>Detalles No efectiva</h2>
                    <div className='grid-details'>
                        <div className='DboardDetails-items'>
                            <h3>Contestadora</h3>
                            <p>{totalContestadora?.length}</p>
                        </div>
                        <div className='DboardDetails-items'>
                            <h3>No contesta</h3>
                            <p>{totalNContesta?.length}</p>
                        </div>
                        <div className='DboardDetails-items'>
                            <h3>IVR</h3>
                            <p>{totalIVR?.length}</p>
                        </div>
                        <div className='DboardDetails-items'>
                            <h3>Volver a llamar</h3>
                            <p>{totalVLllamar?.length}</p>
                        </div>
                    </div>


                </div>

            </div> */}
            <div className='grid-chart'>
                <DashboardDetails />
                <ChartContacts />
                <ChartContactoEfectivo/>
            </div>

        </div>
    );
};

export default Home;