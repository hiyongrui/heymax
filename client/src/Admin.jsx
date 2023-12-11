import { Link, useNavigate } from "react-router-dom";
import { Fab, Box, Typography, Card, CardContent, CardActions, Button } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useEffect, useState } from "react";
import { red } from "@mui/material/colors";

const Admin = () => {
  const navigate = useNavigate();
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

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/deleteProduct/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEdit = (id) => {
    navigate(`/updateProduct/${id}`);
  };

  return (
    <Box>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          All products below
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((product) => (
            <Card key={product.productID} sx={{ minWidth: 275, margin: 2 }}>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {product.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${product.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleEdit(product.productID)}>
                  Edit
                </Button>
                <Button size="small" sx={{ color: red[500] }} onClick={() => handleDelete(product.productID)}>
                  Delete
                </Button>
              </CardActions>
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
