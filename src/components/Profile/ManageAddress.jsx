import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Stack,
  Box,
} from "@mui/material";
import { Delete, Edit, Home } from "@mui/icons-material";
import api from "../../interceptor/axios";
import EndPoint from "../../api/EndPoint";

export default function ManageAddress({ myAddresses, setIsChange }) {
  const [addresses, setAddresses] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({ recipientName: "", fullAddress: "" });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setAddresses(prev => myAddresses)
    

  }, [myAddresses])

  // Open Add Dialog
  const handleOpenAdd = () => {
    setIsEdit(false);
    setCurrentAddress({ recipientName: "", fullAddress: "" });
    setOpenDialog(true);
  };

  // Open Edit Dialog
  const handleOpenEdit = (addr) => {
    setIsEdit(true);
    setCurrentAddress(addr);
    setOpenDialog(true);
  };

  // Delete Address
  const handleDelete = async(id) => {
   try{
     if(confirm("Are you sure you want to remove this address ?")){
       await api.post(EndPoint.REMOVE_ADDRESS+`/${id}`)
     setIsChange(prev => !prev)
    }
   }catch(err){
      console.log(err);
      
    }
  };

  // Save New or Updated Address
  const handleSave = async () => {
    try {
      if (!currentAddress.recipientName.trim() || !currentAddress.fullAddress.trim()) return;

      if (isEdit) {
         const updatedAddress = {
          ...currentAddress
        };

        await api.post(EndPoint.UPDATE_ADDRESS, updatedAddress)

      } else {
        const newAddress = {
          ...currentAddress,
        };

        await api.post(EndPoint.ADD_ADDRESS, newAddress)

      }
      setIsChange(prev => !prev)
      setOpenDialog(false);
      setCurrentAddress({ recipientName: "", fullAddress: "" });
    }
    catch (err) {
      console.log(err);

    }
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Manage Your Addresses
      </Typography>

      <Grid container spacing={2}>
        {addresses.map((addr) => (
          <Grid className="w-100" item xs={12} md={6} key={addr.id}>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Home fontSize="large" color="primary" />
                <Box flexGrow={1}>
                  <Typography className="text-secondary" variant="subtitle1" fontWeight="bold">
                    {addr.recipientName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {addr.fullAddress}
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => handleOpenEdit(addr)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(addr._id)}>
                    <Delete color="error" />
                  </IconButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleOpenAdd}>
        Add New Address
      </Button>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{isEdit ? "Edit Address" : "Add New Address"}</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Recipient Name"
            value={currentAddress.recipientName}
            onChange={(e) => setCurrentAddress({ ...currentAddress, recipientName: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Full Address"
            multiline
            rows={4}
            value={currentAddress.fullAddress}
            onChange={(e) => setCurrentAddress({ ...currentAddress, fullAddress: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {isEdit ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
