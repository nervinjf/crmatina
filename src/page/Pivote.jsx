import React from 'react';
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import getConfig from '../utils/getConfig';

const Pivote = () => {

    const PlotlyRenderers = createPlotlyRenderers(Plot);
    const [state, setState] = useState([]);
    const [ tomador, setTomador ] = useState([])

    useEffect(() => {
        axios.get('http://crmatina.nebconnection.com/api/v1/tomador', getConfig())
            .then(res => setTomador(res.data))

            

    }, [])

    console.log(tomador)


    return (
        <div className='container-report-table'>
            <h3>test</h3>
            
            <PivotTableUI
                data={tomador}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                onChange={(s) => {
                    setState(s);
                }}
                {...state}
            />
        </div>
    );
};

export default Pivote;