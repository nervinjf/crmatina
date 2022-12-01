import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const getFormSlice = createSlice({
    name: 'getregistros',
    initialState: [],
    reducers: {
        getRegistros: (state, action) => {
            const registros = action.payload
            return registros
        }
    }
})

export const getRegistrosThunk = () => (dispatch) => {
    // dispatch(setIsLoading(true));
    return axios.get('http://localhost:8000/api/v1/tomador/cotizacion')
        .then(res => dispatch(getRegistros(res)))
        // .finally(() => dispatch(setIsLoading(false)));
}

export const addRegistrosThunk = (registro) => (dispatch) => {
    // dispatch(setIsLoading(true));
    return axios.post('https://http://localhost:8000/api/v1/tomador', registro)
        .then(() => dispatch(getRegistrosThunk()))
        // .finally(() => dispatch(setIsLoading(false)));
}

export const { getRegistros } = getFormSlice.actions;

export default getFormSlice.reducer;
