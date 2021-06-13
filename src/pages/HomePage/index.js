import { Col, Row } from "reactstrap";
import PageContentWrapper from "../../components/PageContentWrapper";

const HomePage = () => {
    return (
        <PageContentWrapper>
            <Row className="pt-4">
                <Col xs={12}>
                    <h4>This is home page...</h4>
                </Col>
            </Row>
        </PageContentWrapper>
    )
}

export default HomePage;
