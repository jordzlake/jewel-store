import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "./admin/DeleteIcon";
import EditIcon from "./admin/EditIcon";
//
const Card = ({
  id,
  name,
  price,
  bedrooms,
  bathrooms,
  size,
  im,
  redir,
  type,
  loc,
  editable,
}) => {
  const linkto = redir ? redir : "/";
  const itemId = editable ? id : "";
  const deleteButton = editable ? true : false;
  const editButton = editable ? true : false;
  return (
    <React.Fragment>
      <div className="buttons-edit-icon-container">
        {deleteButton && (
          <DeleteIcon link={`/admin/items`} itemId={itemId} name={name} />
        )}
        {editButton && <EditIcon link={`/admin/items/${id}`} itemId={itemId} />}
      </div>
      <Link to={linkto}>
        <div className="card-obj">
          <div className="d-flex flex-column card-container">
            <div className="card-image-container">
              <img src={`${im}`} alt="" />
            </div>
            <div className="d-flex flex-column card-info-container">
              <p className="card-name">
                {`${name}`} - {`${loc}`}
              </p>
              <p className="card-cost">{`${price}`}</p>
              {type !== "land" && (
                <p className="card-rooms">
                  <b>{`${bedrooms}`}</b> Bedrooms, <b>{`${bathrooms}`}</b>{" "}
                  Bathrooms
                </p>
              )}
              <p className="size">
                <b>{`${size}`}</b> {type !== "land" ? "sq ft" : "acres"}.
              </p>
            </div>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
};

export default Card;
