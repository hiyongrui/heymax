import { Container, Typography, TextField, Button, Card, CardContent, CardActions } from "@mui/material";
import { useEffect, useState } from "react";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const fetchCart = () => {
    let cartData = JSON.parse(localStorage.getItem("cartData")) ?? [];
    console.log("cart data", cartData);
    setProducts(cartData);
  };

  const handleDelete = (id) => {
    console.log("hanlde delete", id);
    let cartData = JSON.parse(localStorage.getItem("cartData")) ?? [];
    const updatedCart = cartData.filter((product) => product.productID !== id);
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
    setProducts(updatedCart);
  };

  const handlePlaceOrder = () => {
    let cartData = JSON.parse(localStorage.getItem("cartData")) ?? [];
    console.log("cart data...", JSON.stringify(cartData));
    //for each product in cart data
    let totalPrice = 0;
    cartData.forEach(product => {
        console.log("produict...", product);
        totalPrice += product.price * product.quantity;
    })
    console.log("total price...", totalPrice);
    let userID = JSON.parse(localStorage.getItem("userData")).userID;
    let order = {totalPrice: totalPrice, id: userID, address: address};
    console.log("order...", order);
    fetch("http://localhost:8000/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("cartData", JSON.stringify([]));
        setProducts([]);
        navigate("/user");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      {/* Product List */}
      {products.map((product) => (
        <Card key={product.productID} sx={{ margin: 2 }}>
          <CardContent>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body1">${product.price}</Typography>
            <Typography variant="body1">Quantity: {product.quantity}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" sx={{ color: red[500] }} onClick={() => handleDelete(product.productID)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* Shipping Address */}
      <Typography variant="h6" gutterBottom style={{ marginTop: "50px" }}>
        Shipping Address
      </Typography>
      <TextField label="Address" value={address} fullWidth margin="normal" onChange={handleAddressChange}/>

      {/* Place Order Button */}
      <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </Container>
  );
};

export default Checkout;
