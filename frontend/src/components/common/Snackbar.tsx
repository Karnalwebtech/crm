import * as React from 'react';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
// import { Alert } from '@mui/material';

interface PositionedSnackbar {
    Open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // message: string; // To handle different types of messages
    // severity?: 'success' | 'error' | 'info' | 'warning';
}

const PositionedSnackbar: React.FC<PositionedSnackbar> = ({ Open, setOpen }) => {



    const handleClose = () => {
        setOpen(false);
    };
    //   onClick={handleClick({ vertical: 'top', horizontal: 'center' })}


    return (
        <div></div>
        // <Box   sx={{
        //     width: 500,
        //     padding:0,  
        //     '& .MuiAlert-root': {
        //         border: '2px solid green', // Green border color
        //         borderRadius: '4px',
        //         animation: 'borderPulse 1.5s infinite', // Animation
        //     },
        //     '@keyframes borderPulse': {
        //         '0%': { borderColor: 'green' },
        //         '50%': { borderColor: 'transparent' },
        //         '100%': { borderColor: 'green' },
        //     },
        // }}>
        //     <Snackbar
        //     sx={{ padding:0,  }}
        //         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        //         open={Open}
        //         onClose={handleClose}
        //         message="I love snacks"
        //         autoHideDuration={5000}
        //         key={'top' + 'center'}
        //     >
        //         <Alert sx={{ padding:'0 10px',  }} onClose={handleClose} severity={'success'}>
        //             {/* {message} */} Data Added
        //         </Alert>
        //     </Snackbar>
        // </Box>
    );
}
export default PositionedSnackbar