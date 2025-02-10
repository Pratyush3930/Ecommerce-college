import { useAppContext } from "../context/AppContext";
import { Paper, Typography, Button, Divider } from "@mui/material";

const Checkout = () => {
  const { cart } = useAppContext();

  // Calculate the total price
  const totalPrice = cart.reduce((total, item) => total + item.total_price, 0);
  const discount = 0; // Discount is set to 0 as per your request
  const shippingCost = 20; // Shipping cost of $20
  const finalPrice = totalPrice - discount + shippingCost;

  return (
    <Paper
      sx={{
        padding: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        boxShadow: 3,
      }}
    >
      <div className="mb-2 w-full">
        <div className="flex flex-col gap-3 w-full">
          <Typography className="text-gray-500 text-sm">
            Subtotal: ${totalPrice.toFixed(2)}
          </Typography>
          <Typography className="text-gray-500 text-sm">
            Discount: -${discount.toFixed(2)}
          </Typography>
          <Typography className="text-gray-500 text-sm">
            Shipping Cost: ${shippingCost.toFixed(2)}
          </Typography>
        </div>

        <Divider sx={{ my: 1 }} />
        <Typography variant="h6" fontWeight="bold" mt={2}>
          Total: ${finalPrice.toFixed(2)}
        </Typography>
      </div>
      <Button
        variant="contained"
        color="primary"
        className="mt-1 px-4 py-4 w-full"
      >
        Proceed to Checkout
      </Button>
    </Paper>
  );
};

export default Checkout;
