import AdminNavbar from "../../Layout/AdminNavbar.jsx";
import Sidebar from "../../Layout/Sidebar.jsx";
import upload_area from "../../../../assets/back/upload_area.png";

const AddProduct = () => {
  return (
    <div className="">
      <AdminNavbar />

      <div className="row g-0">
        {/* SIDEBAR */}
        <div className="col-3 col-sm-3 col-md-3 col-lg-2 ">
          <Sidebar />
        </div>

        {/* ADD PRODUCT DASHBOARD CONTENT */}
        <div className="col-9 col-sm-9 col-md-9 col-lg-10 border-start  border-3">
          <div className="p-3 p-md-4">
            <h5 className="">Upload Images</h5>

            <div className="d-flex gap-2 gap-md-3 flex-wrap">
              {/* IMAGE 1 */}
              <label className="text-center" style={{ cursor: "pointer" }}>
                <img
                  src={upload_area}
                  alt="Upload"
                  className="img-fluid"
                  style={{
                    height: "100px",
                    borderStyle: "dotted",
                    borderWidth: "1.5px",
                    borderColor: "#d1d5db",
                    width: "100px",
                    objectFit: "cover",
                  }}
                />

                <input type="file" accept="image/*" hidden />
              </label>

              {/* IMAGE 2 */}
              <label className="text-center" style={{ cursor: "pointer" }}>
                <img
                  src={upload_area}
                  alt="Upload"
                  className="img-fluid"
                  style={{
                    height: "100px",
                    borderStyle: "dotted",
                    borderWidth: "1.5px",
                    borderColor: "#ccc4be",
                    width: "100px",
                    objectFit: "cover",
                  }}
                />

                <input type="file" accept="image/*" hidden />
              </label>

              {/* IMAGE 3 */}
              <label className="text-center" style={{ cursor: "pointer" }}>
                <img
                  src={upload_area}
                  alt="Upload"
                  className="img-fluid"
                  style={{
                    height: "100px",
                    borderStyle: "dotted",
                    borderWidth: "1.5px",
                    borderColor: "#ccc4be",
                    width: "100px",
                    objectFit: "cover",
                  }}
                />

                <input type="file" accept="image/*" hidden />
              </label>

              {/* IMAGE 4 */}
              <label className="text-center" style={{ cursor: "pointer" }}>
                <img
                  src={upload_area}
                  alt="Upload"
                  className="img-fluid"
                  style={{
                    height: "100px",
                    borderStyle: "dotted",
                    borderWidth: "1.5px",
                    borderColor: "#ccc4be",
                    width: "100px",
                    objectFit: "cover",
                  }}
                />

                <input type="file" accept="image/*" hidden />
              </label>
            </div>
          </div>

          <div className="row ps-4 m-auto">
            <h5 className="p-0">Product Name</h5>
            <input
              type="text"
              placeholder="Text Here.."
              name="productname"
              id="productname"
              className="p-1 rounded border border-danger-emphasis border-2"
              style={{ width: "400px" }}
            />
          </div>
          <div className="row ps-4 mt-4 m-auto">
            <h5 className="p-0">Product description</h5>
            <textarea
              placeholder="Write Content Here.."
              name="description"
              id="description"
              rows="5"
              className="p-2 rounded border border-danger-emphasis border-2"
              style={{ width: "400px" }}
            ></textarea>
          </div>
          <div className="mt-4 p-3 w-100" style={{ maxWidth: "700px" }}>
            <div className="row g-3">
              {/* Product Category */}
              <div className="col-12 col-md-4">
                <label className="form-label fs-5">Product category</label>

                <select className="form-select form-select-lg">
                  <option>Men</option>
                  <option>Women</option>
                  <option>Kids</option>
                </select>
              </div>

              {/* Sub Category */}
              <div className="col-12 col-md-4">
                <label className="form-label fs-5">Sub category</label>

                <select className="form-select form-select-lg">
                  <option>Topwear</option>
                  <option>Bottomwear</option>
                  <option>Footwear</option>
                </select>
              </div>

              {/* Product Price */}
              <div className="col-12 col-md-4">
                <label className="form-label fs-5">Product Price</label>

                <input
                  type="number"
                  placeholder="0"
                  className="form-control form-control-lg"
                />
              </div>
            </div>

            {/* Product Sizes */}
            <div className="mt-4">
              <label className="form-label fs-5 d-block">Product Sizes</label>

              <div className="d-flex flex-wrap gap-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    className="btn btn-light rounded-0 px-4 py-2"
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
              />

              <label className="form-check-label fs-5" htmlFor="bestseller">
                Add to bestseller
              </label>
            </div>

            {/* Add Button */}
            <button
              type="button"
              className="btn btn-dark rounded-0 mt-4 px-5 py-3"
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
