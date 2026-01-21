import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layouts/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const { auth } = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const dropinRef = useRef(null);
  const navigate = useNavigate();

  // =====================
  // TOTAL PRICE
  // =====================
  const totalPrice = () => {
    return cart.reduce((acc, item) => acc + item.price, 0).toLocaleString(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
      }
    );
  };

  // =====================
  // REMOVE ITEM
  // =====================
  const removeCartItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  // =====================
  // GET BRAINTREE TOKEN
  // =====================
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getToken();
  }, [auth?.token]);

  // =====================
  // INIT BRAINTREE
  // =====================
  useEffect(() => {
    if (clientToken && dropinRef.current && !instance) {
      DropIn.create(
        {
          authorization: clientToken,
          container: dropinRef.current,
          paypal: { flow: "vault" },
        },
        (err, inst) => {
          if (err) console.log(err);
          else setInstance(inst);
        }
      );
    }
  }, [clientToken]);

  // =====================
  // HANDLE PAYMENT
  // =====================
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });

      localStorage.removeItem("cart");
      setCart([]);
      toast.success("Payment Successful");
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
      toast.error("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Cart"}>
      <div className="container py-4">
        <h2 className="text-center mb-3">
          {auth?.user ? `Welcome ${auth.user.name}` : "Your Shopping Cart"}
        </h2>

        <p className="text-center text-muted">
          {cart.length
            ? `You have ${cart.length} item(s) in your cart`
            : "Your cart is empty"}
        </p>

        <div className="row mt-4">
          {/* CART ITEMS */}
          <div className="col-md-7">
            {cart.map((p) => (
              <div
                key={p._id}
                className="card mb-3 shadow-sm p-2"
              >
                <div className="row g-2 align-items-center">
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="img-fluid rounded"
                      alt={p.name}
                    />
                  </div>

                  <div className="col-md-5">
                    <h6 className="fw-bold">{p.name}</h6>
                    <p className="text-muted small">
                      {p.description.substring(0, 40)}...
                    </p>
                    <p className="fw-semibold">₹ {p.price}</p>
                  </div>

                  <div className="col-md-3 text-end">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="col-md-5">
            <div className="card shadow-sm p-3">
              <h4 className="fw-bold">Order Summary</h4>
              <hr />
              <h5>Total: {totalPrice()}</h5>

              <hr />

              {auth?.user?.address ? (
                <>
                  <p className="fw-semibold">Delivery Address</p>
                  <p className="text-muted">{auth.user.address}</p>
                  <button
                    className="btn btn-outline-warning btn-sm mb-2"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-warning w-100 mb-2"
                  onClick={() =>
                    auth?.token
                      ? navigate("/dashboard/user/profile")
                      : navigate("/login", { state: "/cart" })
                  }
                >
                  {auth?.token ? "Add Address" : "Login to Checkout"}
                </button>
              )}

              {clientToken && auth?.token && cart.length > 0 && (
                <>
                  <div ref={dropinRef} className="my-2" />
                  <button
                    className="btn btn-success w-100"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
