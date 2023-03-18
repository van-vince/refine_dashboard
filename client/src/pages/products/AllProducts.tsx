import React from "react";
import { Add } from "@mui/icons-material";
import { useTable } from "@refinedev/core";
import { useDataGrid, ShowButton } from "@refinedev/mui";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { Box, Stack, Button, Typography, TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { CustomButton } from "components";

const AllProducts = () => {
    const navigate = useNavigate();

    const {
        tableQueryResult: { data, isLoading, isError },
        current,
        setCurrent,
        setPageSize,
        pageCount,
        sorters: sorter,
        setSorters: setSorter,
        filters,
        setFilters,
    } = useTable();

    const allProducts = data?.data ?? [];

    const columns = React.useMemo<GridColumns<any>>(
    () => [
        {
            field: "_id",
            headerName: "Id",
            type: "number",
            minWidth: 50,
        },
        {
            field: "image",
            headerName: "Image",
            minWidth: 100,
            renderCell: function render({ row }) {
                return (
                    <>
                        <img
                            src={row?.photo}
                            style={{
                                height: "50px",
                                width: "80px",
                                borderRadius: '10px'
                            }}
                        />
                    </>
                );
            },
        },
        {
            field: "title",
            headerName: "Title",
            minWidth: 200,
        },
        {
            field: "description",
            headerName: "Description",
            minWidth: 200,
        },
        {
            field: "category",
            headerName: "Category",
            minWidth: 150,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 100,
        },
        {
            field: "quantity",
            headerName: "Quantity",
            type: "number",
            minWidth: 100,
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
                        onClick={()=>navigate(`/dashboard/products/show/${row._id}`)}>
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

    const currentPrice = sorter.find((item) => item.field === "price")?.order;

    const toggleSort = (field: string) => {
        setSorter([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
    };

    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) =>
            "field" in item ? item : [],
        );

        return {
            title:
                logicalFilters.find((item) => item.field === "title")?.value ||
                "",
            propertyType:
                logicalFilters.find((item) => item.field === "propertyType")
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
                        {!allProducts.length ? "There are no products" : "All Products"}
                    </Typography>
                    <Box mb={2} mt={3} display="flex" width="100%" justifyContent="space-between" flexWrap="wrap">
                        <Box display="flex" gap={2} flexWrap="wrap" mb={{ xs: "20px", sm: 0 }}>
                            <CustomButton title={`Sort price ${currentPrice === "asc" ? "↑" : "↓"}`}
                                handleClick={() => toggleSort("price")}
                                backgroundColor="#475be8"
                                color="#fcfcfc"
                            />
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
                                value={currentFilterValues.propertyType}
                                onChange={(e) => {
                                    setFilters(
                                        [
                                            {
                                                field: "propertyType",
                                                operator: "eq",
                                                value: e.target.value,
                                            },
                                        ],
                                        "replace",
                                    );
                                }}
                            >
                                <MenuItem value="">All Categories</MenuItem>
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
                            title="Add Product"
                            handleClick={() => navigate("/dashboard/products/create")}
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
                    rows={allProducts || []}
                    columns={columns} 
                    autoHeight 
                    />
                </Box>
        </Box>
    );
};

export default AllProducts;








// const columns = React.useMemo<GridColumns<any>>(
//     () => [
//         {
//             field: "_id",
//             headerName: "Id",
//             type: "number",
//             minWidth: 50,
//         },
//         {
//             field: "image",
//             headerName: "Image",
//             minWidth: 100,
//             renderCell: function render({ value }) {
//                 return (
//                     <>
//                         {value?.map((item: any, index: number) => (
//                             <img
//                                 src={item?.url}
//                                 key={index}
//                                 style={{
//                                     height: "50px",
//                                     maxWidth: "100px",
//                                 }}
//                             />
//                         ))}
//                     </>
//                 );
//             },
//         },
//         {
//             field: "title",
//             headerName: "Title",
//             minWidth: 200,
//         },
//         {
//             field: "description",
//             headerName: "Description",
//             minWidth: 200,
//         },
//         {
//             field: "category",
//             headerName: "Category",
//             minWidth: 150,
//         },
//         {
//             field: "price",
//             headerName: "Price",
//             type: "number",
//             minWidth: 100,
//         },
//         {
//             field: "quantity",
//             headerName: "Quantity",
//             type: "number",
//             minWidth: 100,
//         },
//         {
//             field: "actions",
//             headerName: "Actions",
//             renderCell: function render({ row }) {
//                 return (
//                     <>         
//                         <ShowButton hideText recordItemId={row._id} />
//                     </>
//                 );
//             },
//             align: "center",
//             headerAlign: "center",
//             minWidth: 80,
//         },
//     ],
//     [
//         // categoryData,
//         // userData

//     ]
// );

// return (
//     <List>
//         <DataGrid 
//         getRowId={(row)=>row._id}
//         // {...dataGridProps } 
//         rows={allProducts || []}
//         columns={columns} 
//         autoHeight 
//         />
//     </List>
// );