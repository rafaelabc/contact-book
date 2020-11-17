import React from 'react';
import iconNotas from '../assets/img/notas.svg';
import '../assets/styles/style-components/Navbar.css';
function Navbar() {
    return (
        <div className="Navbar">
            <nav id="navbar" className="navbar navbar-dark">
                <a className="navbar-brand" href="/">
                    <img
                        src={iconNotas}
                        width="30"
                        height="30"
                        className="iconNotas d-inline-block align-top"
                        alt=""
                        loading="lazy"
                    />
                    Agenda de contatos
                </a>
            </nav>
        </div>
    );
}
export default Navbar;
