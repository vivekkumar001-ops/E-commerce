import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select, Tag } from "antd";

const { Option } = Select;

const ORDER_STATUS = [
  "Not Process",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancel",
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  // ======================
  // GET ALL ORDERS
  // ======================
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // ======================
  // UPDATE STATUS
  // ======================
  const handleStatusChange = async (orderId, value) => {
    try {
      await axios.put(
        `/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      toast.success("Order status updated");
      getOrders();
    } catch (error) {
      console.log(error);
      toast.error("Status update failed");
    }
  };

  return (
    <Layout title="Admin Orders">
      <div className="container-fluid dashboard py-3">
        <div className="row">
          <div className="col-md-3 mb-2">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h2 className="text-center mb-4">All Orders</h2>

            {orders.length === 0 && (
              <p className="text-center text-muted">
                No orders available
              </p>
            )}

            {orders.map((o, index) => (
              <div
                key={o._id}
                className="card shadow-sm mb-4"
              >
                {/* ORDER HEADER */}
                <div className="card-body border-bottom">
                  <div className="row text-center text-md-start">
                    <div className="col-md-2">
                      <strong>#</strong> {index + 1}
                    </div>

                    <div className="col-md-3">
                      <Select
                        size="small"
                        value={o.status}
                        onChange={(value) =>
                          handleStatusChange(o._id, value)
                        }
                        className="w-100"
                      >
                        {ORDER_STATUS.map((s) => (
                          <Option key={s} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div className="col-md-2">
                      <Tag color="blue">
                        {o?.buyer?.name}
                      </Tag>
                    </div>

                    <div className="col-md-2">
                      {moment(o.createdAt).fromNow()}
                    </div>

                    <div className="col-md-2">
                      <Tag
                        color={
                          o?.payment?.success
                            ? "green"
                            : "red"
                        }
                      >
                        {o?.payment?.success
                          ? "Paid"
                          : "Failed"}
                      </Tag>
                    </div>

                    <div className="col-md-1">
                      {o?.products?.length}
                    </div>
                  </div>
                </div>

                {/* PRODUCTS */}
                <div className="card-body">
                  {o.products.map((p) => (
                    <div
                      key={p._id}
                      className="row align-items-center mb-3 border rounded p-2"
                    >
                      <div className="col-md-2 text-center">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="img-fluid rounded"
                          style={{
                            maxHeight: "80px",
                          }}
                        />
                      </div>

                      <div className="col-md-6">
                        <h6 className="mb-1">
                          {p.name}
                        </h6>
                        <p className="text-muted small mb-0">
                          {p.description.substring(0, 50)}...
                        </p>
                      </div>

                      <div className="col-md-2 fw-semibold">
                        ₹ {p.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
