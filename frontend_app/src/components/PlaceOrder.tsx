import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface PlaceOrderProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export default function PlaceOrder({ setOpen, open }: PlaceOrderProps) {
  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const navigate = useNavigate();
  console.log(paymentMethod);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!shippingDetails.address || !shippingDetails.phone) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:5140/api/order/${paymentMethod}/1`,
        shippingDetails
      );
      console.log(res.data);
      if (res.data.payment_url) {
        // Redirect the user to the Khalti payment page
        window.location.href = res.data.payment_url;
      }
      setOpen(false);
      navigate("/verify-payment");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" textAlign="center" mb={2}>
            Place Your Order
          </Typography>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            margin="dense"
          />
          <TextField
            label="Shipping Address"
            name="address"
            variant="outlined"
            fullWidth
            margin="dense"
            value={shippingDetails.address}
            onChange={handleChange}
          />
          <TextField
            label="Phone Number"
            name="phone"
            variant="outlined"
            fullWidth
            margin="dense"
            value={shippingDetails.phone}
            onChange={handleChange}
          />

          {/* Payment Method Selection */}
          <FormLabel component="legend" sx={{ mt: 2 }}>
            Payment Method
          </FormLabel>
          <RadioGroup
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery (COD)" />
            <FormControlLabel value="khalti" control={<Radio />} label="Khalti (Online Payment)" />
          </RadioGroup>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Submit Order
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
