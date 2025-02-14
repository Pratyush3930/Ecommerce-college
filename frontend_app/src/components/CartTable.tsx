import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartProduct } from "../types";
import { useAppContext } from "../context/AppContext";

interface CartTableProps {
    cart: CartProduct[];
}

const CartTable: React.FC<CartTableProps> = ({cart}) => {

    const { handleCartChange, handleCartItemDelete } = useAppContext();
    
  return (
      <TableContainer component={Paper}>
          <h2 className="text-2xl font-medium mb-4 ml-4">Your Cart</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.product_id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:5140${item.product.imagePath}`}
                      alt=""
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span>{item.product.productName}</span>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="flex items-center justify-center gap-2">
                    <IconButton color="primary" onClick={() => handleCartChange(item.product_id,item.product.price, item.quantity - 1)}>
                      <RemoveIcon />
                    </IconButton>
                    <span>{item.quantity}</span>
                    <IconButton color="primary" onClick={() => handleCartChange(item.product_id,item.product.price, item.quantity + 1)}>
                      <AddIcon />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell align="right">${item.total_price}</TableCell>
                <TableCell align="center">
                  <IconButton color="error" onClick={() => handleCartItemDelete(item.cart_id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default CartTable;
