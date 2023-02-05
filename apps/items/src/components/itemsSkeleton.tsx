import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Skeleton from "@mui/material/Skeleton";

export const ItemsSkeleton = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {Array.from(new Array(9)).map((item,index) => (
          <Grid xs={4} key={index}>
            <Skeleton  variant="rectangular" width={380} height={275} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
