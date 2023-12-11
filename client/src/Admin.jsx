import { Link } from "react-router-dom";
import { Fab, Box, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useEffect, useState } from "react";

const Admin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []); //run once only

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/getAllProduct");
      console.log("repsonse", response);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        All products below
      </Typography>

      {/* <ProductList /> */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>

      <Link to="/">
        <Fab color="primary" variant="extended" sx={{ position: "fixed", top: 36, right: 50, backgroundColor: "#e37512", color: "#FFFFFF", border: 1, borderColor: "#e37512", ":hover": { bgcolor: "#FFFFFF", color: "#525ffb" } }}>
          <CreateIcon sx={{ mr: 1 }} />
          Go to home
        </Fab>
      </Link>
    </Box>
  );
};

export default Admin;
