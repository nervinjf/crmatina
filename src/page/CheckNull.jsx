import React from 'react';
import checkNull from '../imagenes/no-entry-not-allowed.gif'

const CheckNull = () => {
    return (
        <div className='blurcheck'>
            <div className='conatiner-check'>
                <div className='check'>
                    <img src={checkNull}alt="" width="180rem"/>
                    <h1>Faltan Datos</h1>
                    <p>Registro no se completo</p>
                </div>
            </div>
        </div>
    );
};

export default CheckNull;