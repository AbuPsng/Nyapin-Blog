import Navbar from './Navbar'
import Footer from './Footer'

const Template = ({ children }) => {
    return (
        <>
            <div className="w-full px-20">
                <Navbar />
                {children}
                <Footer />
            </div>
        </>
    )
}

export default Template
