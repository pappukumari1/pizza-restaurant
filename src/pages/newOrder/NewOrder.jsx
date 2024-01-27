import {
  Box,
  Button,
  Container,
  FormHelperText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { addNewOrder } from "../../features/OrderSlice";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewOrderSchema } from "../../validation/Validation";
const NewOrder = () => {
  const [loading, setLoading] = useState(false);
  const order = useSelector((state) => state.Order);
  console.log(order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(NewOrderSchema),
  });
  const submitHandler = (values) => {
    setLoading(true);
    dispatch(addNewOrder(values));
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000);
  };
  const handleCancel = () => {
    navigate("/");
  };
  return (
    <Container className="py-5">
      <Box className="border-bottom border-2 mb-2">
        <Typography className="fs-1">New Order</Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit(submitHandler)}>
        <Box padding={4}>
          <Box>
            {/* <FormControl required> */}
            <FormLabel id="pizza-type" required>
              Type
            </FormLabel>
            <RadioGroup row aria-labelledby="pizza-type" name="type">
              <FormControlLabel
                value="Veg"
                control={<Radio {...register("type")} />}
                label="Veg"
              />
              <FormControlLabel
                value="Non-veg"
                control={<Radio {...register("type")} />}
                label="Non-veg"
              />
            </RadioGroup>
            {errors.type && (
              <FormHelperText className="text-danger">
                {errors.type.message}
              </FormHelperText>
            )}
            {/* </FormControl> */}
          </Box>
          <Box>
            {/* <FormControl> */}
            <FormLabel id="pizza-size" required>
              Size
            </FormLabel>
            <RadioGroup row aria-labelledby="pizza-size" name="size">
              <FormControlLabel
                value="Large"
                control={<Radio {...register("size")} />}
                label="Large"
              />
              <FormControlLabel
                value="Medium"
                control={<Radio {...register("size")} />}
                label="Medium"
              />
              <FormControlLabel
                value="Small"
                control={<Radio {...register("size")} />}
                label="Small"
              />
            </RadioGroup>
            {errors.size && (
              <FormHelperText className="text-danger">
                {errors.size.message}
              </FormHelperText>
            )}
            {/* </FormControl> */}
          </Box>
          <Box>
            {/* <FormControl> */}
            <FormLabel id="pizza-base" required>
              Base
            </FormLabel>
            <RadioGroup row aria-labelledby="pizza-base" name="base">
              <FormControlLabel
                value="Thin"
                control={<Radio {...register("base")} />}
                label="Thin"
              />
              <FormControlLabel
                value="Thick"
                control={<Radio {...register("base")} />}
                label="Thick"
              />
            </RadioGroup>
            {errors.base && (
              <FormHelperText className="text-danger">
                {errors.base.message}
              </FormHelperText>
            )}
            {/* </FormControl> */}
          </Box>
        </Box>
        <Box display="flex" gap={2} marginTop={5}>
          <Button
            variant="contained"
            color="success"
            type="submit"
            fullWidth
            disabled={loading}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            type="button"
            color="warning"
            fullWidth
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewOrder;
