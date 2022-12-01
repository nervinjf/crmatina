import { configureStore } from '@reduxjs/toolkit'
import getFormSlice from './slice/getForm.slice'
import postFormSlice from './slice/postForm.slice'

export default configureStore({
    reducer: {
        postform: postFormSlice,
        getform: getFormSlice
    }
})
