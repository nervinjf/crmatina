import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const postFormSlice = createSlice({
    name: "postRegistros",
    initialState: [],
    reducers: {
         postRegistros: (state, action) => {
            const registros = action.payload
            return registros
        }
    }
})

export const addRegistrosThunk = (registro) => (dispatch) => {
    // dispatch(setIsLoading(true));
    return axios.post('www.localhost:8000/api/v1/tomador', registro)
        .then(() => dispatch(getRegistrosThunk()))
        // .finally(() => dispatch(setIsLoading(false)));
}

export const { postRegistros } = postFormSlice.actions;



export default postFormSlice.reducer;
