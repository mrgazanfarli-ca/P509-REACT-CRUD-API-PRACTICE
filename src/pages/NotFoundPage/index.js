import PageContentWrapper from "../../components/PageContentWrapper";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
    <PageContentWrapper>
        <Row>
            <Col xs={12}>
                <h3 className="text-danger">Page not found!</h3>
                <Link to="/">Go to home page</Link>
            </Col>
        </Row>
    </PageContentWrapper>
)

export default NotFoundPage;
