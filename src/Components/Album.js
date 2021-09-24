import React, { useState } from "react";
import "./Album.css";

const Album = ({ id, title, onDelete, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleDelete = () => {
    onDelete(id);
  };
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleOnEditSubmit = (evt) => {
    evt.preventDefault();
    onEdit(id, evt.target.title.value);
    setIsEdit(!isEdit);
  };

  return (
    <div>
      {isEdit ? (
        <form onSubmit={handleOnEditSubmit}>
          <input placeholder="title" name="title" defaultValue={title} />
          <button onSubmit={handleOnEditSubmit}>Save</button>
        </form>
      ) : (
        <div className="list">
          <span>{title}</span>

          <span>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </span>
        </div>
      )}
    </div>
  );
};
export default Album;
