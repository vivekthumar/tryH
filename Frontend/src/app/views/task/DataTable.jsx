import moment from "moment";
import { Box, Button } from "@mui/material";
import { DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
 } from '@mui/x-data-grid';
import { cloneDeep } from "lodash";
import { useNavigate } from "react-router-dom";


const DataTable = ({data=[], height=300, filters, setFilters}) => {
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }
  const navigate = useNavigate();
  const handlePageChange = (page)=>{
    const filter = cloneDeep(filters);
    filter.offset = page * parseInt(filters.limit);
    filter.page = page;
    setFilters(filter);
  }

  const handleSortModelChange = (sorting)=>{
    const filter = cloneDeep(filters);
    filter.sort = `${sorting[0].field} ${sorting[0].sort}`;
    filter.sortField = sorting[0].field;
    filter.sortType = sorting[0].sort;
    filter.page = 0;
    filter.offset = 0;
    setFilters(filter);
  }

  const handlePageSizeChange = (pageSize) => {
    const filter = cloneDeep(filters);
    filter.page = 0;
    filter.offset = 0;
    filter.limit = pageSize;
    setFilters(filter);
  }
  let columns = [];
  const rows = [];

  columns = [
    { 
      field: '_id', 
      headerName: 'Action', 
      width: 100, 
      sortable: false,
      renderCell: (params) => {
        const redirect = (e) => {
          const currentRow = params.row;
          return navigate(`/task/${currentRow._id}`)
        };
        return (
          <>
          <Button color="primary" onClick={redirect}>Edit/Delete</Button>
          </>
        );
      },
    },
    { field: 'name', headerName: 'Name', width: 70, sortable: false, },
    
    { field: 'description', headerName: 'Description', width: 450, sortable: false, },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'priority', headerName: 'Priority', width: 70 },
    { field: 'createdAt', headerName: 'Date', width: 150 },
    
  ]

  for (let i = 0; i < data.data.length; i += 1) {
    const task = data.data[i];
    rows.push({ 
      id: i,
      _id: task['_id'],
      name: task['name'], 
      description: task['description'], 
      status: task['status'], 
      priority: task['priority'] === 1 ? 'High' : 'Normal', 
      createdAt: moment(task['createdAt']).format('YYYY-MM-DD'),
    })
  }
  

  return (
     
    <Box width="100%" overflow="auto">
      <div style={{ height, width: '100%' }}>
        <DataGrid 
          localeText={{
            toolbarExport: "Export",
          }}
          rows={rows} 
          columns={columns}  
          components={{
            Toolbar: CustomToolbar,
          }}
          disableSelectionOnClick
          rowCount={data.count}
          rowsPerPageOptions={[25, 50, 75, 100]}
          pagination
          page={filters.page}
          pageSize={parseInt(filters.limit)}
          paginationMode="server"
          onPageChange={(newPage) => handlePageChange(newPage)}
          onPageSizeChange={(pageSize) => handlePageSizeChange(pageSize)}
          sortingMode="server"
          sortingOrder={['asc', 'desc']}
          sortModel={[{
            field: filters.sortField,
            sort: filters.sortType,
          }]}
          onSortModelChange={ (sorting) => handleSortModelChange(sorting)}
        />
      </div>
    </Box>
  );
};

export default DataTable;
