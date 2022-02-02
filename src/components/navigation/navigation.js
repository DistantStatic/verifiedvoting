import { Navbar, Nav, NavbarBrand, Container } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

export default function Navigation(props){

    return(
    <Navbar bg='dark' expand='lg'>
        <Container>
            <NavbarBrand></NavbarBrand>
            <Navbar.Toggle aria-controls='navi' />
            <NavbarCollapse id='navi'>
                    <Nav.Link href="#">Home</Nav.Link>
                    <Nav.Link href="#" onClick={props.voteShow}>Vote</Nav.Link>
                    <Nav.Link href="#" onClick={props.raceShow}>Enter Race</Nav.Link>
            </NavbarCollapse>
        </Container>
    </Navbar>
    )
}
