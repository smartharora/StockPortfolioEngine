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
    marginTop="0.5%"
    p={10}
    height="510px"
    marginLeft={'0.1%'}
    sx={{ overflowY: 'scroll', overflowX: 'hidden' }}
  >
    <Box
        borderRadius="15px"
        boxShadow="-5px 5px 10px 0px rgba(0, 0, 0, 0.2);" /* Slightly darker shadow */
        padding="20px"
        backgroundColor="#add8e6" /* Lighter shade of blue background */
        marginBottom="20px"
    >
      <Typography sx={{ textAlign: 'left', marginBottom: '3%', color: '#333333' }}>
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
        variant="outlined"
        onClick={sendValue}
      >
        Next
      </Button>
    </Box>
  </Box>
</>

  );
}

export default InvestmentPage