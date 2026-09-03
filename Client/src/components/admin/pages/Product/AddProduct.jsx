import AdminNavbar from "../../Layout/AdminNavbar.jsx";
import Sidebar from "../../Layout/Sidebar.jsx";
import upload_area from "../../../../assets/back/upload_area.png";
import {createProduct} from "../../../services/productServices.js";
import { useState } from "react";

const AddProduct = () => {
  // ==============================
  // FORM STATES
  // ==============================
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [bestseller, setBestseller] = useState(false);

  // Selected sizes
  const [sizes, setSizes] = useState([]);

  // Images
  const [images, setImages] = useState([
    null,
    null,
    null,
    null,
  ]);

  // Loading / messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==============================
  // IMAGE CHANGE
  // ==============================
  const handleImageChange = (index, file) => {
    if (!file) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Maximum 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Each image must be less than 5MB.");
      return;
    }

    const updatedImages = [...images];
    updatedImages[index] = file;

    setImages(updatedImages);
    setError("");
  };

  // ==============================
  // SIZE SELECT
  // ==============================
  const handleSize = (size) => {
    setSizes((currentSizes) => {
      if (currentSizes.includes(size)) {
        return currentSizes.filter((item) => item !== size);
      }

      return [...currentSizes, size];
    });
  };

  // ==============================
  // CREATE PRODUCT
  // ==============================
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // ==============================
    // VALIDATION
    // ==============================

    if (!productName.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!description.trim()) {
      setError("Product description is required.");
      return;
    }

    if (!price || Number(price) <= 0) {
      setError("Please enter a valid product price.");
      return;
    }

    if (stock === "" || Number(stock) < 0) {
      setError("Please enter a valid product stock.");
      return;
    }

    if (sizes.length === 0) {
      setError("Please select at least one product size.");
      return;
    }

    const selectedImages = images.filter(
      (image) => image !== null
    );

    if (selectedImages.length === 0) {
      setError("Please upload at least one product image.");
      return;
    }

    try {
      setLoading(true);

      // ==============================
      // FORM DATA
      // ==============================
      const formData = new FormData();

      formData.append("name", productName.trim());
      formData.append(
        "description",
        description.trim()
      );
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("bestseller", bestseller);

      // Send sizes
      formData.append(
        "sizes",
        JSON.stringify(sizes)
      );

      // Send images
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });

      // ==============================
      // API REQUEST
      // ==============================
      const response = await createProduct(formData);

      console.log(
        "Create Product Response:",
        response
      );

      setMessage(
        response?.data?.message ||
          "Product created successfully!"
      );

      // ==============================
      // RESET FORM
      // ==============================
      setProductName("");
      setDescription("");
      setCategory("Men");
      setSubCategory("Topwear");
      setPrice("");
      setStock("");
      setSizes([]);
      setBestseller(false);
      setImages([
        null,
        null,
        null,
        null,
      ]);
    } catch (requestError) {
      console.error(
        "Create Product Error:",
        requestError
      );

      setError(
        requestError.response?.data?.message ||
          "Failed to create product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-white">
      {/* ==============================
          ADMIN NAVBAR
      ============================== */}
      <AdminNavbar />

      <div className="row g-0">
        {/* ==============================
            SIDEBAR
        ============================== */}
        <div className="col-3 col-sm-3 col-md-3 col-lg-2">
          <Sidebar />
        </div>

        {/* ==============================
            MAIN CONTENT
        ============================== */}
        <div className="col-9 col-sm-9 col-md-9 col-lg-10 border-start border-3">
          <form
            onSubmit={handleCreateProduct}
            className="w-100"
          >
            {/* ==============================
                UPLOAD IMAGES
            ============================== */}
            <div className="p-3 p-md-4">
              <h5 className="mb-3">
                Upload Images
              </h5>

              <div className="d-flex gap-2 gap-md-3 flex-wrap">
                {images.map((image, index) => (
                  <label
                    key={index}
                    className="text-center"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : upload_area
                      }
                      alt={`Upload ${index + 1}`}
                      className="img-fluid"
                      style={{
                        height: "100px",
                        width: "100px",
                        objectFit: "cover",
                        borderStyle: "dotted",
                        borderWidth: "1.5px",
                        borderColor: "#ccc4be",
                        borderRadius: "4px",
                      }}
                    />

                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) =>
                        handleImageChange(
                          index,
                          e.target.files[0]
                        )
                      }
                    />
                  </label>
                ))}
              </div>

              <small className="text-muted d-block mt-2">
                Upload up to 4 product images. Maximum
                5MB per image.
              </small>
            </div>

            {/* ==============================
                PRODUCT NAME
            ============================== */}
            <div className="px-3 px-md-4 mt-2">
              <h5 className="mb-2">
                Product Name
              </h5>

              <input
                type="text"
                placeholder="Text Here.."
                name="productname"
                id="productname"
                value={productName}
                onChange={(e) =>
                  setProductName(e.target.value)
                }
                className="form-control p-2 border-danger-subtle border-2"
                style={{
                  maxWidth: "400px",
                }}
              />
            </div>

            {/* ==============================
                DESCRIPTION
            ============================== */}
            <div className="px-3 px-md-4 mt-4">
              <h5 className="mb-2">
                Product Description
              </h5>

              <textarea
                placeholder="Write Content Here.."
                name="description"
                id="description"
                rows="5"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="form-control p-2 border-danger-subtle border-2"
                style={{
                  maxWidth: "400px",
                  resize: "vertical",
                }}
              ></textarea>
            </div>

            {/* ==============================
                CATEGORY / SUBCATEGORY
                PRICE / STOCK
            ============================== */}
            <div
              className="mt-4 px-3 px-md-4 w-100"
              style={{
                maxWidth: "750px",
              }}
            >
              <div className="row g-3">
                {/* PRODUCT CATEGORY */}
                <div className="col-12 col-md-6">
                  <label
                    className="form-label fs-5"
                    htmlFor="category"
                  >
                    Product Category
                  </label>

                  <select
                    id="category"
                    className="form-select form-select-lg"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                  >
                    <option value="Men">
                      Men
                    </option>

                    <option value="Women">
                      Women
                    </option>

                    <option value="Kids">
                      Kids
                    </option>
                  </select>
                </div>

                {/* SUB CATEGORY */}
                <div className="col-12 col-md-6">
                  <label
                    className="form-label fs-5"
                    htmlFor="subCategory"
                  >
                    Sub Category
                  </label>

                  <select
                    id="subCategory"
                    className="form-select form-select-lg"
                    value={subCategory}
                    onChange={(e) =>
                      setSubCategory(e.target.value)
                    }
                  >
                    <option value="Topwear">
                      Topwear
                    </option>

                    <option value="Bottomwear">
                      Bottomwear
                    </option>

                    <option value="Footwear">
                      Footwear
                    </option>
                  </select>
                </div>

                {/* PRODUCT PRICE */}
                <div className="col-12 col-md-6">
                  <label
                    className="form-label fs-5"
                    htmlFor="price"
                  >
                    Product Price
                  </label>

                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="0"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value)
                    }
                    className="form-control form-control-lg"
                  />
                </div>

                {/* PRODUCT STOCK */}
                <div className="col-12 col-md-6">
                  <label
                    className="form-label fs-5"
                    htmlFor="stock"
                  >
                    Product Stock
                  </label>

                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    placeholder="0"
                    min="0"
                    value={stock}
                    onChange={(e) =>
                      setStock(e.target.value)
                    }
                    className="form-control form-control-lg"
                  />
                </div>
              </div>
            </div>

            {/* ==============================
                PRODUCT SIZES
            ============================== */}
            <div className="mt-4 px-3 px-md-4">
              <label className="form-label fs-5 d-block mb-2">
                Product Sizes
              </label>

              <div className="d-flex flex-wrap gap-2">
                {[
                  "S",
                  "M",
                  "L",
                  "XL",
                  "XXL",
                ].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() =>
                      handleSize(size)
                    }
                    className={`btn rounded-0 px-3 px-md-4 py-2 ${
                      sizes.includes(size)
                        ? "btn-dark"
                        : "btn-light border"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ==============================
                BESTSELLER
            ============================== */}
            <div className="form-check mt-4 px-3 px-md-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="bestseller"
                checked={bestseller}
                onChange={(e) =>
                  setBestseller(
                    e.target.checked
                  )
                }
              />

              <label
                className="form-check-label fs-5"
                htmlFor="bestseller"
              >
                Add to bestseller
              </label>
            </div>

            {/* ==============================
                SUCCESS MESSAGE
            ============================== */}
            {message && (
              <div className="px-3 px-md-4">
                <div className="alert alert-success mt-4">
                  {message}
                </div>
              </div>
            )}

            {/* ==============================
                ERROR MESSAGE
            ============================== */}
            {error && (
              <div className="px-3 px-md-4">
                <div className="alert alert-danger mt-4">
                  {error}
                </div>
              </div>
            )}

            {/* ==============================
                ADD BUTTON
            ============================== */}
            <div className="px-3 px-md-4 pb-5">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-dark rounded-0 mt-4 px-5 py-3"
              >
                {loading
                  ? "ADDING..."
                  : "ADD"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;