import { axiosInstance } from ".";

export const RegisterUser = async (values) => {
  try {
    const response = await axiosInstance.post("api/users/register", values);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const LoginUser = async (values) => {
  try {
    const response = await axiosInstance.post("api/users/login", values);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("api/users/get-current-user");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const ForgetPassword = async (value) => {
  try {
    const response = await axiosInstance.patch(
      "api/users/forgetpassword",
      value
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const ResetPassword = async (value, id) => {
  try {
    const response = await axiosInstance.patch(
      `api/users/resetpassword/${id}`,
      value
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
