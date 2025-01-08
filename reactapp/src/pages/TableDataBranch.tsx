import { Box, Table, TablePagination, TableCell, TableRow, TableHead, TableBody, TableContainer, Paper, Button } from "@mui/material";
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

    const handleDelete = async(locaitonId:string)=>{
        try {
            await axiosPrivate.delete(`/branch/deleteBranchData?locaitonId=${locaitonId}`)
        setBranchDetails(branchDetails.filter(data => data.locaitonId !== locaitonId)); 
        } catch (error:any) {
            return {message:error.message}
        }
    }

    const handlePageChange = (event:any, newPage:number)=>{
        setPage(newPage)
    };

    const handleRowsPerChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setRowsPerPage(+event.target.value);
        setPage(0)
    };

    const calculateTotal = () => {
        const parseNumber = (value: string): number => {
          const clearVal = value.replace(/[^0-9.]/g, '');
          return parseFloat(clearVal) || 0;
        };
    
        return branchDetails.reduce(
          (total, br) => {
            total.potentialRev += parseNumber(br.potentialRev || '0');
            total.competitorVolume += parseNumber(br.competitorVolume || '0');
            total.competitorMerchant += parseNumber(br.competitorMerchant || '0');
            total.revenue_Acc += parseNumber(br.revenue_Acc || '0');
            total.marketShare += parseNumber(br.marketShare || '0');
            total.commercialDDa += parseNumber(br.commercialDDa || '0');
            return total;
          },
          {
            potentialRev: 0,
            competitorVolume: 0,
            competitorMerchant: 0,
            revenue_Acc: 0,
            marketShare: 0,
            commercialDDa: 0,
          }
        );
      };
    
      const total = calculateTotal();
    const branchInPage = branchDetails.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage)


    return(
        <Box>
            <Box>
            <TableContainer component={Paper}>
            <Table>
            <TableHead>
            <TableRow sx={{backgroundColor:'lightgray'}}>
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
            <TableHead>
                <TableRow sx={{backgroundColor:'lightgray'}}>
                    <TableCell sx={{fontWeight:'bold'}}>Branch Name</TableCell>
                    <TableCell>{total.potentialRev.toFixed(0)}</TableCell>
                    <TableCell>{total.competitorVolume.toFixed(0)}</TableCell>
                    <TableCell>{total.competitorMerchant.toFixed(0)}</TableCell>
                    <TableCell>{total.revenue_Acc.toFixed(0)}</TableCell>
                    <TableCell>{total.marketShare.toFixed()}%</TableCell>
                    <TableCell>{total.commercialDDa.toFixed(0)}</TableCell>
                    <TableCell></TableCell>
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
                        <TableCell>
                            <Button
                            variant="outlined"
                            onClick={()=>handleDelete(br.locaitonId)}
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
            count={branchDetails.length}
            ></TablePagination>
            </TableContainer>
            </Box>
        </Box>
    )
}

export default TableDataBranch