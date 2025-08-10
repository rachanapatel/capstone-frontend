import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Pagetitles from "../../Pagetitles";
import { useState, useEffect } from 'react';
import AddPositionDialog from './AddPositionDialog'
import axios from "axios";


const Form = ({ user }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [positions, setPositions] = useState([]);
  const [showAddPosition, setShowAddPosition] = useState(false);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/team/positions/", {
          headers: {
            "X-Company-ID": user.company,
          },
        });
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions();
  }, [user.company]);

  const handleFormSubmit = async (values) => {
    console.log("Submitting position ID:", values.position);
    try {
      const response = await axios.post("http://localhost:8000/team/employees/", {
        name: values.firstName + values.lastName,
        contact: values.email,
        position: values.position,
        company: user.company,
      });
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box m="20px">
      <Pagetitles title="CREATE EMPLOYEE" subtitle="Create a New Employee Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Position Dropdown */}
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                <InputLabel id="position-label">Position</InputLabel>
                <Select
                  labelId="position-label"
                  name="position"
                  value={values.position}
                  onChange={(e) => {
                    if (e.target.value === "__add_new__") {
                      setShowAddPosition(true);
                    } else {
                      setFieldValue("position", e.target.value);
                    }
                  }}
                  onBlur={handleBlur}
                  error={!!touched.position && !!errors.position}
                >
                  {positions.map((pos) => (
                    <MenuItem key={pos.id} value={pos.id}>
                      {pos.title}
                    </MenuItem>
                  ))}
                  <MenuItem value="__add_new__" style={{ fontStyle: "italic", color: "#777" }}>
                    ➕ Add New Position
                  </MenuItem>
                </Select>
                {touched.position && errors.position && (
                  <FormHelperText error>{errors.position}</FormHelperText>
                )}
              </FormControl>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Employee
              </Button>
            </Box>

            {/* Add Position Modal */}
            {showAddPosition && (
              <AddPositionDialog
                user={user}
                onClose={() => setShowAddPosition(false)}
                onPositionCreated={(newPosition) => {
                  setPositions((prev) => [...prev, newPosition]);
                  setFieldValue("position", newPosition.id);
                  setShowAddPosition(false);
                }}
              />
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email"),
  position: yup.string().required("Required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  position: "",
};

export default Form;