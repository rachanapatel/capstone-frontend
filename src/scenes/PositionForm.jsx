import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Pagetitles from "../Pagetitles";
import axios from "axios";
import { useEffect } from 'react';

const PositionForm = ({ user }) => {

  useEffect(() => {
    console.log("PositionForm user:", user);
  }, [user]);
  
  const isNonMobile = useMediaQuery("(min-width:600px)");


  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8000/team/positions/', 
        {
          title: values.position, 
          company: user.company,
        });
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    } 
  };  

  return (
    <Box m="20px">
      <Pagetitles title="CREATE POSITION" subtitle="Create a New Position" />

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
          isSubmitting,
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
                label="Position"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.position}
                name="position"
                error={!!touched.position && !!errors.position}
                helperText={touched.position && errors.position}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              {/* <Button type="submit" color="secondary" variant="contained">
                Create New Position
              </Button> */}

              <Button
              type="submit"
              color="secondary"
              variant="contained"
              disabled={isSubmitting}> 
              {isSubmitting ? 'Creating Position...' : 'Create New Position'}
              </Button>


            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  position: yup.string().required("required"),
});
const initialValues = {
  position: "",
};

export default PositionForm;