import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
  }, []); //run once only

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getProduct/${id}`);
      console.log("repsonse", response);
      const data = await response.json();
      console.log("data", data);
        setName(data[0].name);
        setPrice(data[0].price);
        setDescription(data[0].description);
        setQuantity(data[0].quantity);
    } catch (error) {
      console.log(error);
    }
  };

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
    // fetch put to update whole product
    fetch(`http://localhost:8000/updateProduct/${id}`, {
      method: "PUT",
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
        <h2>Update Product details</h2>
        <TextField label="Name" value={name} onChange={handleNameChange} />
        <br />
        <TextField label="Price" type="number" value={price} onChange={handlePriceChange} />
        <br />
        <TextField label="Quantity" type="number" value={quantity} onChange={handleQuantityChange} />
        <br />
        <TextField label="Description" value={description} onChange={handleDescriptionChange} multiline rows={4} />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Update Product
        </Button>
      </Box>
    </form>
  );
};

export default UpdateProduct;
