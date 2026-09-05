import { useEffect, useState } from "react";
import AdminNavbar from "../../Layout/AdminNavbar";
import Sidebar from "../../Layout/Sidebar";

import { getAllUsers, sendNewsletter } from "../../../services/userServices";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // =========================
  // GET ALL USERS
  // =========================
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getAllUsers();

      setUsers(data?.users || data || []);
    } catch (error) {
      console.error("Error fetching users:", error);

      alert(error.response?.data?.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // SELECT ONE USER
  // =========================
  const handleSelectUser = (id) => {
    setSelectedUsers((prev) => {
      if (prev.includes(id)) {
        return prev.filter((userId) => userId !== id);
      }

      return [...prev, id];
    });
  };

  // =========================
  // SELECT ALL USERS
  // =========================
  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
      return;
    }

    setSelectedUsers(users.map((user) => user.id));
  };

  // =========================
  // SEND NEWSLETTER
  // =========================
  const handleSendNewsletter = async (e) => {
    e.preventDefault();

    if (selectedUsers.length === 0) {
      alert("Please select at least one user.");
      return;
    }

    if (!subject.trim()) {
      alert("Please enter an email subject.");
      return;
    }

    if (!message.trim()) {
      alert("Please enter your message.");
      return;
    }

    try {
      setSending(true);

      await sendNewsletter({
        userIds: selectedUsers,
        subject: subject.trim(),
        message: message.trim(),
      });

      alert("Newsletter sent successfully!");

      // Clear form
      setSelectedUsers([]);
      setSubject("");
      setMessage("");

      // Close Bootstrap modal
      const modalElement = document.getElementById("newsletterModal");

      if (modalElement) {
        const modal = window.bootstrap.Modal.getInstance(modalElement);

        modal?.hide();
      }
    } catch (error) {
      console.error("Newsletter error:", error);

      alert(error.response?.data?.message || "Failed to send newsletter.");
    } finally {
      setSending(false);
    }
  };

  // =========================
  // SELECT ALL STATUS
  // =========================
  const allSelected = users.length > 0 && selectedUsers.length === users.length;

  return (
    <div>
      <AdminNavbar />

      <div className="row g-0">
        {/* =========================
            SIDEBAR
        ========================= */}
        <div className="col-3 col-sm-3 col-md-3 col-lg-2">
          <Sidebar />
        </div>

        {/* =========================
            CONTENT
        ========================= */}
        <div className="col-9 col-sm-9 col-md-9 col-lg-10 border-start border-3">
          <div className="container-fluid p-3 p-md-4">
            {/* =========================
                PAGE HEADER
            ========================= */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
              <div>
                <h3 className="mb-1">Users</h3>

                <p className="text-muted mb-0">
                  Manage your users and send newsletters.
                </p>
              </div>

              {/* =========================
                  SEND NEWSLETTER BUTTON
              ========================= */}
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#newsletterModal"
                disabled={selectedUsers.length === 0}
              >
                <i className="bi bi-envelope me-2"></i>
                Send Newsletter
                {selectedUsers.length > 0 && (
                  <span className="ms-1">({selectedUsers.length})</span>
                )}
              </button>
            </div>

            {/* =========================
                SELECTED USERS INFO
            ========================= */}
            <div className="mb-3">
              <span className="text-muted">Selected users:</span>

              <strong className="ms-2">{selectedUsers.length}</strong>

              <span className="text-muted"> of {users.length}</span>
            </div>

            {/* =========================
                USERS TABLE
            ========================= */}
            <div className="table-responsive border rounded">
              <table className="table table-hover align-middle mb-0">
                {/* TABLE HEADER */}
                <thead className="table-light">
                  <tr>
                    {/* SELECT ALL */}
                    <th style={{ width: "60px" }}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={allSelected}
                        onChange={handleSelectAll}
                      />
                    </th>

                    <th>#</th>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Role</th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {/* LOADING */}
                  {loading && (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        Loading users...
                      </td>
                    </tr>
                  )}

                  {/* NO USERS */}
                  {!loading && users.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No users found.
                      </td>
                    </tr>
                  )}

                  {/* USERS */}
                  {!loading &&
                    users.map((user, index) => {
                      const isSelected = selectedUsers.includes(user.id);

                      return (
                        <tr key={user.id}>
                          {/* CHECKBOX */}
                          <td>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={isSelected}
                              onChange={() => handleSelectUser(user.id)}
                            />
                          </td>

                          {/* NUMBER */}
                          <td>{index + 1}</td>

                          {/* NAME */}
                          <td>{user.name || user.username || "N/A"}</td>

                          {/* EMAIL */}
                          <td>{user.email}</td>

                          {/* ROLE */}
                          <td>
                            <span className="badge bg-secondary">
                              {user.role || "User"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          NEWSLETTER MODAL
      ================================================== */}
      <div
        className="modal fade"
        id="newsletterModal"
        tabIndex="-1"
        aria-labelledby="newsletterModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            {/* MODAL HEADER */}
            <div className="modal-header">
              <div>
                <h5 className="modal-title" id="newsletterModalLabel">
                  Send Newsletter
                </h5>

                <small className="text-muted">
                  Sending to <strong>{selectedUsers.length}</strong> selected
                  user
                  {selectedUsers.length === 1 ? "" : "s"}
                </small>
              </div>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* MODAL BODY */}
            <div className="modal-body">
              <form id="newsletterForm" onSubmit={handleSendNewsletter}>
                {/* SUBJECT */}
                <div className="mb-3">
                  <label className="form-label">Email Subject</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter email subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                {/* MESSAGE */}
                <div className="mb-3">
                  <label className="form-label">Message</label>

                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your newsletter..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </form>
            </div>

            {/* MODAL FOOTER */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                disabled={sending}
              >
                Cancel
              </button>

              <button
                type="submit"
                form="newsletterForm"
                className="btn btn-primary"
                disabled={sending || selectedUsers.length === 0}
              >
                {sending ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send me-2"></i>
                    Send Newsletter
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
