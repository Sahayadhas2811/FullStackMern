import React, { useState } from "react";
import { Box, Select, MenuItem, Typography } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import TableData from "./pages/TableData";
import TableDataBranch from "./pages/TableDataBranch";
import TableFormData from "./pages/TableFormData";

const MainPage: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<string>("location");

  const handleTableChange = (event: SelectChangeEvent<string>) => {
    setSelectedTable(event.target.value);
  };

  return (
    <Box>
        <Box mb={5}>
            <TableFormData/>
        </Box>
      <Typography variant="h6" gutterBottom>
        Select Table View
      </Typography>
      <Select
        value={selectedTable}
        onChange={handleTableChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="location">Location Table</MenuItem>
        <MenuItem value="branch">Branch Table</MenuItem>
      </Select>

      <Box mt={4}>
        {selectedTable === "location" && <TableData />}
        {selectedTable === "branch" && <TableDataBranch />}
      </Box>
    </Box>
  );
};

export default MainPage;
