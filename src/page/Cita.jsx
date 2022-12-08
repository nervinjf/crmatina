import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import AsyncSelect from 'react-select';
import Table from 'react-bootstrap/Table';

const Cita = () => {

    const [getTomador, setGetTomador] = useState([]);
    const [getUsuario, setGetUsuario] = useState([]);
    const [getTomadorId, setGetTomadorId] = useState(0)
    const [ getTomadorIdO, setGetTomadorIdO ] = useState([])
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/tomador')
            .then(res => setGetTomador(res.data))
    }, [])

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/users')
            .then(res => setGetUsuario(res.data))
    }, [])

    const registrarDatosCitas = (data) => {
        const data2 = ({...data, "tomadorId": getTomadorId});
        axios.post(`https://atina-neb-production.up.railway.app/api/v1/cita`, data2)
            .catch(error => console.log(error.response))
            .then(() => getUsers())
        reset({
            "codigo": "",
            "fecha": "",
            "tipo": "",
            "plan": "",
            "asegurados": "",
            "fPago": "",
            "efectivo": "",
            "tiempo": "",
            "fCliente": "",
            "fDevolucion": "",
            "tomadorId": "",
            "poliza": "",
            "statusSuscripcion": "",
            "userId": ""
        })

    }

    let options = getTomador.map(elemento => {
        const nombreCompleto = elemento.firstname + " " + elemento.lastname + " - " + elemento.ci;
        let item = {};
        item.value = elemento.id;
        item.label = nombreCompleto;

        return item;
    });

    const styles = {
        width: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: "5px",
    }

    useEffect(() => {
        axios.get(`https://atina-neb-production.up.railway.app/api/v1/tomador/${getTomadorId}`)
            .then(res => setGetTomadorIdO(res.data))
    }, [getTomadorId])

    let value = 0

    return (
        <div>
            <div className='title-form'>
                <h1>Cita / Cotizacion</h1>
            </div>
            <div className='contain-Form-cita'>
                <div className='form-cita'>
                    <form onSubmit={handleSubmit(registrarDatosCitas)}>
                        <div>
                            <AsyncSelect className='hola' id="id" placeholder="Tomador"  {...register("tomadorId")}
                                options={options} value={options.find(c => c.value === value)} onChange={val => setGetTomadorId(val.value)}
                            />
                        </div>
                        <div className='form-cita-register'>
                            <input type="text" placeholder='Codigo' {...register("codigo")} />
                            <input type="datetime-local" placeholder='Fecha' {...register("fecha")} />
                            <input type="text" placeholder='Tipo' {...register("tipo")} />
                            <input type="email" placeholder='Plan' {...register("plan")} />
                            <input type="number" placeholder='Asegurados' {...register("asegurados")} />
                            <input type="text" placeholder='Forma de Pago' {...register("fPago")} />
                            <input type="text" placeholder='Efectivo' {...register("efectivo")} />
                            <input type="text" placeholder='Tiempo' {...register("tiempo")} />
                            <div>
                                <label htmlFor="fechatime">Fecha Envio Cliente</label>
                                <input type="date" placeholder='Fecha de cliente' {...register("fCliente")} />
                            </div>
                            <div>
                                <label htmlFor="fechatime">Fecha Devolucion</label>
                                <input type="date" placeholder='fecha de devolucion' {...register("fDevolucion")} />
                            </div>
                            <input type="text" placeholder='Poliza' {...register("poliza")} />
                            <input type="text" placeholder='Status de Suscripcion' {...register("statusSuscripcion")} />
                            <select name="usuario" placeholder='Usuaios' {...register("userId")}>
                                {
                                    getUsuario.map(user => (
                                        <option value={user.id} key={user.id}>{user.firstname} {user.lastname}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <button>
                            <div className='btn-text-hidden'>
                                Enviar
                            </div>

                            <div className='btn-i-hidden'>
                                <i class="fa-solid fa-circle-check"></i>
                            </div>
                        </button>
                    </form>

                </div>
                <div className='contain-info-tomador'>
                    <div className='contain-info-tomador-input'>
                        <label htmlFor="Nombre">Nombre:</label>
                        <input type="text" value={getTomadorIdO?.firstname + " " + getTomadorIdO?.lastname} disabled />
                        <label htmlFor="Nombre">Cedula:</label>
                        <input type="text" value={getTomadorIdO?.ci} disabled />
                        <label htmlFor="Nombre">Email:</label>
                        <input type="text" value={getTomadorIdO?.email} disabled />
                        <label htmlFor="Nombre">Telefono:</label>
                        <input type="text" value={getTomadorIdO?.phone1} disabled />
                        <label htmlFor="Nombre">Direccion:</label>
                        <input type="text" value={getTomadorIdO?.address1} disabled />
                        <label htmlFor="Nombre">Fecha de Nacimiento:</label>
                        <input type="text" value={getTomadorIdO?.fNacimiento} disabled />
                        <label htmlFor="Nombre">Patologia:</label>
                        <input type="text" value={getTomadorIdO?.patologia} disabled />
                        <label htmlFor="Nombre">Medicamentos:</label>
                        <input type="text" value={getTomadorIdO?.medicamentos} disabled />
                    </div>
                    <div className='contain-info-contacto'>
                        <h4>Registro de Contactos</h4>
                        <div className='contain-info-contacto-table'>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Fuente</th>
                                        <th>Proposito</th>
                                        <th>Efectivo</th>
                                        <th>Resultado</th>
                                        <th>Observaciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                        {
                                            getTomadorIdO?.contacto?.map(user => (
                                                <tr key={user?.id}>
                                                <td>{user?.createdAt}</td>
                                                <td>{user?.fuente}</td>
                                                <td>{user?.proposito}</td>
                                                <td>{user?.estatus}</td>
                                                <td>{user?.motivo3}</td>
                                                <td>{user?.observacion}</td>
                                                </tr>
                                            ))
                                        }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cita;