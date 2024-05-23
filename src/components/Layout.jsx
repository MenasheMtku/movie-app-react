import React from "react"
import Navbar from "./Navbar/Navbar"
import NavMobile from "./NavMobile/NavMobile"
import PropTypes from "prop-types"

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <NavMobile />
            <main>{children}</main>
        </>
    )
}
Layout.propTypes = {
    children: PropTypes.node.isRequired,
}
export default Layout
