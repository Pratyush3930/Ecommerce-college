import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "white", // Label color
          },
          "& label.Mui-focused": {
            color: "white", // Label color when focused
          },
          "& .MuiOutlinedInput-root": {
            color: "white", // Text color
            "& fieldset": {
              borderColor: "white", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "#ccc", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "white", // Border color when focused
            },
          },
          "& input": {
            color: "white", // Input text color
          },
        },
      },
    },
  },
});

export default function BasicTextFields() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Search" variant="outlined" />
        {/* <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" /> */}
      </Box>
    </ThemeProvider>
  );
}
