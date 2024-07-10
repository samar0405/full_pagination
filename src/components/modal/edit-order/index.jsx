import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { order, service } from "@service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const validationSchema = Yup.object({
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .positive("Amount must be a positive number"),
  client_id: Yup.string().required("Client ID is required"),
  id: Yup.string().required("ID is required"),
  service_id: Yup.string().required("Service ID is required"),
  status: Yup.string().required("Status is required"),
});

const Index = ({ open, handleClose, item }) => {
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);

  const initialValues = {
    amount: item?.amount || "",
    client_full_name: item?.client_name || "",
    client_phone_number: item?.client_phone_number || "",
    client_id: item?.client_id || "",
    id: item?.id || "",
    service_id: item?.service_id || "",
    status: item?.status || "",
  };

  const getClients = async () => {
    try {
      const response = await order.get();
      if (response.status === 200 && response?.data?.orders_list) {
        setClients(response.data.orders_list);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getServices = async () => {
    try {
      const response = await service.get();
      if (response.status === 200 && response?.data?.services) {
        setServices(response.data.services);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClients();
    getServices();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      if (item) {
        response = await order.update({ ...item, ...values });
        if (response.status === 200) {
          toast.success("Order updated successfully!");
        }
      
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the order.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            {item ? "Edit Order" : "Create Order"}
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              touched,
              errors,
              handleBlur,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form id="submit" className="mt-6 space-y-4">
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amount}
                  type="number"
                  id="amount"
                  required
                  error={touched.amount && Boolean(errors.amount)}
                  helperText={touched.amount && errors.amount}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Client full name"
                  name="client_full_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.client_full_name}
                  type="text"
                  id="client_full_name"
                  required
                  error={
                    touched.client_full_name && Boolean(errors.client_full_name)
                  }
                  helperText={
                    touched.client_full_name && errors.client_full_name
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Client phone number"
                  name="client_phone_number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.client_phone_number}
                  type="text"
                  id="client_phone_number"
                  required
                  error={
                    touched.client_phone_number &&
                    Boolean(errors.client_phone_number)
                  }
                  helperText={
                    touched.client_phone_number && errors.client_phone_number
                  }
                  margin="normal"
                />
                <Select
                  fullWidth
                  label="Client ID"
                  name="client_id"
                  onChange={(e) => setFieldValue("client_id", e.target.value)}
                  onBlur={handleBlur}
                  value={values.client_id}
                  id="client_id"
                  required
                  error={touched.client_id && Boolean(errors.client_id)}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <em>Client</em>;
                    }
                    const selectedItem = clients.find(
                      (client) => client.id === selected
                    );
                    return selectedItem ? selectedItem.name : selected;
                  }}
                >
                  <MenuItem disabled value="">
                    <em>Client</em>
                  </MenuItem>
                  {clients.map((client, index) => (
                    <MenuItem value={client.id} key={index}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  fullWidth
                  label="Id"
                  name="id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.id}
                  type="text"
                  id="id"
                  required
                  error={touched.id && Boolean(errors.id)}
                  helperText={touched.id && errors.id}
                  margin="normal"
                />
                <Select
                  fullWidth
                  label="Service ID"
                  name="service_id"
                  onChange={(e) => setFieldValue("service_id", e.target.value)}
                  onBlur={handleBlur}
                  value={values.service_id}
                  id="service_id"
                  required
                  error={touched.service_id && Boolean(errors.service_id)}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <em>Service</em>;
                    }
                    const selectedItem = services.find(
                      (service) => service.id === selected
                    );
                    return selectedItem ? selectedItem.name : selected;
                  }}
                >
                  <MenuItem disabled value="">
                    <em>Service</em>
                  </MenuItem>
                  {services.map((service, index) => (
                    <MenuItem value={service.id} key={index}>
                      {service.name}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  fullWidth
                  label="Status"
                  name="status"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.status}
                  type="text"
                  id="status"
                  required
                  error={touched.status && Boolean(errors.status)}
                  helperText={touched.status && errors.status}
                  margin="normal"
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="secondary"
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting" : "Save"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Index;
