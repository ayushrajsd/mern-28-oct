import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../api/users";

function Register() {
  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await RegisterUser(values); //{success:true,message:"User created successfully"}
      if (response.success) {
        // success
        message.success(response.message);

        console.log(response.message);
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
        <h1>Register to BookMyShow</h1>
        <section className="mw-500 text-center px-3">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              htmlFor="name"
              name="name"
              className="d-block"
              rules={[{ required: true, message: "Please enter your Name" }]}
            >
              <Input id="name" type="text" placeholder="Enter your name" />
            </Form.Item>
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
                Register
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              Already a user? <Link to="/login">Login here</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Register;
