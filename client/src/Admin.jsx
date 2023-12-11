import { Link } from "react-router-dom";
import { Fab, Box, Typography, Card, CardContent } from "@mui/material";
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
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          All products below
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((product) => (
            <Card key={product.id} sx={{ minWidth: 275, margin: 2 }}>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${product.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Link to="/addProduct">
        <Fab
          color="primary"
          variant="extended"
          sx={{
            position: "fixed",
            top: 36,
            right: 50,
            backgroundColor: "#e37512",
            color: "#FFFFFF",
            border: 1,
            borderColor: "#e37512",
            ":hover": { bgcolor: "#FFFFFF", color: "#525ffb" },
          }}
        >
          <CreateIcon sx={{ mr: 1 }} />
          Create product
        </Fab>
      </Link>
    </Box>
  );
};

export default Admin;
