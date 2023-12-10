/* eslint-disable react-hooks/exhaustive-deps */
import { Box, styled, CircularProgress} from '@mui/material';
import SimpleCard from 'app/components/SimpleCard';
import { getTask } from 'app/redux/actions';
import { useEffect, useState } from 'react';
import DataTable from "./DataTable";
import Filters from './Filters';
import 'react-toastify/dist/ReactToastify.css';


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

const Task = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    page: 0,
    offset: 0,
    limit: '25',
    sortField: 'createdAt',
    sortType: 'desc'
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const getData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters).toString()
      console.log('filters', params)
      const res = await getTask(params)
      setData(res.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [filters])

  return (
    <Container>
      <Filters setFilters={setFilters} filters={filters}/>

      <Box sx={{ py: '12px' }} />

      {data.count ? <SimpleCard title='Task'>
      {loading ? <Box className="circleProgress"><CircularProgress /></Box>:
        <DataTable data={data} height={500} setFilters={setFilters} filters={filters}/> }
      </SimpleCard> : <></>}
      

      <Box sx={{ py: '12px' }} />

    </Container>
  );
};

export default Task;
