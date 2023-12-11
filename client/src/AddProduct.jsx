import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const product = { name, description, price, quantity };
    console.log(product);
    fetch("http://localhost:8000/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/admin");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box textAlign="center">
        <h2>Enter Product details</h2>
        <TextField label="Name" value={name} onChange={handleNameChange} />
        <br />
        <TextField label="Price" type="number" value={price} onChange={handlePriceChange} />
        <br />
        <TextField label="Quantity" type="number" value={quantity} onChange={handleQuantityChange} />
        <br />
        <TextField label="Description" value={description} onChange={handleDescriptionChange} multiline rows={4} />
        <br />

        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </Box>
    </form>
  );
};

export default AddProduct;
