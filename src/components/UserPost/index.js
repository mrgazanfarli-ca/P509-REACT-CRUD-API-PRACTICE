import { Button, ListGroupItem } from "reactstrap";

const UserPost = ({ title, body, onDelete, onEdit }) => (
    <ListGroupItem>
        <h5 className="text-primary">{title}</h5>
        <p>{body}</p>
        <div className="d-flex justify-content-end">
            <Button onClick={onEdit} className="me-3" color="warning">Edit</Button>
            <Button onClick={onDelete} color="danger">Delete</Button>
        </div>
    </ListGroupItem>
)

export default UserPost;
