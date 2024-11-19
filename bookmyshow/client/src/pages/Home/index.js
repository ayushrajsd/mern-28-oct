import React, { useEffect } from "react";
import { GetCurrentUser } from "../../api/users";

function Home() {
  useEffect(() => {
    console.log("hime page use effect");
    const fetchUser = async () => {
      const response = await GetCurrentUser();
      console.log(response);
    };
    fetchUser();
  });
  return <div>Home</div>;
}

export default Home;
