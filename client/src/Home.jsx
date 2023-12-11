import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();

  const goToThisUser = (user) => {
    localStorage.setItem("userData", JSON.stringify(user));
    if (user.role == "User") {
      navigate("/user");
    } else {
      navigate("/admin");
    }
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []); //run once only

  const fetchUsers = () => {
    fetch("http://localhost:8000/getAllUser")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ p: 3 }}>
        <Box textAlign="center">
          <Typography variant="h3" gutterBottom>
            Welcome to My Website
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", "& button": { m: 1 } }}>
          {users.map((user) => {
            return user.role == "User" ? (
              <Button key={user.userID} variant="outlined" onClick={() => goToThisUser(user)} sx={{ backgroundColor: "#FFFFFF", color: "#e37512", border: 1, borderColor: "#e37512", ":hover": { bgcolor: "#e37512", color: "white" } }}>
                {user.role} {user.email}
              </Button>
            ) : (
              <Button key={user.userID} variant="contained" onClick={() => goToThisUser(user)} sx={{ backgroundColor: "#e37512", ":hover": { bgcolor: "#FFFFFF", color: "#525ffb" } }}>
                {user.role} {user.email}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
