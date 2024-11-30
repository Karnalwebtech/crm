import React from "react";
// import { Box, CircularProgress } from "@mui/material";

interface Loading_section_props {
    height?:number
}
export const Loading_section:React.FC<Loading_section_props> = ({height=null}) => {

  return (
    <>
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            height: height===null?'400px':'100%',
          }}
        >
          <CircularProgress />
        </Box> */}
    </>
  );
};