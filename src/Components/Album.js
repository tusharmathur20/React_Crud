import React, { useState } from "react";
import "./Album.css";
import ReactPaginate from "react-paginate";

const Album = ({ Albums, id, title, onDelete, onEdit }) => {
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
    <tr className="list">
      <td>
        {" "}
        {isEdit ? (
          <form onSubmit={handleOnEditSubmit}>
            <input placeholder="title" name="title" defaultValue={title} />
            <button onSubmit={handleOnEditSubmit}>Save</button>
          </form>
        ) : (
          title
        )}
      </td>

      <td>
        {" "}
        <button onClick={handleEdit}>Edit</button>
      </td>
      <td>
        {" "}
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default Album;
