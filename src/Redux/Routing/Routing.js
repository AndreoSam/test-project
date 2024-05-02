import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Error from '../Components/Error/Error'
import Register from '../Components/Register/Register'
import Login from '../Components/Login/Login'
import View from '../Components/View/View'


const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Register />} />
                <Route path='view' element={<View />} />
                <Route path='login' element={<Login />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </Router>
    )
}

export default Routing