import React, { useEffect, useMemo, useState } from "react";
import { FaEnvelope, FaLocationDot, FaPhone, FaUserGroup, FaUserShield } from "react-icons/fa6";
import { getUsers } from "../../services/userService";
import "./AllUser.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await getUsers();
        setUsers(response.user || []);
      } catch {
        setErrorMessage("Failed to load users. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    if (!normalizedSearch) {
      return users;
    }

    return users.filter((user) =>
      [
        user.fullName,
        user.username,
        user.email,
        user.phone,
        user.role,
        user.location?.city,
        user.location?.country,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch))
    );
  }, [searchText, users]);

  const verifiedUsers = users.filter((user) => user.isVerified).length;
  const activeUsers = users.filter((user) => user.isActive).length;

  return (
    <div className="user-directory container py-5">
      <section className="user-directory__hero">
        <h1>User Directory</h1>
        <p>
          Browse registered users with cleaner operational detail, faster scanning, and fields that match the real profile model.
        </p>
        <div className="user-directory__toolbar row g-3 align-items-end">
          <div className="col-lg-6">
            <label className="form-label fw-semibold">Search users</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search by name, username, email, role, city..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="row g-4 my-2">
        <div className="col-md-4">
          <div className="user-stat">
            <span>Total Users</span>
            <strong>{users.length}</strong>
          </div>
        </div>
        <div className="col-md-4">
          <div className="user-stat">
            <span>Active Users</span>
            <strong>{activeUsers}</strong>
          </div>
        </div>
        <div className="col-md-4">
          <div className="user-stat">
            <span>Verified Users</span>
            <strong>{verifiedUsers}</strong>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="user-directory__empty">Loading users...</div>
      ) : errorMessage ? (
        <div className="user-directory__empty">{errorMessage}</div>
      ) : filteredUsers.length === 0 ? (
        <div className="user-directory__empty">No users matched your search.</div>
      ) : (
        <div className="row g-4 mt-1">
          {filteredUsers.map((user) => (
            <div className="col-md-6 col-xl-4" key={user._id}>
              <article className="user-card">
                <div className="user-card__cover" />
                <div className="user-card__body">
                  <img
                    src={user.profileImage}
                    alt={user.fullName}
                    className="user-card__avatar"
                  />
                  <h2 className="user-card__name">{user.fullName}</h2>
                  <div className="user-card__username">@{user.username}</div>

                  <div className="user-card__chips">
                    <span className="user-chip user-chip--role">
                      <FaUserShield className="me-2" />
                      {user.role}
                    </span>
                    <span
                      className={`user-chip ${
                        user.isActive ? "user-chip--active" : "user-chip--inactive"
                      }`}
                    >
                      <FaUserGroup className="me-2" />
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                    {user.isVerified && (
                      <span className="user-chip user-chip--verified">Verified</span>
                    )}
                  </div>

                  <div className="user-card__grid">
                    <div className="user-card__field">
                      <span>
                        <FaEnvelope className="me-2" />
                        Email
                      </span>
                      <div>{user.email}</div>
                    </div>

                    <div className="user-card__field">
                      <span>
                        <FaPhone className="me-2" />
                        Phone
                      </span>
                      <div>{user.phone || "Not provided"}</div>
                    </div>

                    <div className="user-card__field">
                      <span>
                        <FaLocationDot className="me-2" />
                        Location
                      </span>
                      <div>
                        {[
                          user.location?.address,
                          user.location?.city,
                          user.location?.state,
                          user.location?.country,
                        ]
                          .filter(Boolean)
                          .join(", ") || "No location added"}
                      </div>
                    </div>

                    <div className="user-card__field">
                      <span>Joined</span>
                      <div>{new Date(user.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
