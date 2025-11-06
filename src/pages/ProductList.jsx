// src/pages/ProductList.jsx
import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load products. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCreate = async (productData) => {
    try {
      await createProduct(productData);
      await fetchProducts();
      alert("Product created successfully!");
    } catch (err) {
      console.error(err);
      setError(err.message || "Error creating product.");
    }
  };

  const handleUpdate = async (productData) => {
    try {
      await updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
      await fetchProducts();
      alert("Product updated successfully!");
    } catch (err) {
      console.error(err);
      setError(err.message || "Error updating product.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete product ${id}?`)) return;
    try {
      await deleteProduct(id);
      await fetchProducts();
      alert("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      setError(err.message || "Error deleting product.");
    }
  };

  if (isLoading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="product-page">
      <h1>Simple Products CRUD Application</h1>

      <div className="product-layout">
        {/* ✅ Left side: Form */}
        <section className="form-section">
          <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
          <ProductForm
            onSubmit={editingProduct ? handleUpdate : handleCreate}
            initialData={editingProduct || {}}
            isUpdate={!!editingProduct}
          />
          {editingProduct && (
            <button className="btn-cancel" onClick={() => setEditingProduct(null)}>
              Cancel Edit
            </button>
          )}
        </section>

        {/* ✅ Right side: Product List */}
        <section className="list-section">
          <h1>Available Products</h1>
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                  onEdit={setEditingProduct}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductList;
