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

    const calculateTotal = ()=>{
        return locDetails.reduce((total, loc)=>{
            const parseNumber = (value:string)=>{
                const cleanVal = value.replace(/[^0-9.]/g, '');
                return parseFloat(cleanVal) || 0;
            }
            total.potentialRev += parseNumber(loc.potentialRev || '0');
            total.competitorVolume += parseNumber(loc.competitorVolume || '0');
            total.competitorMerchant += parseNumber(loc.competitorMerchant || '0');
            total.revenue_Acc += parseNumber(loc.revenue_Acc || '0');
            total.marketShare += parseNumber(loc.marketShare || '0');
            total.commercialDDa += parseNumber(loc.commercialDDa || '0');
            return total;
        },{potentialRev:0, commercialDDa:0,competitorVolume:0,competitorMerchant:0,revenue_Acc:0,marketShare:0}
    )
    } 

    const total = calculateTotal();
    const locationInPage = locDetails.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage)


    return(
        <Box>
            <Box>
            <TableContainer component={Paper}>
            <Table>
            <TableHead>
            <TableRow sx={{backgroundColor:'lightgray'}}>
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
            <TableHead>
                <TableRow sx={{backgroundColor:'lightgray'}}>
                    <TableCell sx={{fontWeight:'bold'}}>US</TableCell>
                    <TableCell>${total.potentialRev.toFixed(2)}(100%)</TableCell>
                    <TableCell>${total.competitorVolume.toFixed(2)}(100%)</TableCell>
                    <TableCell>{total.competitorMerchant.toFixed(0)}</TableCell>
                    <TableCell>${total.revenue_Acc.toFixed(1)}</TableCell>
                    <TableCell>{total.marketShare.toFixed(2)}%</TableCell>
                    <TableCell>{total.commercialDDa.toFixed(1)}</TableCell>
                    <TableCell></TableCell>
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