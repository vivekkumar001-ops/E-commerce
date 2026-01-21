import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layouts/UserMenu";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");

      // ✅ IMPORTANT FIX
      setOrders(data.orders || []);
    } catch (error) {
      console.log("ORDER ERROR =>", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <Layout title="Your Orders">
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>

            {orders.length === 0 && (
              <p className="text-center text-muted mt-4">
                No orders found
              </p>
            )}

            {orders.map((o, i) => (
              <div key={o._id} className="border shadow mb-4">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Status</th>
                      <th>Buyer</th>
                      <th>Date</th>
                      <th>Payment</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="container">
                  {o?.products?.map((p) => (
                    <div
                      key={p._id}
                      className="row mb-2 p-3 card flex-row"
                    >
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          width="100"
                          height="100"
                        />
                      </div>
                      <div className="col-md-8">
                        <p><b>{p.name}</b></p>
                        <p>{p.description?.substring(0, 30)}</p>
                        <p>Price : ₹{p.price}</p>
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

export default Orders;
