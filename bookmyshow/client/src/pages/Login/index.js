import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/users";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values); //{success:true,message:"User created successfully"}
      if (response.success) {
        // success
        message.success(response.message);
        console.log(response.message);
        localStorage.setItem("token", response.data);
        navigate("/");
      } else {
        // error
        message.error(response.message);
        console.log(response.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <main className="App-header">
        <h1>Login to BookMyShow</h1>
        <section className="mw-500 text-center px-3">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[
                { required: true, message: "Please enter your Email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input id="email" type="text" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              New user? <Link to="/register">Register here</Link>
            </p>
            <p>
              Forgot Password ? <Link to="/forget">Cick Here</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
