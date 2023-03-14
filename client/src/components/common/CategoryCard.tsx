import { Category, Phone, Place, Description, Inventory } from "@mui/icons-material";
import { useGetIdentity } from "@pankod/refine-core";
import { Box, Stack, Typography } from "@pankod/refine-mui";
import { Link, useNavigate } from "@pankod/refine-react-router-v6";

import { CategoryCardProps, CategoryBarProps } from "interfaces/category";

const CategoryBar = ({ icon, name }: CategoryBarProps) => (
    <Stack
        flex={1}
        minWidth={{ xs: "100%", sm: 300 }}
        gap={1.5}
        direction="row"
    >
        {icon}
        <Typography fontSize={14} color="#808191">
            {name}
        </Typography>
    </Stack>
);

const CategoryCard = ({ id, name, description, email}: CategoryCardProps) => {
    const navigate = useNavigate()
    const { data: currentUser } = useGetIdentity();

    const generateLink = () => {
        if (currentUser.email === email) return "Categories";
        return `/categories/show/${id}`;
    };

    return (
        <Box 
            component={Link}
            to={generateLink()}
            width="100%"
            sx={{ display: "flex", borderRadius: 10, flexDirection: { xs: "column", sm: "row" }, gap: "20px", padding: "20px", "&:hover": {boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)", },}}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/Product_sample_icon_picture.png"
                alt="user"
                width={90}
                height={90}
                style={{ borderRadius: 8, objectFit: "cover" }}
            />
            <Stack direction="column" justifyContent="space-between" flex={1} gap={{ xs: 4, sm: 2 }}>
                <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
                    <Typography fontSize={22} fontWeight={600} color="#11142d">
                        {name}
                    </Typography>
                </Stack>
                <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={2}>
                    <CategoryBar
                        icon={<Description sx={{ color: "#808191" }} />}
                        name={description}
                    />
                    <CategoryBar
                        icon={<Inventory sx={{ color: "#808191" }} />}
                        name="Product:"
                    />
                    <CategoryBar
                        icon={<Category sx={{ color: "#808191" }} />}
                        name="Stock:"
                    />
                </Stack>
            </Stack>
        </Box>
    );
};

export default CategoryCard;