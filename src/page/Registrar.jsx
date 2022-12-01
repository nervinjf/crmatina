import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { useForm } from 'react-hook-form';
import { addRegistrosThunk } from '../store/slice/getForm.slice';
import axios from 'axios';
import Asegurado from './Asegurado';
import Tomador from './Tomador';
import Cita from './Cita';
import RegistroContacto from './RegistroContacto';


const registrar = () => {

    const [ button, setButton ] = useState('cita');

    return (
        <>
            <div>
                <RegistroContacto />
            </div>
        <div className='button'>
            <div className='container-button'>
                <button onClick={() => setButton('cita')}>Cita / Cotizacion</button>
                <button onClick={() => setButton('Asegurado')}>Asegurado</button>
                <button onClick={() => setButton('Tomador')}>Tomador</button>
            </div>
        </div>
        <div className='container-register'>
            {
                button === 'Asegurado' ? <Asegurado /> :
                button === 'Tomador' ? <Tomador /> :
                button === 'cita' ? <Cita /> : ""
            }
        </div>
        </>
    );
};

export default registrar;