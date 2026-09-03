import { useState } from "react";
import AdminNavbar from "../../Layout/AdminNavbar.jsx";
import Sidebar from "../../Layout/Sidebar.jsx";
import upload_area from "../../../../assets/back/upload_area.png";
import { createProduct } from "../../../services/productServices";

const AddProduct = () => {
  // Image states (4 images)
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  // UI states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Toggle size selection
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image1 || !image2 || !image3) {
      setMessage("Please upload at least 3 images (main + 2 others)");
      return;
    }

    if (!name || !description || !price) {
      setMessage("Please fill name, description and price");
      return;
    }

    if (sizes.length === 0) {
      setMessage("Please select at least one size");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("size", JSON.stringify(sizes)); // backend expects array
      formData.append("bestseller", bestseller);

      // Main image
      formData.append("image1", image1);

      // Other images
      formData.append("image2", image2);
      formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const res = await createProduct(formData);

      if (res.data.success) {
        setMessage("Product added successfully!");
        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setSizes([]);
        setBestseller(false);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        setMessage(res.data.message || "Failed to add product");
      }
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Server error. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminNavbar />

      <div className="row g-0">
        {/* SIDEBAR */}
        <div className="col-3 col-sm-3 col-md-3 col-lg-2">
          <Sidebar />
        </div>

        {/* ADD PRODUCT CONTENT */}
        <div className="col-9 col-sm-9 col-md-9 col-lg-10 border-start border-3">
          <form onSubmit={handleSubmit} className="p-3 p-md-4">
            <h5>Upload Images</h5>

            <div className="d-flex gap-2 gap-md-3 flex-wrap mb-4">
              {/* IMAGE 1 (Main) */}
              <label style={{ cursor: "pointer" }}>
                <img
                  src={image1 ? URL.createObjectURL(image1) : upload_area}
                  alt="Upload"
                  className="img-fluid"
                  style={{
                    height: "100px",
                    width: "100px",
                    objectFit: "cover",
                    borderStyle: "dotted",
                    borderWidth: "1.5px",
                    borderColor: "#d1d5db",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage1(e.target.files[0])}
                />
              </label>

              {/* IMAGE 2 */}
              <label style={{ cursor: "pointer" }}>
                <img
                  src={image2 ? URL.createObjectURL(image2) : upload_area}
                  alt="Upload"
                  className="img-fluid"
                  style={{
                    height: "100px",
                    width: "100px",
                    objectFit: "cover",
                    borderStyle: "dotted",
                    borderWidth: "1.5px",
                    borderColor: "#ccc4be",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage2(e.target.files[0])}
                />
              </label>

              {/* IMAGE 3 */}
              <label style={{ cursor: "pointer" }}>
                <img
                  src={image3 ? URL.createObjectURL(image3) : upload_area}
                  alt="Upload"
                  className="img-fluid"
                  style={{
                    height: "100px",
                    width: "100px",
                    objectFit: "cover",
                    borderStyle: "dotted",
                    borderWidth: "1.5px",
                    borderColor: "#ccc4be",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage3(e.target.files[0])}
                />
              </label>

              {/* IMAGE 4 */}
              <label style={{ cursor: "pointer" }}>
                <img
                  src={image4 ? URL.createObjectURL(image4) : upload_area}
                  alt="Upload"
                  className="img-fluid"
                  style={{
                    height: "100px",
                    width: "100px",
                    objectFit: "cover",
                    borderStyle: "dotted",
                    borderWidth: "1.5px",
                    borderColor: "#ccc4be",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage4(e.target.files[0])}
                />
              </label>
            </div>

            {/* Product Name */}
            <div className="mb-3">
              <h5>Product Name</h5>
              <input
                type="text"
                placeholder="Type here..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 rounded border border-2"
                style={{ width: "400px", maxWidth: "100%" }}
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <h5>Product description</h5>
              <textarea
                placeholder="Write content here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                className="p-2 rounded border border-2"
                style={{ width: "400px", maxWidth: "100%" }}
              ></textarea>
            </div>

            <div className="row g-3" style={{ maxWidth: "700px" }}>
              {/* Category */}
              <div className="col-12 col-md-4">
                <label className="form-label fs-5">Product category</label>
                <select
                  className="form-select form-select-lg"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              {/* Sub Category */}
              <div className="col-12 col-md-4">
                <label className="form-label fs-5">Sub category</label>
                <select
                  className="form-select form-select-lg"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Footwear">Footwear</option>
                </select>
              </div>

              {/* Price */}
              <div className="col-12 col-md-4">
                <label className="form-label fs-5">Product Price</label>
                <input
                  type="number"
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control form-control-lg"
                />
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-4">
              <label className="form-label fs-5 d-block">Product Sizes</label>
              <div className="d-flex flex-wrap gap-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`btn rounded-0 px-4 py-2 ${
                      sizes.includes(size) ? "btn-dark" : "btn-light"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Bestseller */}
            <div className="form-check mt-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="bestseller"
                checked={bestseller}
                onChange={(e) => setBestseller(e.target.checked)}
              />
              <label className="form-check-label fs-5" htmlFor="bestseller">
                Add to bestseller
              </label>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`mt-3 alert ${
                  message.includes("success") ? "alert-success" : "alert-danger"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-dark rounded-0 mt-4 px-5 py-3"
              disabled={loading}
            >
              {loading ? "Adding..." : "ADD"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
