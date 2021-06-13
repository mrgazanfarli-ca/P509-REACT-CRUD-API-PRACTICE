import {
    Button,
    Col,
    ListGroup,
    Row
} from "reactstrap";
import { Link, useParams } from 'react-router-dom';
import React from 'react';

import PageContentWrapper from "../../components/PageContentWrapper";
import axios from "axios";
import { BASE_URL } from "../../consts";
import LoadingSpinner from "../../components/LoadingSpinner";
import UserPost from "../../components/UserPost";
import CreatePostModal from "../../components/Modals/CreatePostModal";
import EditPostModal from "../../components/Modals/EditPostModal";

const UserPostsPage = () => {
    const { id } = useParams();
    const [posts, setPosts] = React.useState();
    const [error, setError] = React.useState('');
    const [isAddModalOpen, setAddModalOpen] = React.useState(false);
    const [newPostDetails, setNewPostDetails] = React.useState({ title: '', body: '' });
    const [isAddPostLoading, setAddPostLoading] = React.useState(false);
    const [editingPostId, setEditingPostId] = React.useState();
    const [isEditPostLoading, setEditPostLoading] = React.useState(false);

    const getPosts = React.useCallback(() => {
        setPosts(null);
        axios.get(`${BASE_URL}/posts?userId=${id}`).then((res) => {
            setPosts(res.data);
            setError('');
        }).catch(() => {
            setError('Unable to get posts of the user :(');
        });
    }, [id]);

    React.useEffect(() => {
        getPosts();
    }, [getPosts]);

    const handleAddClick = React.useCallback(() => {
        setAddModalOpen(true);
    }, []);

    const handleAddModalToggle = React.useCallback(() => {
        setAddModalOpen(prevState => !prevState);
    }, []);

    const handleNewModalDetailsChange = React.useCallback((event, fieldName) => {
        setNewPostDetails(prevValue => ({
            ...prevValue,
            [fieldName]: event.target.value
        }));
    }, []);

    const handleAddPost = React.useCallback(() => {
        setAddPostLoading(true);
        axios.post(`${BASE_URL}/posts`, {
            ...newPostDetails,
            userId: id
        }).then(() => {
            alert('Post has been added successfully...');
            handleAddModalToggle();
            getPosts();
        }).catch(() => {
            alert('Unexpected error occurred');
        }).finally(() => {
            setAddPostLoading(false);
        });
    }, [newPostDetails, id, handleAddModalToggle, getPosts]);

    const handlePostEditClick = React.useCallback((id) => {
        setEditingPostId(id);
    }, []);

    const handlePostDelete = React.useCallback((id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            axios.delete(`${BASE_URL}/posts/${id}`).then(() => {
                alert('Post deleted successfully');
                getPosts();
            }).catch(() => {
                alert('Unexpected error occurred');
            });
        }
    }, [getPosts]);

    const handlePostEdit = React.useCallback((postData) => {
        setEditPostLoading(true);
        axios.put(`${BASE_URL}/posts/${postData.id}`).then(() => {
            setEditingPostId(null);
        }).catch(() => {
            alert('Failed to update post data :(');
        }).finally(() => {
            setEditPostLoading(false);
        });
    }, []);

    return (
        <PageContentWrapper>
            <Row>
                <Col xs={12} className="d-flex justify-content-between align-items-center mt-2">
                    <Link to="/users" className="link-dark d-inline-block">
                        <h5 className="mt-3">{'< go back'}</h5>
                    </Link>
                    <Button onClick={handleAddClick} color="success">
                        Add
                    </Button>
                </Col>
                <Col xs={12}>
                    {posts?.length > 1 && (
                        <ListGroup className="mt-3">
                            {posts.map(({ id, title, body }) => (
                                <UserPost
                                    onDelete={() => handlePostDelete(id)}
                                    onEdit={() => handlePostEditClick(id)}
                                    key={id}
                                    body={body}
                                    title={title}
                                />
                            ))}
                        </ListGroup>
                    )}
                    {posts?.length === 0 && (
                        <h6 className="text-warning mt-3">No posts found!</h6>
                    )}
                    {!Boolean(error) && !Boolean(posts) && (
                        <LoadingSpinner/>
                    )}
                </Col>
            </Row>
            <CreatePostModal
                title={newPostDetails.title}
                body={newPostDetails.body}
                onTitleChange={(e) => handleNewModalDetailsChange(e, 'title')}
                onBodyChange={(e) => handleNewModalDetailsChange(e, 'body')}
                isOpen={isAddModalOpen}
                onToggle={handleAddModalToggle}
                onCancel={handleAddModalToggle}
                onAdd={handleAddPost}
                isLoading={isAddPostLoading}
            />
            <EditPostModal
                onClosed={getPosts}
                isLoading={isEditPostLoading}
                onEdit={handlePostEdit}
                postId={editingPostId}
                isOpen={Boolean(editingPostId)}
                onToggle={() => setEditingPostId(null)}
            />
        </PageContentWrapper>
    )
}

export default UserPostsPage;
