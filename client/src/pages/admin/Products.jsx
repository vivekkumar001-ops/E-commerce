import { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/product/get-products");

      if (data?.success) {
        // ✅ ensure it's always an array
        setProducts(Array.isArray(data?.products) ? data.products : []);
      } else {
        toast.error(data?.message || "Failed to load products");
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching products");
      setProducts([]);
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
            ) : products?.length === 0 ? (
              <p className="text-center text-muted">No products found</p>
            ) : (
              <div className="row g-3">
                {products?.map((product) => (
                  <div className="col-12 col-sm-6 col-lg-4" key={product?._id}>
                    <Link
                      to={`/dashboard/admin/product/${product?.slug}`}
                      className="text-decoration-none text-dark"
                    >
                      <div className="card h-100 shadow-sm">
                        <img
                          src={`/api/v1/product/product-photo/${product?._id}`}
                          className="card-img-top"
                          alt={product?.name || "Product"}
                          style={{ height: "200px", objectFit: "cover" }}
                          onError={(e) => {
                            // ✅ stop infinite loop if fallback image missing
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/images/no-image.png";
                          }}
                        />

                        <div className="card-body">
                          <h5 className="card-title">
                            {product?.name || "No Name"}
                          </h5>
                          <p className="card-text">
                            {product?.description
                              ? product.description.length > 60
                                ? product.description.substring(0, 60) + "..."
                                : product.description
                              : "No description"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
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
