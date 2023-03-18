import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { useNavigate, useParams } from "react-router-dom";
import { Delete, Email, Phone, Edit, Place} from "@mui/icons-material";
import { Show, Breadcrumb } from "@refinedev/mui";
import { Box, Stack, Typography } from "@mui/material";
import { CustomButton } from "components";

const CustomerDetails = () => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true
    });
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    const { id } = useParams();

    const { data, isLoading, isError } = queryResult;

    const customerDetails = data?.data ?? [];
    
    const handleDeleteCustomer = () => {
        // eslint-disable-next-line no-restricted-globals
        const response = confirm(
            "Are you sure you want to delete this customer?",
        );
        if (response) {
            mutate(
                {
                    resource: "customers",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/dashboard/customers");
                    },
                },
            );
        }
    };

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;




    return (
        <Show resource="customers" isLoading={true}
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
        <Box mt="20px" borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
            <Box sx= {{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2.5,}}>
                <img
                    src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                    width={250}
                    height={200}
                    alt="abstract"
                    className="my_customer-bg"
                />
                <Box flex={1} sx={{ marginTop: { md: "58px" }, marginLeft: { xs: "20px", md: "0px" }, }}>
                    <Box flex={1} display="flex" flexDirection={{ xs: "column", md: "row" }} gap="20px" >
                        <img
                            src= "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                            width={78}
                            height={78}
                            alt="user_customer"
                            className="my_customer_user-img"
                        />

                        <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between" gap="30px">
                            <Stack direction="column">
                                <Typography fontSize={22} fontWeight={600} color="#11142D">
                                    {customerDetails.name}
                                </Typography>
                            </Stack>

                                <Stack direction="row" flexWrap="wrap" gap="20px" pb={4}>
                                    <Stack flex={1} gap="15px">
                                        <Typography fontSize={14} fontWeight={500} color="#808191">
                                            Phone Number
                                        </Typography>
                                        <Box display="flex" flexDirection="row" alignItems="center" gap="10px">
                                            <Phone sx={{ color: "#11142D" }} />
                                            <Typography fontSize={14} color="#11142D" noWrap>
                                            {customerDetails.contact}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Stack flex={1} gap="15px">
                                        <Typography fontSize={14} fontWeight={500} color="#808191">
                                            Location
                                        </Typography>
                                        <Box display="flex" flexDirection="row" alignItems="center" gap="10px">
                                            <Place sx={{ color: "#808191" }} />
                                            <Typography fontSize={14} color="#11142D">
                                                {customerDetails.location}
                                            </Typography>
                                        </Box>
                                    </Stack>
                            </Stack>   
                        </Box>
                        <Stack direction="column" flexWrap="wrap" gap={5}>
                            <CustomButton
                                title= "Edit" 
                                backgroundColor="#475BE8"
                                color="#FCFCFC"
                                //fullWidth
                                icon={ <Edit/>}
                                handleClick={() => navigate(`/dashboard/customers/edit/${customerDetails._id}`)}
                            />
                            <CustomButton
                                title= "Delete"
                                backgroundColor="#d42e2e"
                                color="#FCFCFC"
                                //fullWidth
                                icon={ <Delete />}
                                handleClick={() => handleDeleteCustomer()}
                            />
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Box>

        {/* {properties.length > 0 && (
            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
                <Typography fontSize={18} fontWeight={600} color="#11142D">
                    {type} Properties
                </Typography>

                <Box
                    mt={2.5}
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2.5,
                    }}
                >
                    {properties?.map((property: PropertyProps) => (
                        <PropertyCard
                            key={property._id}
                            id={property._id}
                            title={property.title}
                            location={property.location}
                            price={property.price}
                            photo={property.photo}
                        />
                    ))}
                </Box>
            </Box>
        )} */}
        </Show>
        
    );
};

export default CustomerDetails;