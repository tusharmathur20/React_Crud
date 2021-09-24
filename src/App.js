import React, { useState, useEffect } from "react";
import "./App.css";
import Album from "./Components/Album";
import ReactPaginate from "react-paginate";

const App = () => {
  const [Albums, setAlbums] = useState([]);
  const [Search, setSearch] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then((data) => setAlbums(data))
      .catch((err) => {
        console.log(err);
      });
    console.log(Albums);
  };

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setAlbums(
            Albums.filter((album) => {
              return album.id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onEdit = async (id, title) => {
    await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
      }),
      headers: {
        "Content-type": "application/json: charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        var updateAlbum = Albums.map((album) => {
          if (album.id == id) {
            album.title = title;
          }
          return album;
        });
        setAlbums((Albums) => updateAlbum);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <h3>Crud Practice</h3>

      <br />
      {
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      }
      <table>
        <thead className="list">
          <th>Title</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>

        {Albums.filter((vals) => {
          if (Search == "") {
            return vals;
          } else if (vals.title.toLowerCase().includes(Search)) {
            return vals.title;
          }
        }).map((album) => (
          <Album
            Albums={Albums}
            id={album.id}
            key={album.id}
            title={album.title}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
        {/* {Albums.map((album) => (
        <Album id={album.id} key={album.id} title={album.title} />
      ))} */}
      </table>
    </div>
  );
};
export default App;
