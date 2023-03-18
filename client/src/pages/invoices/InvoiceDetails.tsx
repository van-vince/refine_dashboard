import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { useNavigate, useParams } from "react-router-dom";
import { Delete, Email, Phone, Edit, Place} from "@mui/icons-material";
import { Show, Breadcrumb } from "@refinedev/mui";

import {
    Box,
    Typography,
    FormControl,
    FormHelperText,
    TextField,
    TextareaAutosize,
    Stack,
    Select,
    MenuItem,
    Button,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Input,
} from "@mui/material";

import { CustomButton } from "components";

const InvoiceDetails = () => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true
    });
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    const { id } = useParams();

    const { data, isLoading, isError } = queryResult;

    const invoiceDetail = data?.data ?? [];
    //console.log(invoiceDetail)
    
    const handleDeleteInvoice = () => {
        // eslint-disable-next-line no-restricted-globals
        const response = confirm(
            "Are you sure you want to delete this invoice?",
        );
        if (response) {
            mutate(
                {
                    resource: "invoices",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/dashboard/invoices");
                    },
                },
            );
        }
    };

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;




    return (
        <Show resource="invoices" isLoading={isLoading}
        breadcrumb={
            <div style={{ padding: "3px 6px", border: "1px solid dark", }}>
                <Breadcrumb />
            </div>
        }
        wrapperProps={{
            style: {backgroundColor: "#f5f5f5",padding: "16px",
            },
        }}
        >
          <Box>
            <Box mt={2.5} p={10} borderRadius="15px" padding="20px" bgcolor="#fcfcfc" width='70%' ml={20}>
                    <Typography fontSize={25} fontWeight={700} color="#11142d" textAlign='center'>
                        Invoice Data
                    </Typography>
                    
                    {/* Add company info */}
                    <Box display='flex' flexDirection={{xs:"column", sm:'row'}} mt='10px'  justifyContent='space-between'>
                        <Stack style={{ flexDirection:'column', gap:'5px'}} >
                        <Typography>
                          {invoiceDetail.companyDetails[0].name}
                        </Typography>
                        <Typography>
                         {invoiceDetail.companyDetails[0].location}
                        </Typography>
                        <Typography>
                          {invoiceDetail.companyDetails[0].contact}
                        </Typography>
                        </Stack>

                        <Stack >
                        <Typography fontSize={50} fontWeight={900} color="info" 
                        textAlign='center' m={5} > 
                            Invoice 
                        </Typography>
                        </Stack>
                    </Box>

                    {/* Add customer info */}
                    <Box display='flex' flexDirection={{xs:"column", sm:'row'}} mt='20px'  justifyContent='space-between'>
                        <Stack style={{ flexDirection:'column', gap:'5px'}} >
                        <Typography>
                         {invoiceDetail.customerDetails[0].name}
                        </Typography>
                        <Typography>
                          {invoiceDetail.customerDetails[0].location}
                        </Typography>
                        <Typography>
                         {invoiceDetail.customerDetails[0].contact}
                        </Typography>
                        </Stack>

                        <Stack>
                        <Typography fontSize={16} fontWeight={500} color="info" textAlign='center' mt={5}  mr={5}> 
                            {invoiceDetail.createdAt}
                        </Typography>
                        <Typography fontSize={20} fontWeight={500} color="info" textAlign='center' mr={5}> 
                            Invoice No.
                        </Typography>
                        </Stack>
                    </Box>
                    
                    {/* Warehouse info */}
                    <Box sx={{alignItems: 'end'}}>
                        <Typography>
                        {invoiceDetail.category}
                        </Typography>
                    </Box>
 . . 
                    <Box >
                        <Typography fontSize={30} fontWeight={700} color="info" textAlign='center' >
                            Invoice Items
                        </Typography>
                    </Box>

                    {/* Invoice preview table */}
                    <Box  overflow='auto' >
                    <Table sx={{ maxWidth: { md:'650'}}} >
                        <TableHead>
                            <TableRow sx={{fontSize:200, fontWeight: 500, color:"#11142d"}} >
                                <TableCell align="left">Product Name</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Sum</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {invoiceDetail.invoiceDetails?.map((invoice:any) => (
                            <TableRow key={invoice._id} >
                            <TableCell align="left" component="th" scope="row">
                                {invoice.name}
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                {invoice.quantity}
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                               {invoice.price}
                            </TableCell>
                            <TableCell align="center" >
                                {invoice.sum}
                            </TableCell>
                            </TableRow>
                        ))}
                        <TableRow >
                           <TableCell rowSpan={4} />
                           <TableCell colSpan={2}>Subtotal</TableCell>
                           <TableCell align="right" >
                            <Typography fontSize={20} fontWeight={500}>{invoiceDetail.subtotal}</Typography>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Tax</TableCell>
                            <TableCell align="right">{`${(0.0 * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right" >{invoiceDetail.tax}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Discount</TableCell>
                            <TableCell align="right">{`${(0.0 * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right" >{invoiceDetail.discount}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right" >
                                <Typography fontSize={25} fontWeight={500} > {invoiceDetail.total}</Typography>
                            </TableCell>
                        </TableRow>

                        </TableBody>
                        </Table>
                    </Box>
                
            </Box>
        </Box>

        </Show>
        
    );
};

export default InvoiceDetails;