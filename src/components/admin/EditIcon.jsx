import React from "react";
const EditIcon = ({ link }) => {
  return (
    <div>
      <a href={link} className="admin-edit-icon-container">
        <i className="fa fa-pen admin-pencil-icon admin-edit-icon"></i>
      </a>
    </div>
  );
};

export default EditIcon;
