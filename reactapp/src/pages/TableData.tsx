import { Box,  Button, Table, TablePagination, TableCell, TableRow, TableHead, TableBody, TableContainer, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../axios/Axios";
import {toast} from 'react-toastify'

interface LocationData {
    locaitonName: string;
    locaitonId: string;
    potentialRev: string;
    competitorVolume: string;
    competitorMerchant: string;
    revenue_Acc: string;
    marketShare: string;
    commercialDDa: string;
};

const TableData : React.FC = ()=>{
    const [locDetails, setLocDetails] = useState<LocationData[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(()=>{
        const fetchData = async()=>{
            const response  = await axiosPrivate.get('/getAllLocations');
            console.log("response", response);
            setLocDetails(response.data.data)
        };
        fetchData();
    },[]);

    const handledelete = async (locationId: string) => {
        try {
            await axiosPrivate.delete(`/deleteFinanceData/?locationId=${locationId}`);
            setLocDetails(locDetails.filter(data => data.locaitonId !== locationId));
            toast.success("Location deleted successfully");
        } catch (error) {
            toast.error("Failed to delete location");
        }
    };

    const handlePageChange = (event:any, newPage:number)=>{
        setPage(newPage)
    };

    const handleRowsPerChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setRowsPerPage(+event.target.value);
        setPage(0)
    };

    const locationInPage = locDetails.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage)


    return(
        <Box>
            <Box>
            <TableContainer component={Paper}>
            <Table>
            <TableHead>
            <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Potential Revenue Annualized</TableCell>
                <TableCell>Competitor Processing Volume</TableCell>
                <TableCell>Competitor Merchant</TableCell>
                <TableCell>Revenue Account</TableCell>
                <TableCell>Market Share</TableCell>
                <TableCell>Commercial DDA's</TableCell>
                <TableCell>Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {locationInPage.map(loc =>(
                    <TableRow key={loc.locaitonId}>
                        <TableCell>{loc.locaitonName}</TableCell>
                        <TableCell>{loc.potentialRev}</TableCell>
                        <TableCell>{loc.competitorVolume}</TableCell>
                        <TableCell>{loc.competitorMerchant}</TableCell>
                        <TableCell>{loc.revenue_Acc}</TableCell>
                        <TableCell>{loc.marketShare}</TableCell>
                        <TableCell>{loc.commercialDDa}</TableCell>
                        <TableCell>
                            <Button
                            variant = "outlined"
                            onClick={()=> handledelete(loc.locaitonId)}
                            >
                                X
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
            <TablePagination
            component={'div'}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerChange}
            count={locDetails.length}
            ></TablePagination>
            </TableContainer>
            </Box>
        </Box>
    )
}

export default TableData