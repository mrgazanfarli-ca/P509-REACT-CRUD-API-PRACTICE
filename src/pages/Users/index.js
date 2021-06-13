import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import React from 'react';
import axios from "axios";

import PageContentWrapper from "../../components/PageContentWrapper";

import { BASE_URL } from "../../consts";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router-dom";

const UsersPage = () => {
    const [usersData, setUsersData] = React.useState(null);
    const [usersError, setUsersError] = React.useState('');

    React.useEffect(() => {
        axios.get(`${BASE_URL}/users`).then((res) => {
            setUsersData(res.data);
            setUsersError('');
        }).catch(() => {
           setUsersError('Failed to load the list of the users :(');
           setUsersData(null);
        });
    }, []);

    return (
        <PageContentWrapper>
            <Row className="pt-4">
                <Col xs={12}>
                    <h4 className="text-primary">Users</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <ListGroup>
                        {usersData?.map((user, index) => (
                            <ListGroupItem key={user.id}>
                                <Link className="link-success" to={`/users/${user.id}/posts`}>{index+1} {user.name} ({user.username})</Link>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    {Boolean(usersError) && <p className="text-danger">{usersError}</p>}
                </Col>
            </Row>
            {!Boolean(usersData) && !Boolean(usersError) && <LoadingSpinner />}
        </PageContentWrapper>
    )
}

export default UsersPage;
