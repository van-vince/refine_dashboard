import { Add } from "@mui/icons-material";
import { useList } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { CustomButton } from "components";
import { WarehouseCard } from "components";

const Warehouses = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useList({ resource: "warehouses" });

    const allWarehouses = data?.data ?? [];

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Box>
            <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "space-between" }}>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                {!allWarehouses.length ? "There are no Warehouses" : "All Warehouses"}
            </Typography>
            <Box  justifyContent="space-between" alignItems="center">
                <CustomButton
                    title="Add Warehouse"
                    handleClick={() => navigate("/warehouses/create")}
                    backgroundColor="#475be8"
                    color="#fcfcfc"
                    icon={<Add />}
                />
             </Box>
            </Box>

            <Box mt="20px"
                sx={{display: "flex",flexWrap: "wrap",gap: "20px",backgroundColor: "#fcfcfc",}}>
                {allWarehouses.map((warehouse) => (
                    <WarehouseCard
                        key={warehouse._id}
                        id={warehouse._id}
                        name={warehouse.name}
                        email={warehouse.email}
                        location={warehouse.location}
                        //noOfProperties={agent.allProperties.length}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Warehouses;