import { Link, useNavigate } from "react-router-dom";
import { Fab, Box, Typography, Card, CardContent, CardActions, Button, TextField, Snackbar, Alert } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useEffect, useState } from "react";
import { red } from "@mui/material/colors";

const User = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

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

  const handleAddToCart = (id, maxQuantity, price, name) => {
    console.log("adding to cart product id..", id);

    let cartData = JSON.parse(localStorage.getItem("cartData")) ?? [];
    let product = cartData.find((product) => product.productID === id);

    if (product) {
      if (product.quantity >= maxQuantity) {
        console.log("no more adding to cart, show max message");
        setOpen(true);

        return;
      } else {
        product.quantity += 1;
      }
    } else {
      cartData.push({ productID: id, quantity: 1, price: price, name: name });
    }

    localStorage.setItem("cartData", JSON.stringify(cartData));
    console.log("cart data ending", cartData);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          All products below
        </Typography>


        {/* List of Product for User */}
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
                <Button size="small" color="primary" onClick={() => handleAddToCart(product.productID, product.quantity, product.price, product.name)}>
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>

      <Link to="/checkout">
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
          <ShoppingCartCheckoutIcon sx={{ mr: 1 }} />
          Check out
        </Fab>
      </Link>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert onClose={handleClose} severity="error">
          This item have no more to checkout!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default User;
