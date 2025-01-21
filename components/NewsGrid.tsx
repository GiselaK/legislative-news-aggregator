import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Box, Button, Typography } from '@mui/material';

interface Article {
    description: string;
    published_date: string;
    state: string;
    topic: string;
    title: string;
  }

interface NewsGridProps {
    articles: Article[]
}

const NewsGrid = ({articles}: NewsGridProps) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Article | null>(null);


  // Sample row data

  // Columns for the DataGrid
  const columns = [
    { field: 'title', headerName: 'Title', width: 400, wrapText: true },
    { field: 'description', headerName: 'Description', width: 400, wrapText: true },
    { field: 'state', headerName: 'State', width: 100 },
    { field: 'topic', headerName: 'Topic', width: 200 },
    { field: 'publishedAt', headerName: 'Published Date', width: 150 }
  ];

  // Handle opening the modal with row details when a row is clicked
  const handleRowClick = (event: { row: Article }) => {
    setSelectedRow(event.row);  // Set the clicked row's data
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
        rows={articles} 
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
          {/* TODO: Use for Article Details  */}
          {/* <Typography variant="h6" component="h2" gutterBottom>
            Details for {selectedRow?.name}
          </Typography>
          <Typography variant="body1">
            <strong>Age:</strong> {selectedRow?.age}
          </Typography>
          <Typography variant="body1">
            <strong>Job:</strong> {selectedRow?.job}
          </Typography> */}
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
