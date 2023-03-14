import React from "react";
import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";
import { Box, Stack, Button, Typography, TextField, Select, MenuItem,
        Table, TableHead, TableRow, TableBody, TableCell,tableCellClasses,TableContainer, Paper,styled
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useMemo } from "react";
import { CustomButton } from "components";
//import { styled } from '@mui/material/styles';
//import  { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AllInvoices = () => {
    const navigate = useNavigate();

    const {
        tableQueryResult: { data, isLoading, isError },
        current,
        setCurrent,
        setPageSize,
        pageCount,
        sorter,
        setSorter,
        filters,
        setFilters,
    } = useTable();

    const allInvoices = data?.data ?? [];


    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) =>
            "field" in item ? item : [],
        );

        return {
            title:
                logicalFilters.find((item) => item.field === "name")?.value ||
                "",
            location:
                logicalFilters.find((item) => item.field === "location")
                    ?.value || "",
        };
    }, [filters]);

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error...</Typography>;

    return (
        <Box>
            <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Stack direction="column" width="100%">
                    <Typography fontSize={25} fontWeight={700} color="#11142d">
                        {!allInvoices.length ? "There are no invoices" : "All Invoices"}
                    </Typography>
                    <Box mb={2} mt={3} display="flex" width="100%" justifyContent="space-between" flexWrap="wrap">
                        <Box display="flex" gap={2} flexWrap="wrap" mb={{ xs: "20px", sm: 0 }}>
                            <TextField
                                variant="outlined"
                                color="info"
                                placeholder="Search by title"
                                value={currentFilterValues.title}
                                onChange={(e) => {
                                    setFilters([
                                        {
                                            field: "title",
                                            operator: "contains",
                                            value: e.currentTarget.value
                                                ? e.currentTarget.value
                                                : undefined,
                                        },
                                    ]);
                                }}
                            />
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue=""
                                value={currentFilterValues.location}
                                onChange={(e) => {
                                    setFilters(
                                        [
                                            {
                                                field: "location",
                                                operator: "eq",
                                                value: e.target.value,
                                            },
                                        ],
                                        "replace",
                                    );
                                }}
                            >
                                <MenuItem value="">All Locations</MenuItem>
                                {[
                                    "Apartment",
                                    "Villa",
                                    "Farmhouse",
                                    "Condos",
                                    "Townhouse",
                                    "Duplex",
                                    "Studio",
                                    "Chalet",
                                ].map((type) => (
                                    <MenuItem
                                        key={type}
                                        value={type.toLowerCase()}
                                    >
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box  justifyContent="space-between" alignItems="center">
                        <CustomButton
                            title="Add Invoice"
                            handleClick={() => navigate("/invoices/create")}
                            backgroundColor="#475be8"
                            color="#fcfcfc"
                            icon={<Add />}
                        />
                    </Box>
                    </Box>
                </Stack>
            </Box>

                <Box borderRadius={2} padding={1} sx={{background: '#FCFCFC', height: 500, width: '100%' }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="left">Date</StyledTableCell>
                        <StyledTableCell align="left">Customer</StyledTableCell>
                        <StyledTableCell align="left">Value</StyledTableCell>
                        <StyledTableCell align="left">Status</StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {allInvoices?.map((invoice) => (
                        <StyledTableRow key={invoice._id}>
                          <StyledTableCell component="th" scope="row">{invoice.counter}</StyledTableCell>
                          <StyledTableCell align="left">{invoice.createdAt}</StyledTableCell>
                          <StyledTableCell align="left">{invoice.customerDetails[0].name}</StyledTableCell>
                          <StyledTableCell align="left">{invoice.total}</StyledTableCell>
                          <StyledTableCell align="left">{invoice.status}</StyledTableCell>
                          <StyledTableCell align="left">
                            <Button style={{background:'#2ED480', width:'70px', color:'#fcfcfc', 
                                border:'none', padding:'4px', borderRadius:'5px'}} 
                                onClick={()=>navigate(`/invoices/show/${invoice._id}`)}>
                                View
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                </Box>
        </Box>
    );
};

export default AllInvoices;
