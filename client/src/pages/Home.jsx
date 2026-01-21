import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Prices } from "../components/prices";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layouts/Layout";
import { AiOutlineReload, AiOutlineShoppingCart, AiOutlineInfoCircle } from "react-icons/ai";
import { useCart } from "../context/Cart";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter logic
  const handleFilter = (isChecked, id) => {
    let all = [...checked];
    if (isChecked) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Shop Now - Best Offers"}>
      <div className="container-fluid mt-3">
        <div className="row">
          
          {/* Sidebar Filters */}
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                
                {/* Category Filter */}
                <h5 className="card-title fw-bold mb-3 border-bottom pb-2">Category</h5>
                <div className="d-flex flex-column gap-2">
                  {categories?.map((c) => (
                    <div className="form-check" key={c._id}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={c._id}
                        id={`cat-${c._id}`}
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                      />
                      <label className="form-check-label" htmlFor={`cat-${c._id}`}>
                        {c.name}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Price Filter */}
                <h5 className="card-title fw-bold mt-4 mb-3 border-bottom pb-2">Price Range</h5>
                <div className="d-flex flex-column gap-2">
                  {Prices?.map((p) => (
                    <div className="form-check" key={p._id}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priceFilter"
                        id={`price-${p._id}`}
                        onChange={() => setRadio(p.array)}
                      />
                      <label className="form-check-label" htmlFor={`price-${p._id}`}>
                        {p.name}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Reset Button */}
                <div className="d-grid mt-4">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => window.location.reload()}
                  >
                    Reset Filters
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold">All Products</h4>
              <span className="text-muted">{products?.length} items found</span>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              {products?.map((p) => (
                <div className="col" key={p._id}>
                  <div className="card h-100 shadow-sm border-0">
                    <div style={{ height: "200px", overflow: "hidden" }} className="p-3 text-center">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top h-100 w-auto"
                        alt={p.name}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                         <h5 className="card-title text-truncate" style={{ maxWidth: "70%" }} title={p.name}>
                           {p.name}
                         </h5>
                         <span className="badge bg-success rounded-pill">
                            {p.price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                         </span>
                      </div>
                      
                      <p className="card-text text-muted small flex-grow-1">
                        {p.description.substring(0, 60)}...
                      </p>

                      <div className="d-grid gap-2 mt-auto">
                        <button
                          className="btn btn-outline-dark btn-sm d-flex align-items-center justify-content-center gap-2"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          <AiOutlineInfoCircle /> More Details
                        </button>
                        <button
                          className="btn btn-dark btn-sm d-flex align-items-center justify-content-center gap-2"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem("cart", JSON.stringify([...cart, p]));
                            toast.success("Item Added to cart");
                          }}
                        >
                          <AiOutlineShoppingCart /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Loading / Empty State */}
            <div className="text-center my-5">
              {products && products.length < total ? (
                <button
                  className="btn btn-warning px-4 py-2 fw-bold"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More <AiOutlineReload />
                    </>
                  )}
                </button>
              ) : (
                products.length === 0 && (
                  <div className="alert alert-info" role="alert">
                    No products found matching your criteria.
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;