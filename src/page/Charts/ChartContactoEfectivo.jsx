import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, LinearScale, CategoryScale);

const ChartContactoEfectivo = () => {

    
    const [dataU, setDataU] = useState([])

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/contacto', getConfig())
            .then(res => setDataU(res.data))
    }, [])


    const palabras = dataU?.map(e => e.motivo1)
    const unico = []

    console.log(palabras)


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

    const data = {
        labels: unico,
        datasets: [
            {
                label: '# Registro usuario',
                data: numTipo,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <div className='box-chart'>
            <Bar
                data={data}
                width="100%"
                height="100%"
                fonstsize="200"
            />

            <div className='container-ntotal'>
                <div>
                <p><b>Total: {dataU.length}</b></p>
                </div>
            </div>
        </div>
    );
};

export default ChartContactoEfectivo;