import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import { axiosPrivate } from '../axios/Axios';
import { toast } from "react-toastify";
import { Formik, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import TableFormBranchData from './TableFormBranchData';

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

const initialValue: LocationData = {
    locaitonName: '',
    locaitonId: '',
    potentialRev: '',
    competitorVolume: '',
    competitorMerchant: '',
    revenue_Acc: '',
    marketShare: '',
    commercialDDa: ''
};

const TableFormData: React.FC = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [showBranchForm, setShowBranchForm] = useState<boolean>(false);

    const onSubmit = async (value: LocationData, {resetForm}:FormikHelpers<LocationData>) => {
        setIsLoading(true);
        try {
            const postData = await axiosPrivate.post('/FinanceData', value);
            setIsLoading(false);
            console.log("Posted Data", postData);
            toast.success(postData.data.message);
            resetForm()
        } catch (error) {
            setIsLoading(false);
            toast.error('Failed to update, Try again later');
        }
    };

    const calculateRevenueAcc = (potentialRev: string, competitorMerchant: string): string => {
        const revenue = parseFloat(potentialRev.replace(/,/g, ''));
        const merchant = parseFloat(competitorMerchant.replace(/,/g, ''));
        if (!isNaN(revenue) && !isNaN(merchant) && merchant !== 0) {
            return (revenue / merchant).toFixed(0); 
        }
        return '';
    };

    return (
        <Box>
            <Box display={'grid'}>
                <Formik
                    initialValues={initialValue}
                    onSubmit={onSubmit}
                >
                    {({ values, handleBlur, handleChange, setFieldValue }) => (
                        <Form>
                            <Box width={'100%'}>
                                <Grid container spacing={4}>
                                    <Grid item xs={4} lg={3}>
                                        <Typography sx={{ mb: 1 }}>Location</Typography>
                                        <TextField
                                            name='locaitonName'
                                            value={values.locaitonName}
                                            label={'Location Name'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            margin='dense'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={4} lg={3}>
                                        <Typography sx={{ mb: 1 }}>Location ID</Typography>
                                        <TextField
                                            name='locaitonId'
                                            value={values.locaitonId}
                                            label={'Location ID'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            margin='dense'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={4} lg={3}>
                                        <Typography sx={{ mb: 1 }}>Potential Revenue</Typography>
                                        <TextField
                                            name='potentialRev'
                                            value={values.potentialRev}
                                            label={'Potential Revenue'}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setFieldValue('revenue_Acc', calculateRevenueAcc(e.target.value, values.competitorMerchant));
                                            }}
                                            onBlur={handleBlur}
                                            margin='dense'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={4} lg={3}>
                                        <Typography sx={{ mb: 1 }}>Competitor Volume</Typography>
                                        <TextField
                                            name='competitorVolume'
                                            value={values.competitorVolume}
                                            label={'Competitor Volume'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            margin='dense'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={4} lg={3}>
                                        <Typography sx={{ mb: 1 }}>Competitor Merchant</Typography>
                                        <TextField
                                            name='competitorMerchant'
                                            value={values.competitorMerchant}
                                            label={'Competitor Merchant'}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setFieldValue('revenue_Acc', calculateRevenueAcc(values.potentialRev, e.target.value));
                                            }}
                                            onBlur={handleBlur}
                                            margin='dense'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={4} lg={3}>
                                        <Typography sx={{ mb: 1 }}>Revenue/Account</Typography>
                                        <TextField
                                            name='revenue_Acc'
                                            value={values.revenue_Acc}
                                            label={'Revenue/Account'}
                                            margin='dense'
                                            fullWidth
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={4} lg={3}>
                                        <Typography sx={{ mb: 1 }}>Market Share</Typography>
                                        <TextField
                                            name='marketShare'
                                            value={values.marketShare}
                                            label={'Market Share'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            margin='dense'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={4} lg={3}>
                                        <Typography sx={{ mb: 1 }}>Commercial DDA</Typography>
                                        <TextField
                                            name='commercialDDa'
                                            value={values.commercialDDa}
                                            label={'Commercial DDA'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            margin='dense'
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Box mt ={2}>
                                    <Button
                                    type='submit'
                                    variant='contained'                                    >
                                        {isLoading? 'Adding':'Add'}
                                    </Button>
                                    <Button
                                    type="button"
                                    variant="outlined"
                                    sx={{ml:2}}
                                    onClick={() => setShowBranchForm(!showBranchForm)}
                                    >
                                    {showBranchForm ? "Hide Branch" : "Add Branch"}
                                    </Button>
                                </Box>
                            </Box>
                            {showBranchForm && (
                            <Box mt={4}>
                            <Typography variant="h6" mb={2}>
                            Add Branch Details
                            </Typography>
                            <TableFormBranchData />
                            </Box>
                            )}
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default TableFormData;
