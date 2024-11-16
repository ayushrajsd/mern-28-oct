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
