import { Container, Row, Col } from "react-bootstrap";
import Logo from '../images/logo.png';
import {Link} from 'react-router-dom'

const OuterHeader = ({getStarted}) =>{
    return(
        <Container className="logo-outer">
      <Row className="justify-content-between">
        <Col sm={3}>
          <img src={Logo} alt="" />
        </Col>
        {/* <Col sm={6} className="d-inline-flex justify-content-md-end justify-content-center align-items-center">
            <Link to={getStarted ? "/sign-in" : "/" } className="custom-btn">{getStarted ? 'Sign In' : "Create an account"}</Link>
        </Col> */}
      </Row>
    </Container>
    )
}

export default OuterHeader;