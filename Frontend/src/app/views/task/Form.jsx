/* eslint-disable react-hooks/exhaustive-deps */
import { Box, styled, CircularProgress, Grid, Select, MenuItem, FormControl, InputLabel, TextField, Dialog,
  DialogActions,
  DialogTitle,
  Button,
 } from '@mui/material';

import SimpleCard from 'app/components/SimpleCard';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTask, createTask, updateTask, deleteTask } from 'app/redux/actions/';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px',
  },
  '.circleProgress': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
}));

const CmsLogbookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [httploading, setHttploading] = useState(false);
  const [httpdeleteloading, setHttpdeleteloading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    status: 'Pending',
    priority: '1',
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    description: Yup.string().required('description is required!'),
    status: Yup.string().required('status is required!'),
    priority: Yup.string().required('priority is required!'),
  });

  async function fetchData() {
    try {
      if (id !== 'new') {
        setLoading(true);
        const data = await getTask(`id=${id}`);
        const initialData = data.data.data[0];
        setInitialValues({
          name: initialData.name,
          description: initialData.description,
          status: initialData.status,
          priority: initialData.priority,
        })
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, [id])

  const showToast = (msg) => {
    toast.configure();
      toast(msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        type: 'success'
      });
  }

  const handleFormSubmit = async (values) => {
    try {
      
      setHttploading(true);
      const res = id !== 'new' ? await updateTask(id, values) : await createTask(values);
      showToast(res.data.message);
      setHttploading(false);
      navigate('/task');
    } catch (e) {
      setHttploading(false);
    }
  };

  const deleteFn = async (values, dialog) => {
    if (dialog) { 
      setDialogOpen(true);
    } else {
      setHttpdeleteloading(true);
      const res =  await deleteTask(id);
      showToast(res.data.message);
      setHttpdeleteloading(false);
      navigate('/task');

    }
  }

  const handleClose = () => {
    setDialogOpen(false);
  };




  return (
    <Container>
      <SimpleCard title={`${id !== 'new' ? `Edit/Remove` : 'New'}`}>
      {loading ? <Box className="circleProgress"><CircularProgress /></Box>:
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Grid container spacing={3}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Grid container spacing={3}>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                      <FormControl fullWidth>
                        <TextField 
                          label="Name"
                          value={values.name}
                          onChange={handleChange}
                          placeholder="Name"
                          name="name"             
                          helpertext={touched.name && errors.name}
                          error={Boolean(errors.name && touched.name)}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <FormControl fullWidth>
                        <TextField              
                          label="Description"
                          multiline
                          rows={7}
                          value={values.description}
                          onChange={handleChange}
                          placeholder="Description"
                          name="description" 
                          helpertext={touched.description && errors.description}
                          error={Boolean(errors.description && touched.description)}            
                        />
                      </FormControl>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={values.status}
                        label="Status"
                        onChange={handleChange}
                        name="status"             
                        helpertext={touched.status && errors.status}
                        error={Boolean(errors.status && touched.status)}
                      >
                        <MenuItem value='Done'>Done</MenuItem>
                        <MenuItem value='Pending'>Pending</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Priority</InputLabel>
                      <Select
                        value={values.priority}
                        label="Priority"
                        onChange={handleChange}
                        name="priority"             
                        helpertext={touched.priority && errors.priority}
                        error={Boolean(errors.priority && touched.priority)}
                      >
                        <MenuItem value='1'>High</MenuItem>
                        <MenuItem value='2'>Low</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  </Grid>
                </Grid>
                
              </Grid>    

              <Grid container spacing={3} sx={{mt: 1}}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <LoadingButton
                    type="submit"
                    color="primary"
                    loading={httploading}
                    variant="contained"
                    sx={{ mr: 2 }}
                  >
                    {id !== 'new' ?  'Edit' : 'Add'}
                  </LoadingButton>

                  { id !== 'new' ? <LoadingButton
                    type="button"
                    color="error"
                    loading={httpdeleteloading}
                    variant="contained"
                    onClick={() => deleteFn(values, true)}
                    sx={{ my: 2 }}
                  >
                    Remove
                  </LoadingButton> : <></> }

                  <Dialog
                    open={dialogOpen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you sure want to delete?"}
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose}>No</Button>
                      <Button onClick={() => deleteFn(values, false)} autoFocus>
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                  
                </Grid>

              </Grid>
            </form>
          )}
        </Formik>
        
      }
      </SimpleCard>
    </Container>
  );
};

export default CmsLogbookForm;
