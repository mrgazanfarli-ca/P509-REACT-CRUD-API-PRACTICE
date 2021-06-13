import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import React from "react";
import axios from "axios";
import { BASE_URL } from "../../../consts";

const EditPostModal = ({ postId, isOpen, onToggle, onEdit, isLoading, onClosed }) => {
    const [editPostDetails, setEditPostDetails] = React.useState({
        title: '',
        body: '',
        userId: '',
        id: ''
    });

    const handlePostDetailsChange = React.useCallback((event, field) => {
        setEditPostDetails(prevValues => ({
            ...prevValues,
            [field]: event.target.value
        }));
    }, []);

    React.useEffect(() => {
        if (Boolean(postId)) {
            axios.get(`${BASE_URL}/posts/${postId}`).then(({ data }) => {
                setEditPostDetails({ ...data });
            }).catch(() => {
                alert('Unable to get post data');
                onToggle();
            });
        }
    }, [postId, onToggle]);

    return (
        <Modal onClosed={onClosed} centered isOpen={isOpen} toggle={onToggle}>
            <ModalHeader>
                Edit the post
            </ModalHeader>
            <ModalBody>
                <Input
                    disabled={isLoading}
                    onChange={(e) => handlePostDetailsChange(e, 'title')}
                    value={editPostDetails.title}
                    placeholder="Enter post title"
                />
                <Input
                    disabled={isLoading}
                    onChange={(e) => handlePostDetailsChange(e, 'body')}
                    value={editPostDetails.body}
                    placeholder="Enter post content"
                    className="my-3"
                />
                <div className="d-flex justify-content-end">
                    <Button onClick={onToggle} color="danger" className="me-3">
                        Cancel
                    </Button>
                    <Button
                        color="success"
                        disabled={isLoading}
                        onClick={() => onEdit(editPostDetails)}
                    >
                        Save
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default EditPostModal;
