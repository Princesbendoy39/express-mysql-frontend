const API_BASE_URL = "https://express-mysql-backend.onrender.com/api/products";


// GET All Products (Read)
export const getAllProducts = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch products.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// POST New Product (Create)
export const createProduct = async (productData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorDetail = await response.json();
      throw new Error(errorDetail.error || "Failed to create product.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// PUT Product (Update)
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorDetail = await response.json();
      throw new Error(errorDetail.error || `Failed to update product ${id}.`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// DELETE Product
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    // 204 means "No Content" (successful delete)
    if (response.status !== 204) {
      const errorDetail = await response.json();
      throw new Error(errorDetail.error || `Failed to delete product ${id}.`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
