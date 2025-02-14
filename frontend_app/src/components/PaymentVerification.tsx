import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { setLoading, setOpenSnackbar } = useAppContext();

  const verifyPayment = () => {
    try {
      setLoading(false);
      setOpenSnackbar(true);
      navigate("/orders");
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Something went wrong");
      navigate("/");
    }
  };

  verifyPayment();
  return <div>Verifying Payment...</div>;
}
