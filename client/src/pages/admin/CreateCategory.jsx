import { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // CREATE CATEGORY
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const { data } = await axios.post(
        "/api/v1/category/create-category",
        { name }
      );

      if (data?.success) {
        toast.success(`${name} created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data?.message || "Create failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // GET ALL CATEGORY
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // UPDATE CATEGORY
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selected || !updatedName.trim()) return;

    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );

      if (data?.success) {
        toast.success("Category updated");
        setVisible(false);
        setSelected(null);
        setUpdatedName("");
        getAllCategory();
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // DELETE CATEGORY
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );

      if (data?.success) {
        toast.success("Category deleted");
        getAllCategory();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <Layout title="Dashboard - Create Category">
      <div className="container-fluid m-3 p-3">
        <div className="row">

          {/* LEFT MENU */}
          <div className="col-md-3">
            <AdminMenu />
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-md-9">
            <h2 className="mb-4">Manage Categories</h2>

            {/* CREATE FORM */}
            <div className="p-3 mb-4 w-50 shadow-sm bg-light rounded">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                buttonText="Create Category"
              />
            </div>

            {/* CATEGORY TABLE */}
            <div className="w-75">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th style={{ width: "180px" }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {categories.length === 0 && (
                    <tr>
                      <td colSpan="2" className="text-center">
                        No categories found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* UPDATE MODAL */}
            <Modal
              open={visible}
              onCancel={() => setVisible(false)}
              footer={null}
              title="Update Category"
            >
              <CategoryForm
                handleSubmit={handleUpdate}
                value={updatedName}
                setValue={setUpdatedName}
                buttonText="Update Category"
              />
            </Modal>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
