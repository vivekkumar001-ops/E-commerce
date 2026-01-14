// Users page for admin panel
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
const Users = () => {
  const [users, setUsers] = useState([]);
    // Fetch all users
    const getAllUsers = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/all-users");
            setUsers(data.users);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting users");
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);
    return (
    <Layout title={"All Users - Admin Panel"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">   
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
                <h1 className="text-center">All Users</h1>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
}
export default Users;