import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
// import getConfig from '../../utils/getConfig';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale);

const ChartDetailsTipo = ({ setActive, dataU }) => {

    // const [dataU, setDataU] = useState([])

    // useEffect(() => {
    //     axios.get('https://atina-neb-production.up.railway.app/api/v1/contacto', getConfig())
    //         .then(res => setDataU(res.data))
    // }, [])


    const palabras = dataU?.map(e => e.plan).filter(e => e != "Gold - 1.000$").filter(e => e != "Platinum - 2.000$").filter(e => e != "")
    const unico = []


    for (let i = 0; i < palabras.length; i++) {
        const element = palabras[i];
        if (!unico.includes(palabras[i])) {
            unico.push(element)
        }
    }

    var numTipo = palabras.reduce(function (countTipo, Tipo) {
        countTipo[Tipo] = (countTipo[Tipo] || 0) + 1;
        return countTipo;
    }, {})

    // ------------------------------------------------------------------------------------------

    const palabras2 = dataU?.map(e => e.plan).filter(e => e != "Premium - 100.000$").filter(e => e != "Elite - 200.000$").filter(e => e != "Póliza Integral - 1.000.000$").filter(e => e != "").filter(e => e != "Premium - 50.000$").filter(e => e != "Classic - 200.000$")
    const unico2 = []

    console.log(palabras2)


    for (let i = 0; i < palabras2.length; i++) {
        const element = palabras2[i];
        if (!unico2.includes(palabras2[i])) {
            unico2.push(element)
        }
    }

    var numTipo2 = palabras2.reduce(function (countTipo, Tipo) {
        countTipo[Tipo] = (countTipo[Tipo] || 0) + 1;
        return countTipo;
    }, {})


    const data = {
        labels: unico,
        datasets: [
            {
                label: '# poliza de salud',
                data: numTipo,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const data2 = {
        labels: unico2,
        datasets: [
            {
                label: '# Poliza de Mascotas',
                data: numTipo2,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <div className='container-grid-details-chart'>
            <div className='cuaricula-details-chair'>
                <div className='butttonclose'>
                    <button onClick={() => setActive(false)}>x</button>
                </div>
                <div className='grid-details-chart'>
                    <div className='box-chart'>
                        <Bar
                            data={data}
                            width="100%"
                            height="100%"
                            fonstsize="200"
                        />

                        <div className='container-ntotal'>
                            <div>
                                <p><b>Total: {palabras.length}</b></p>
                            </div>
                        </div>
                    </div>
                    {/* --------------- */}
                    <div className='box-chart'>
                        <Bar
                            data={data2}
                            width="100%"
                            height="100%"
                            fonstsize="200"
                        />

                        <div className='container-ntotal'>
                            <div>
                                <p><b>Total: {palabras2.length}</b></p>
                            </div>
                        </div>
                    </div>
                    {/* ------------ */}
                   
                </div>
            </div>
        </div>
    );
};

export default ChartDetailsTipo;