import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import AsyncSelect from 'react-select';
import Table from 'react-bootstrap/Table';
import Check from './Check';
import CheckNull from './CheckNull';
import getConfig from '../utils/getConfig';

const Cita = () => {

    const [getTomador, setGetTomador] = useState([]);
    const [getUsuario, setGetUsuario] = useState([]);
    const [getTomadorId, setGetTomadorId] = useState(0);
    const [infoTipo, setInfoTipo] = useState("");
    const [infoPlan, setInfoPlan] = useState([]);
    const [getTomadorIdO, setGetTomadorIdO] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [userSelected, setUserSelected] = useState(null);
    const [isCheck, setIsCheck] = useState(false);
    const [isCheckNull, setIsCheckNull] = useState(false);

    const selectRegister = (data) => {
        setUserSelected(data)
    }



    useEffect(() => {
        if (userSelected) {
            reset(userSelected)
        }
    }, [userSelected]);

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/tomador', getConfig())
            .then(res => setGetTomador(res.data))
    }, [])

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/users')
            .then(res => setGetUsuario(res.data))
    }, [])

    const registrarDatosCitas = (data) => {
        if (userSelected) {
            const dataPut = { "statusSuscripcion": data.statusSuscripcion }
            console.log(data.id)
            axios.put(`https://atina-neb-production.up.railway.app/api/v1/cita/${data.id}/`, dataPut, getConfig())
                .then(() => getUsers())

        } else {

            const data2 = ({ ...data, "tomadorId": getTomadorId });
            axios.post(`https://atina-neb-production.up.railway.app/api/v1/cita`, data2, getConfig())
                .catch(error => {
                    console.log(error.response)
                    if (error.response.status === 400) {
                        setIsCheckNull(true)
                        setTimeout(() => {
                            setIsCheckNull(false);
                        }, "1500")
                    }
                })
                .then(() => getUsers())
                .finally(() => {
                    setIsCheck(true)
                    setTimeout(() => {
                        setIsCheck(false);
                    }, "1500")
                })
        }
        clear()
        setGetTomador([])
    }

    const clear = () => {
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
        axios.get(`https://atina-neb-production.up.railway.app/api/v1/tomador/${getTomadorId}`, getConfig())
            .then(res => setGetTomadorIdO(res.data))
            .then(res => console.log(res?.error))
    }, [getTomadorId])

    let value = 0;

    useEffect(() => {
        const optionsMotivo2 = infoTipo === "Salud" ? setInfoPlan(["Premium - 50.000$", "Premium - 100.000$", "Elite - 200.000$"]) :
            infoTipo === "Mascotas" ? setInfoPlan(["Gold - 1.000$", "Platinum - 2.000$"]) : "";


    }, [infoTipo && userSelected]);

    return (
        <div className=''>
            {isCheck && <Check />}
            {isCheckNull && <CheckNull />}
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
                        <div className='form--regis'>
                            <div className='form-cot-cita-plani-regis'>
                                <h3>Cotizacion</h3>
                                <div className='form-cita-register'>
                                    <input type="text" placeholder='Codigo' value="10092" {...register("codigo")} />
                                    <div className='form-cita-register-cotizacion'>
                                        {/* <label htmlFor="tipo" placeholder='Tipo'>Tipo: </label> */}
                                        <select name="" id="" {...register("tipo")} onChange={(e) => setInfoTipo(e.target.value)}>
                                            <option value="">--Seleccione tipo de Poliza--</option>
                                            <option value="Salud">Salud</option>
                                            <option value="Mascotas">Mascotas</option>
                                        </select>
                                    </div>
                                    <div className='form-cita-register-cotizacion'>
                                        {/* <label htmlFor="tipo" placeholder='Plan'>Plan: </label> */}
                                        <select name="" id="" {...register("plan")}>
                                            <option value="">--Seleccione el Plan --</option>
                                            {
                                                infoPlan.map(item => (
                                                    <option value={item} key={item}>{item}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <input type="number" placeholder='Asegurados' {...register("asegurados")} />
                                    <div className='form-cita-register-cotizacion'>
                                        {/* <label htmlFor="Mpago" placeholder='metodo de Pago'>Moneda</label> */}
                                        <select name="Mpago" id="" {...register("efectivo")}>
                                            <option value="">-- Seleccione el Tipo de Modeda --</option>
                                            <option value="Dolares">Dolares</option>
                                            <option value="Bolivares">Bolivares</option>
                                        </select>
                                    </div>
                                    <div className='form-cita-register-cotizacion'>
                                        {/* <label htmlFor="Mpago" placeholder='metodo de Pago'>Metodo de Pago</label> */}
                                        <select name="Mpago" id="" {...register("fPago")}>
                                            <option value="">-- Seleccione el Metodo de Pago --</option>
                                            <option value="Efectivo">Efectivo</option>
                                            <option value="Transferencias">Transferencias</option>
                                            <option value="Zinli">Zinli</option>
                                            <option value="Debito">Debito</option>
                                            <option value="Credito">Credito</option>
                                        </select>
                                    </div>
                                    <div className='form-cita-register-cotizacion'>
                                        {/* <label htmlFor="">Tiempo</label> */}
                                        <select name="" id="" {...register("tiempo")}>
                                            <option value="">-- Seleccione el Tiempo --</option>
                                            <option value="Mensual">Mensual</option>
                                            <option value="Trimestral">Trimestral</option>
                                            <option value="Semestral">Semestral</option>
                                            <option value="Anual">Anual</option>
                                        </select>
                                    </div>
                                    <input type="text" placeholder='Monto Poliza' {...register("poliza")} />
                                </div>
                            </div>
                            <div className='form-cot-cita-plani-regis'>
                                <h3>Cita</h3>
                                <div className='form-cita-register form-cita-regis'>
                                    <div className='form-cita-register-cotizacion'>
                                        <label htmlFor="fechatime">Fecha Cita</label>
                                        <input type="datetime-local" placeholder='Fecha' {...register("fecha")} />
                                    </div>
                                    <div className='form-cita-register-cotizacion'>
                                        {/* <label htmlFor="">Tiempo</label> */}
                                        <select name="" id="" {...register("statusSuscripcion")}>
                                            {/* <option value="">-- Seleccione el modo de la cita --</option> */}
                                            <option value="Proceso">Proceso</option>
                                            <option value="Concluido">Concluido</option>
                                        </select>
                                    </div>
                                    <div className='form-cita-register-cotizacion'>
                                        {/* <label htmlFor="">Tiempo</label> */}
                                        <select name="" id="" {...register("modoCita")}>
                                            <option value="">-- Seleccione el modo de la cita --</option>
                                            <option value="Virtual">Virtual</option>
                                            <option value="Presencial">Presencial</option>
                                        </select>
                                    </div>
                                    <div className='form-cita-register-cotizacion'>
                                        {/* <label htmlFor="">Tiempo</label> */}
                                        <select name="" id="" {...register("citaAcomp")}>
                                            <option value="">-- Seleccione el modo de la cita --</option>
                                            <option value="Solo">Solo</option>
                                            <option value="Acompañado">Acompañado</option>
                                        </select>
                                    </div>
                                    <div className='form-cita-register-cotizacion-check'>
                                        <label htmlFor="check">Envio de Cotización: </label>
                                        <input type="checkbox" />
                                    </div>
                                </div>

                            </div>
                            <div className='form-cot-cita-plani-regis'>
                                <h3>Planilla</h3>
                                <div className='form-cita-register'>
                                    <div className='form-cita-register-cotizacion'>
                                        <label htmlFor="fechatime">Fecha Envio Cliente</label>
                                        <input type="date" placeholder='Fecha de cliente' {...register("fCliente")} />
                                    </div>
                                    <div className='form-cita-register-cotizacion'>
                                        <label htmlFor="fechatime">Fecha Devolucion</label>
                                        <input type="date" placeholder='fecha de devolucion' {...register("fDevolucion")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='user-form'>
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
                                                <td>{new Date(user?.createdAt).toLocaleString('es-VE', { timeZone: 'UTC' })}</td>
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
            <div className='contain-info-contacto'>
                <h4>Registro de Cita / Cotizacion</h4>
                <div className='contain-info-contacto-table'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Fecha Act.</th>
                                <th>Tipo de Poliza</th>
                                <th>Plan</th>
                                <th>Tiempo</th>
                                <th>Monto de poliza</th>
                                <th>Fec. Cita</th>
                                <th>Status</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getTomadorIdO?.cita?.map(user => (
                                    <tr key={user?.id}>
                                        <td>{new Date(user?.createdAt).toLocaleString('es-VE', { timeZone: 'UTC' })}</td>
                                        <td>{new Date(user?.updatedAt).toLocaleString('es-VE', { timeZone: 'UTC' })}</td>
                                        <td>{user?.tipo}</td>
                                        <td>{user?.plan}</td>
                                        <td>{user?.tiempo}</td>
                                        <td>{user?.poliza}</td>
                                        <td>{new Date(user?.fecha).toLocaleString('es-VE', { timeZone: 'UTC' })}</td>
                                        <td>{user?.statusSuscripcion}</td>
                                        <td><button onClick={() => selectRegister(user)}><i class="fa-solid fa-pen-to-square"></i></button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Cita;