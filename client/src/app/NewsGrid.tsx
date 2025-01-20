import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Box, Button, Typography } from '@mui/material';

const NewsGrid = () => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Sample row data
  const rows = [
    { id: 1, name: 'John Doe', age: 30, job: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', age: 25, job: 'Graphic Designer' },
    { id: 3, name: 'Alice Johnson', age: 28, job: 'Product Manager' },
  ];

  // Columns for the DataGrid
  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'job', headerName: 'Job', width: 200 },
    {
      field: 'details',
      headerName: 'Details',
      sortable: false,
      renderCell: (params) => (
        <Button variant="contained" onClick={() => handleOpen(params.row)}>
          View Details
        </Button>
      ),
    },
  ];

  // Handle opening the modal with row details
  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />

      {/* Modal for displaying details */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 24,
            minWidth: 400,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Details for {selectedRow?.name}
          </Typography>
          <Typography variant="body1">
            <strong>Age:</strong> {selectedRow?.age}
          </Typography>
          <Typography variant="body1">
            <strong>Job:</strong> {selectedRow?.job}
          </Typography>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default NewsGrid;
