import { Link } from "react-router-dom";
import { Fab, Box } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

const Home = () => {
  return (
    <Box>
      <Link to="/admin">
        <Fab color="primary" variant="extended" sx={{ position: "fixed", top: 36, right: 50, backgroundColor: "#e37512", color: "#FFFFFF", border: 1, borderColor: "#e37512", ":hover": {bgcolor:"#FFFFFF", color:"#525ffb" }}}>
          <CreateIcon sx={{ mr: 1 }} />
          Admin page
        </Fab>
      </Link>
    </Box>
  );
};

export default Home;
