import React from "react";
import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";
import { Box, Stack, Button, Typography, TextField, Select, MenuItem, useDataGrid, DataGrid, ShowButton, GridColumns,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useMemo } from "react";
import { CustomButton } from "components";

const AllCustomers = () => {
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

    const allCustomers = data?.data ?? [];

    const columns = React.useMemo<GridColumns<any>>(
    () => [
        {
            field: "_id",
            headerName: "Id",
            type: "number",
            minWidth: 50,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
        },
        {
            field: "location",
            headerName: "Location",
            minWidth: 200,
        },
        {
            field: "contact",
            headerName: "Contact",
            minWidth: 150,
        },
        {
            field: "actions",
            headerName: "Actions",
            renderCell: function render({ row }) {
                return (
                    // <>        
                    //     <ShowButton hideText recordItemId={row._id} />
                    // </>
                    <Box >
                        <Button style={{background:'#2ED480', width:'70px', color:'#fcfcfc', 
                            border:'none', padding:'4px', borderRadius:'5px'}} 
                            onClick={()=>navigate(`/customers/show/${row._id}`)}>
                            View
                        </Button>
                    </Box>
                );
            },
            align: "center",
            headerAlign: "center",
            minWidth: 80,
        },
    ],
    [
        // categoryData,
        // userData
        
    ]
);

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
                        {!allCustomers.length ? "There are no customers" : "All Customers"}
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
                            title="Add Customer"
                            handleClick={() => navigate("/customers/create")}
                            backgroundColor="#475be8"
                            color="#fcfcfc"
                            icon={<Add />}
                        />
                    </Box>
                    </Box>
                </Stack>
            </Box>

                <Box borderRadius={2} padding={1} sx={{background: '#FCFCFC', height: 500, width: '100%' }}>
                    <DataGrid 
                    getRowId={(row)=>row._id}
                   // {...dataGridProps } 
                    rows={allCustomers || []}
                    columns={columns} 
                    autoHeight 
                    />
                </Box>
        </Box>
    );
};

export default AllCustomers;
