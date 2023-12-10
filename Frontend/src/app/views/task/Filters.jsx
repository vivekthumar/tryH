/* eslint-disable react-hooks/exhaustive-deps */
import { 
  Icon, 
  Grid, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  TextField,
  Link,
 } from "@mui/material";
import SimpleCard from 'app/components/SimpleCard';
import { Span } from "app/components/Typography";
import { useState } from 'react';
import { cloneDeep } from "lodash";


const Filters = ({filters, setFilters}) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  const updateFilter = () => {
    const filter = cloneDeep(filters);
    filter.search = search;
    filter.status = status;
    filter.priority = priority;
    filter.page = 0;
    filter.offset = 0;
    setFilters(filter);
  }

  const submit = () => {
    updateFilter();
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  return (
    <SimpleCard title="Filters" >
      <Grid container spacing={3}>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <FormControl fullWidth>
            <TextField              
              label="Search (Name/Description)"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search (Name/Description)"
            />
          </FormControl>
        </Grid>

        <Grid item lg={3} md={3} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value='Done'>Done</MenuItem>
              <MenuItem value='Pending'>Pending</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item lg={3} md={3} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={handlePriorityChange}
            >
              <MenuItem value='1'>High</MenuItem>
              <MenuItem value='2'>Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>

      </Grid>
      
      <Grid container spacing={3} sx={{mt: 1}}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Button  sx={{ m: 1 }} color="primary" variant="contained" type="button" onClick={submit}>
              <Icon>send</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
          </Button>

          <Link href={`/task/new`}>
            <Button sx={{ m: 1 }} color="primary" variant="contained" type="button">
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add New</Span>
            </Button>
          </Link>
        </Grid>

      </Grid>
  </SimpleCard>
    
  );
};

export default Filters;
