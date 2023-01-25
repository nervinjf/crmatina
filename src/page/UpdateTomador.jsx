import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Check from './Check';
import CheckNull from './CheckNull';

const UpdateTomador = ({ id, setUpdateTomador, updateToma }) => {
    const [getTomador, setGetTomador] = useState([]);
    const [getUsuario, setGetUsuario] = useState([]);
    const [dataMotivo1, setDataMotivo1] = useState("");
    const [infoMotivo2, setInfoMotivo2] = useState([]);
    const [dataMotivo2, setDataMotivo2] = useState("");
    const [infoMotivo3, setInfoMotivo3] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [isCheck, setIsCheck] = useState(false);
    const [isCheckNull, setIsCheckNull] = useState(false);
    const [infoPlan, setInfoPlan] = useState([]);
    const [infoTipo, setInfoTipo] = useState("");
    const [userSelected, setUserSelected] = useState(null);

    const clear = () => {
        reset({
            "firstname": "",
            "lastname": "",
            "ci": "",
            "email": "",
            "phone1": "",
            "address1": "",
            "f_nacimiento": "",
            "patologia": "",
            "medicamentos": "",
        })
    }

    // -------------------------------------------------------
    const selectRegister = (updateToma) => {
        setUserSelected(updateToma)
    }

    useEffect(() => {
        if (updateToma) {
            reset(updateToma)
        }
    }, [updateToma]);

    // -----------------------------------------------------------------------------------------------

    const registrarDatosCitas = (data) => {
        if (updateToma) {
            // const dataPut = { "statusSuscripcion": data.statusSuscripcion }
            console.log(data)
            axios.put(`https://atina-neb-production.up.railway.app/api/v1/tomador/${data.id}/`, data)
                .catch(error => {
                    console.log(error.response)
                    if (error.response.status === 400) {
                        setIsCheckNull(true)
                        setTimeout(() => {
                            setIsCheckNull(false);
                        }, "3500")
                        setTimeout(() => {
                            setUpdateTomador(false);
                        }, "3550")
                    }
                })
                .then(() => getUsers())
                .finally(() => {
                    setIsCheck(true)
                    setTimeout(() => {
                        setIsCheck(false);
                    }, "3500")
                    setTimeout(() => {
                        setUpdateTomador(false);
                    }, "3550")
                })

        } else {

            const data2 = ({ ...data, "tomadorId": id });
            axios.post(`https://atina-neb-production.up.railway.app/api/v1/cita`, data2)
                .catch(error => {
                    console.log(error.response)
                    if (error.response.status === 400) {
                        setIsCheckNull(true)
                        setTimeout(() => {
                            setIsCheckNull(false);
                        }, "3500")
                        setTimeout(() => {
                            setUpdateTomador(false);
                        }, "3550")
                    }
                })
                .then(() => getUsers())
                .finally(() => {
                    setIsCheck(true)
                    setTimeout(() => {
                        setIsCheck(false);
                    }, "3500")
                    setTimeout(() => {
                        setUpdateTomador(false);
                    }, "3550")
                })
        }
        clear()
    }

    // let options = getTomador.map(elemento => {
    //     const nombreCompleto = elemento.firstname + " " + elemento.lastname + " - " + elemento.ci;
    //     let item = {};
    //     item.value = elemento.id;
    //     item.label = nombreCompleto;

    //     return item;
    // });

    let value = 0;

    useEffect(() => {
        const optionsMotivo2 = infoTipo === "Salud" ? setInfoPlan(["Premium - 50.000$", "Premium - 100.000$", "Elite - 200.000$"]) :
            infoTipo === "Mascotas" ? setInfoPlan(["Gold - 1.000$", "Platinum - 2.000$"]) : "";


    }, [infoTipo && userSelected]);

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/users')
            .then(res => setGetUsuario(res.data))
    }, [])

    return (
        <div className='blurcheck2'>
            {isCheck && <Check />}
            {isCheckNull && <CheckNull />}
            <div className='conatiner-check2'>
                <div className='check2'>
                    <div className='cancel-check2'>
                        <div>
                            <button onClick={() => setUpdateTomador(false)}><i class="fa-solid fa-xmark"></i></button>
                        </div>

                    </div>
                    <div className='contain-Form-cita'>
                        <div className='form-cita'>
                            <form onSubmit={handleSubmit(registrarDatosCitas)}>
                                {/* <div>
                                <AsyncSelect className='hola' id="id" placeholder="Tomador"  {...register("tomadorId")}
                                    options={options} value={options.find(c => c.value === value)} onChange={val => setGetTomadorId(val.value)}
                                />
                            </div> */}
                                <div className='form--regis'>
                                    <div className='form-cot-cita-plani-regis'>
                                        <h3>Tomador</h3>
                                        <div className='form-cita-register'>
                                            <div className='form-contac-detail'>
                                                <label htmlFor="nombre">Nombre</label>
                                                <input type="text" {...register("firstname")} />
                                            </div>
                                            <div className='form-contac-detail'>
                                                <label htmlFor="nombre">Apellido</label>
                                                <input type="text" {...register("lastname")} />
                                            </div>
                                            <div className='form-contac-detail'>
                                                <label htmlFor="telefono">CI</label>
                                                <input type="number" {...register("ci")} />
                                            </div>
                                            <div className='form-contac-detail'>
                                                <label htmlFor="correo">Email</label>
                                                <input type="email" {...register("email")} />
                                            </div>
                                            <div className='form-contac-detail'>
                                                <label htmlFor="direccion">Phone</label>
                                                <input type="text" {...register("phone1")} />
                                            </div>
                                            <div className='form-contac-detail'>
                                                <label htmlFor="fechatime">Phone2</label>
                                                <input type="text" {...register("phone2")} />
                                            </div>
                                            <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Phone3</label>
                                            <input type="text" {...register("phone3")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Direccion</label>
                                            <input type="text" {...register("address1")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Direccion2</label>
                                            <input type="text" {...register("address2")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Fecha Nacimiento</label>
                                            <input type="date" {...register("fNacimiento")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Patologia</label>
                                            <input type="text" {...register("patologia")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Medicamentos</label>
                                            <input type="text" {...register("medicamentos")} />
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className='user-form'>
                                    <select name="usuario" placeholder='Usuaios' {...register("userId")}>
                                        {
                                            getUsuario.map(user => (
                                                <option value={user.id} key={user.id}>{user.firstname} {user.lastname}</option>
                                            ))
                                        }
                                    </select>
                                </div> */}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTomador;