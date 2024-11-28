import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { GetCurrentUser } from "../api/users";
import { SetUser } from "../redux/userSlice";
import { message, Layout, Menu } from "antd";
import { ShowLoading, HideLoading } from "../redux/loaderSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Header, Content, Footer, Sider } = Layout;

  useEffect(() => {
    const getValidUser = async () => {
      try {
        dispatch(ShowLoading());
        const response = await GetCurrentUser();
        console.log("response", response);
        dispatch(HideLoading());
        dispatch(SetUser(response.data));
      } catch (err) {
        console.log(err);
        dispatch(HideLoading());
        message.error(err.message);
      }
    };
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      // message.error("Please login to continue");
      navigate("/login");
    }
  }, []);

  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
    },
    {
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                if (user.role == "admin") {
                  navigate("/admin");
                } else if (user.role == "partner") {
                  navigate("/partner");
                } else {
                  navigate("/profile");
                }
              }}
            >
              My Profile
            </span>
          ),
        },
        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Log out
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  return (
    user && (
      <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className=" text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems} />
          </Header>
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
}

export default ProtectedRoute;
