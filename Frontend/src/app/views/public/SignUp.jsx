import { LoadingButton } from '@mui/lab';
import { Card, Grid, TextField, Button } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userLogin } from 'app/redux/actions';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const Root = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital login credentials
const initialValues = {
  name: '',
  email: '',
  password: '',
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().required('email is required!'),
  name: Yup.string().required('name is required!'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await userLogin(values);
      navigate('/');
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Root>
      <Card className="card">
        <Grid container>
          <Grid item sm={12} xs={12}>
            <ContentBox>
            <h2>Signup</h2>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="name"
                      label="Name"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.name}
                      onChange={handleChange}
                      helperText={touched.name && errors.name}
                      error={Boolean(errors.name && touched.name)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Signup
                    </LoadingButton>

                  </form>
                )}
              </Formik>

              <Button
                color="primary"
                variant="contained"
                sx={{ textTransform: 'capitalize' }}
                onClick={() => navigate('/signin')}
              >
                Login User
              </Button>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </Root>
  );
};

export default SignUp;
