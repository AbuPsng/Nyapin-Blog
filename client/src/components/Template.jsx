import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Template = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default Template
