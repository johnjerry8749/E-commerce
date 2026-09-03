import { useState } from "react";
import AdminNavbar from "../../Layout/AdminNavbar.jsx";
import Sidebar from "../../Layout/Sidebar.jsx";
import upload_area from "../../../../assets/back/upload_area.png";
import { createProduct } from "../../../services/productServices";

const AddProduct = () => {
  const [mainImage, setMainImage] = useState(null);
  const [otherImages, setOtherImages] = useState([null, null, null]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleOtherImage = (index, file) => {
    const newImages = [...otherImages];
    newImages[index] = file;
    setOtherImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mainImage) {
      setMessage("Please upload the main image");
      return;
    }

    const validOtherImages = otherImages.filter((img) => img !== null);
    if (validOtherImages.length < 2) {
      setMessage("Please upload at least 2 other images");
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
      formData.append("size", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);

      // Correct field names that backend expects
      formData.append("mainImage", mainImage);

      validOtherImages.forEach((img) => {
        formData.append("otherImages", img);
      });

      const res = await createProduct(formData);

      if (res.data.success) {
        setMessage("Product added successfully!");
        // Reset
        setName("");
        setDescription("");
        setPrice("");
        setSizes([]);
        setBestseller(false);
        setMainImage(null);
        setOtherImages([null, null, null]);
      } else {
        setMessage(res.data.message || "Failed to add product");
      }
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Server error. Check console."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminNavbar />

      <div className="row g-0">
        <div className="col-3 col-sm-3 col-md-3 col-lg-2">
          <Sidebar />
        </div>

        <div className="col-9 col-sm-9 col-md-9 col-lg-10 border-start border-3">
          <form onSubmit={handleSubmit} className="p-3 p-md-4">
            <h5>Upload Images</h5>

            <div className="d-flex gap-2 gap-md-3 flex-wrap mb-4">
              {/* MAIN IMAGE */}
              <label style={{ cursor: "pointer" }}>
                <img
                  src={mainImage ? URL.createObjectURL(mainImage) : upload_area}
                  alt="Main"
                  className="img-fluid"
                  style={{
                    height: "100px",
                    width: "100px",
                    objectFit: "cover",
                    borderStyle: "dotted",
                    borderWidth: "1.5px",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden onChange={(e) => setMainImage(e.target.files[0])}
                />
              </label>

              {/* OTHER IMAGES */}
              {[0, 1, 2].map((index) => (
                <label key={index} style={{ cursor: "pointer" }}>
                  <img
                    src={
                      otherImages[index]
                        ? URL.createObjectURL(otherImages[index])
                        : upload_area
                    }
                    alt={`Other ${index + 1}`}
                    className="img-fluid"
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                      borderStyle: "dotted",
                      borderWidth: "1.5px",
                    }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleOtherImage(index, e.target.files[0])
                    }
                  />
                </label>
              ))}
            </div>

            {/* Product Name */}
            <div className="mb-3">
              <h5>Product Name</h5>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 rounded border border-2"
                style={{ width: "400px", maxWidth: "100%" }}
                placeholder="Type here..."
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <h5>Product description</h5>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                className="p-2 rounded border border-2"
                style={{ width: "400px", maxWidth: "100%" }}
                placeholder="Write content here..."
              ></textarea>
            </div>

            <div className="row g-3" style={{ maxWidth: "700px" }}>
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

              <div className="col-12 col-md-4">
                <label className="form-label fs-5">Product Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control form-control-lg"
                  placeholder="0"
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
                    onClick={() => toggleSize(size)}className={`btn rounded-0 px-4 py-2 ${
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

            {message && (
              <div
                className={`mt-3 alert ${
                  message.includes("success")
                    ? "alert-success"
                    : "alert-danger"
                }`}
              >
                {message}
              </div>
            )}

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