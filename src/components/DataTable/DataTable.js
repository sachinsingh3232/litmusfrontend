// import "./DataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
// import Topbar from "../../components/topbar/Topbar";
// import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../helper"

export default function UserList({ setUser, setMessage, Message, user }) {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(0);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user || !user.isAdmin) navigate("/admin");
  // }, [])

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/app/user/findAllUser', { withCredentials: true })
        setData(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getAllUsers();
  }, [])

  // const deleteUser = async (id) => {
  //   try {
  //     const res = await axios.delete(`${BASE_URL}/netflix/user/delete/${id}`, { withCredentials: true })
  //     // console.log(res.data.message)
  //   } catch (e) {
  //     // console.log(e)
  //   }
  // }
  // const handleDelete = (id) => {
  //   deleteUser(id);
  //   setData(datas.filter((item) => item._id !== id));
  // };
  // const makeAdminHandler = async (id) => {
  //   try {
  //     const res = await axios.put(`${BASE_URL}/netflix/user/makeAdmin/${id}`, { withCredentials: true })
  //     // console.log(res.data);
  //   } catch (e) {
  //     // console.log(e)
  //   }
  // };

  const columns = [
    { field: "_id", headerName: "ID", width: 250, headerAlign: 'center' },
    { field: "name", headerName: "Name", width: 250, headerAlign: 'center' },
    { field: "email", headerName: "Email", width: 250, headerAlign: 'center' },
    {
      field: "score",
      headerName: "Attempts",
      width: 150,
      headerAlign: 'center',
      valueGetter: (params) => {
        console.log(params.row.score.length);
        return params.row.score.length;
      },
      // renderCell: (params) => {
        //   return (
          //     <>
      //       {/* <button className="userListEdit" onClick={() => { makeAdminHandler(params.row._id); setToggle(1 - toggle) }}>ToggleAdmin</button>
      //       <DeleteOutline
      //         className="userListDelete"
      //         onClick={() => handleDelete(params.row._id)}
      //       /> */}
      //     </>
      //   );
      // },
    },
    { field: "role", headerName: "Role", width: 100, headerAlign: 'center' },
  ];

  return (
    <div>
      {/* <Topbar /> */}
      <div className="container">
        {/* <Sidebar setUser={setUser} setMessage={setMessage} Message={Message} /> */}
        <div className="userList">
          <div className="userTitleContainer">
            <h1 className="userTitle">Users</h1>
          </div>
          <DataGrid className="userListTable"
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={(r) => r._id}
            autoHeight
          />
        </div>
      </div>
    </div>
  );
}