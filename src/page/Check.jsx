import React from 'react';
import checkli from '../imagenes/green-circle-and-check-mark-9xhxnby3ugm1ec1z.gif'

const Check = () => {
    return (
        <div className='blurcheck'>
            <div className='conatiner-check'>
                <div className='check'>
                    <img src={checkli}alt="" width="180rem"/>
                    <h1>REGISTRO COMPLETO</h1>
                </div>
            </div>
        </div>
    );
};

export default Check;