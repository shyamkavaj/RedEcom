import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

const Toast = () => {
    return <ToastContainer autoClose={1000} position='bottom-right' />
}

export default Toast

export const ShowToast = (text) => {
    toast.dark(text)
}
