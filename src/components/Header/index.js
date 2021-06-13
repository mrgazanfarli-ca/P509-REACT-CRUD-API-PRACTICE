import {
    Col,
    Container,
    Nav,
    Navbar,
    NavItem,
    Row,
} from "reactstrap";
import { NavLink } from 'react-router-dom';

const AppHeader = () => (
    <Navbar className="py-3" color="dark" dark expand="md">
        <Container>
            <Row>
                <Col xs={12} className="d-flex align-items-center">
                    <NavLink to="/" className="nav-link link-light" activeclassname="active">reactstrap</NavLink>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink activeclassname="active" to="/users" className="nav-link">Users</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink activeclassname="active" to="/test" className="nav-link">Test</NavLink>
                        </NavItem>
                    </Nav>
                </Col>
            </Row>
        </Container>
    </Navbar>
)

export default AppHeader;
