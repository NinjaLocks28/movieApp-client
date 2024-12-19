import React, { useContext } from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import UserContext from '../UserContext'

export default function AppNavbar() {

    const { user } = useContext(UserContext)

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to={'/'}>Ninja's Movies</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link> 

                            {
                                user.id 
                                ?
                                <>
                                <Nav.Link as={Link} to="/movies">Movies</Nav.Link> 
                                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                                </>
                                :
                                <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
