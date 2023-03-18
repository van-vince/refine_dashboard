import { Box, Typography, FormControl, FormHelperText, TextField, Button } from "@mui/material";

import { CustomerFormProps } from "interfaces/common";
import CustomButton from "./CustomButton";

const CustomerForm = ({
    type,
    register,
    handleSubmit,
    formLoading,
    onFinishHandler,
}: CustomerFormProps) => {
    return (
        <Box>
            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
                <form style={{ marginTop: "20px", width: "100%", display: "flex", flexDirection: "column", gap: "20px", }}
                    onSubmit={handleSubmit(onFinishHandler)} >
                    <FormControl>
                        <FormHelperText sx={{ fontWeight: 500, margin: "10px 0", fontSize: 16, color: "#11142d", }}>
                            Enter customer name
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            {...register("name", { required: true })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{fontWeight: 500,margin: "10px 0",fontSize: 16,color: "#11142d", }}>
                            Enter location
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            {...register("location", { required: true })}
                        />
                    </FormControl>

                    <FormControl>
                        <FormHelperText sx={{fontWeight: 500,margin: "10px 0",fontSize: 16,color: "#11142d", }}>
                            Enter Contact
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            {...register("contact", { required: true })}
                        />
                    </FormControl>

                    <CustomButton
                        type="submit"
                        title={formLoading ? "Submitting..." : "Submit"}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                    />
                </form>
            </Box>
        </Box>
    );
};

export default CustomerForm;