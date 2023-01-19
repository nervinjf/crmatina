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

    const [button, setButton] = useState('cita');

    return (
        <div className='register-tomador'>
            <Tomador /> :
        </div>
    );
};

export default registrar;