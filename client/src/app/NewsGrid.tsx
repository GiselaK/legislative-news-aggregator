import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Box, Button, Typography } from '@mui/material';

const NewsGrid = () => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Sample row data
  const rows = [
    { 
        description: "Uncertainty around the economy, state spending, the Los Angeles wildfires and the Trump administration could still change the state’s budget picture by the May budget revision",
        id: 1,
        state: "CA",
        topic: "California Budget",
        published_date: "01/13/2025",
        title: "Newsom's $322B budget proposes some new spending in light of modest surplus"
    }
  ];

  // Columns for the DataGrid
  const columns = [
    { field: 'title', headerName: 'Title', width: 400, wrapText: true },
    { field: 'description', headerName: 'Description', width: 400, wrapText: true },
    { field: 'state', headerName: 'State', width: 100 },
    { field: 'topic', headerName: 'Topic', width: 200 },
    { field: 'published_date', headerName: 'Published Date', width: 150 }
  ];

  // Handle opening the modal with row details when a row is clicked
  const handleRowClick = (params) => {
    setSelectedRow(params.row);  // Set the clicked row's data
    setOpen(true);  // Open the modal
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      {/* DataGrid with onRowClick event */}
      <DataGrid 
        rows={rows} 
        columns={columns} 
        getRowHeight={() => 'auto'}
        // pageSize={5} 
        onRowClick={handleRowClick}  // Trigger the modal when a row is clicked
      />

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
