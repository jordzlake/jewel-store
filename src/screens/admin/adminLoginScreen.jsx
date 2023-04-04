import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../Redux/Actions/UserActions";
import Toast from "../../components/Toast";
import AdminHeader from "../../components/admin/AdminHeader";

const AdminLogin = () => {
  window.scrollTo(0, 0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      console.log("Logged On: ", userInfo);
      navigate("/admin/");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Username", username);
    console.log("Password", password);
    dispatch(login(username, password));
  };
  return (
    <div>
      <AdminHeader />
      <Toast />
      <div className="login-container">
        <div
          className="card shadow mx-auto"
          style={{ maxWidth: "380px", marginTop: "100px" }}
        >
          <div className="card-body">
            <h3 className="card-title mb-4 text-center">
              Jewel Admin Portal Login
            </h3>
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-4 text-center">
                <button type="submit" className="jewel-admin-btn jewel-rounded">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
