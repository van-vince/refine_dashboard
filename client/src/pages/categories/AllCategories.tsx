import { Add } from "@mui/icons-material";
import { useList } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { CustomButton } from "components";
import { CategoryCard } from "components";

const Categories = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useList({ resource: "categories" });

    const allCategories = data?.data ?? [];

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Box>
            <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "space-between" }}>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                {!allCategories.length ? "There are no Categories" : "All Categories"}
            </Typography>
            <Box  justifyContent="space-between" alignItems="center">
                <CustomButton
                    title="Add Category"
                    handleClick={() => navigate("/categories/create")}
                    backgroundColor="#475be8"
                    color="#fcfcfc"
                    icon={<Add />}
                />
             </Box>
            </Box>

            <Box mt="20px"
                sx={{display: "flex",flexWrap: "wrap",gap: "20px",backgroundColor: "#fcfcfc",}}>
                {allCategories.map((category) => (
                    <CategoryCard
                        key={category._id}
                        id={category._id}
                        name={category.name}
                        email={category.email}
                        description={category.description}
                        //noOfProperties={agent.allProperties.length}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Categories;