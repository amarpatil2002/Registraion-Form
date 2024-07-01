import React, { useEffect } from "react";
import axios from "axios";
import UserData from "../../Component/UserData";

function Home() {
  axios.defaults.withCredentials = true;

  useEffect(() => {
    tokenFun();
  }, []);

  const tokenFun = async () => {
    try {
      const response = await axios.get("http://localhost:5000/home");
      console.log(response);
      if (response.data !== "Login successfully") {
        // navigate("/login");
      }
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <div>
      <UserData />
    </div>
  );
}

export default Home;
