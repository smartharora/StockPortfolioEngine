import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InvestmentPage = () => {
  const navigate = useNavigate();

  const [fieldError, setFieldError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const [defValue, setDefValue] = useState(5000);

  const valueRef = useRef('');
  const sendValue = () => {
    if (valueRef.current.value >= 5000) {
      setDefValue(valueRef.current.value);
      navigate('/strategies', { state: { investValue: valueRef.current.value } });
    } else {
      setFieldError(true);
      setHelperText('Incorrect Amount ');
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={'column'}
        marginTop="1%"
        p={10}
        height="auto"
        width="80%"
        marginLeft="auto"
        marginRight="auto"
        sx={{ overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#f7f7f7' }}
      >
        <Box
          borderRadius="15px"
          boxShadow="0px 10px 20px rgba(0, 0, 0, 0.1);"
          padding="20px"
          backgroundColor="#ffffff"
          marginBottom="20px"
        >
          <Typography sx={{ textAlign: 'left', marginBottom: '3%', fontWeight: '600', fontSize: '18px' }}>
            Step 1: Enter Your Investment Amount
          </Typography>
          <TextField
            sx={{ marginRight: '85%' }}
            type="number"
            label="in dollars($)"
            inputRef={valueRef}
            error={fieldError}
            helperText={helperText}
            defaultValue={defValue}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <Typography sx={{ textAlign: 'left', color: '#333333' }}>
            Min. Amount - $5000
          </Typography>

          <Button
            sx={{ marginTop: '2%', width: '10%', marginLeft: '90%' }}
            variant="contained" /* Solid button for action */
            color="primary"
            onClick={sendValue}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default InvestmentPage;
