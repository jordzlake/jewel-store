import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItem, listItem } from "../../Redux/Actions/ItemActions";
const DeleteIcon = ({ link, itemId, name }) => {
  const dispatch = useDispatch();
  const deletehandler = (id) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      dispatch(deleteItem(id));
    }
  };
  return (
    <div>
      <Link
        to="#"
        onClick={() => deletehandler(itemId)}
        className="admin-edit-icon-container"
      >
        <i className="fa fa-times-circle admin-edit-icon admin-delete-icon"></i>
      </Link>
    </div>
  );
};

export default DeleteIcon;
