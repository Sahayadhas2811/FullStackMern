import { Box, Table, TablePagination, TableCell, TableRow, TableHead, TableBody, TableContainer, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../axios/Axios";

interface BranchData {
    branchName: string;
    locaitonId: string;
    potentialRev: string;
    competitorVolume: string;
    competitorMerchant: string;
    revenue_Acc: string;
    marketShare: string;
    commercialDDa: string;
};

const TableDataBranch : React.FC = ()=>{
    const [branchDetails, setBranchDetails] = useState<BranchData[]>([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(()=>{
        const fetchBranch = async()=>{
            const response  = await axiosPrivate.get('/branch/getAllBranch');
            console.log("response", response);
            setBranchDetails(response.data.data)
        };
        fetchBranch();
    },[]);

    const handlePageChange = (event:any, newPage:number)=>{
        setPage(newPage)
    };

    const handleRowsPerChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setRowsPerPage(+event.target.value);
        setPage(0)
    };

    const branchInPage = branchDetails.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage)


    return(
        <Box>
            <Box>
            <TableContainer component={Paper}>
            <Table>
            <TableHead>
            <TableRow>
                <TableCell>Branch</TableCell>
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
                {branchInPage.map(br =>(
                    <TableRow key={br.locaitonId}>
                        <TableCell>{br.branchName}</TableCell>
                        <TableCell>{br.potentialRev}</TableCell>
                        <TableCell>{br.competitorVolume}</TableCell>
                        <TableCell>{br.competitorMerchant}</TableCell>
                        <TableCell>{br.revenue_Acc}</TableCell>
                        <TableCell>{br.marketShare}</TableCell>
                        <TableCell>{br.commercialDDa}</TableCell>
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
            count={branchDetails.length}
            ></TablePagination>
            </TableContainer>
            </Box>
        </Box>
    )
}

export default TableDataBranch