import { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ======================
  // GET ALL PRODUCTS
  // ======================
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/product/get-products");

      if (data?.success) {
        setProducts(data.products);
      } else {
        toast.error(data?.message || "Failed to load products");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title="Dashboard - Products">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          {/* LEFT MENU */}
          <div className="col-md-3">
            <AdminMenu />
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-md-9">
            <h1 className="text-center mb-4">All Products</h1>

            {loading ? (
              <p className="text-center">Loading products...</p>
            ) : products.length === 0 ? (
              <p className="text-center text-muted">No products found</p>
            ) : (
              <div className="d-flex flex-wrap">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    to={`/dashboard/admin/product/${product.slug}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        style={{ height: "200px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "/images/no-image.png";
                        }}
                      />

                      <div className="card-body">
                        <h5 className="card-title">
                          {product.name}
                        </h5>
                        <p className="card-text">
                          {product.description?.substring(0, 60)}...
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
