import { Navbar, Nav, Container } from "react-bootstrap"
import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom"
import Modal from "../components/modal";
import profile from "../components/data/profile.json"
const NavBarExample = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Navbar className="navBg" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-lightning" viewBox="0 0 16 16">
                            <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1H6.374z" />
                        </svg>three pics
                    </Navbar.Brand>

                    <Navbar.Toggle>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-person-circle" viewBox="0 0 16 16"  onClick={() => {  setModalOpen(true);        }}>
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                        
                    </Navbar.Toggle>
                   
                   
                </Container>
            </Navbar>
            <section>
            {modalOpen && <Modal setOpenModal={setModalOpen} />}
        
                <Outlet></Outlet>
            </section>

        </>
    )
}
export default NavBarExample