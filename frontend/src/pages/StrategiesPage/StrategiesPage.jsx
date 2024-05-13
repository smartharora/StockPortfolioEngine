import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  InputLabel,
  FormControl,
  Button,
  Box,
  Typography,
  FormHelperText,
} from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StrategiesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };
  const names = [
    'Ethical Investing',
    'Growth Investing',
    'Index Investing',
    'Quality Investing',
    'Value Investing',
  ];

  const [investing, setInvesting] = useState([]);
  const [fieldError, setFieldError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInvesting(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const sendValue = () => {
    if (investing.length === 0) {
      setFieldError(true);
      setHelperText('Please select the strategies');
    } else if (investing.length > 2) {
      setFieldError(true);
      setHelperText('Maximum of 2 Investment strategies can be selected');
    } else {
      navigate('/confirm', {
        state: {
          investValue2: location.state.investValue,
          strategies: investing,
        },
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={'column'}
        marginTop="1%"
        p={5}
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
          background="linear-gradient(135deg, #add8e6, #87ceeb)"
          color="#333333"
        >
          <Typography sx={{ textAlign: 'left', marginBottom: '3%', fontWeight: '600', fontSize: '18px' }}>
            Step 2: Select Strategies
          </Typography>
          <FormControl sx={{ width: '100%', marginBottom: '2%' }}>
            <InputLabel id="demo-multiple-checkbox-label">Investing Strategies</InputLabel>
            <Select
              multiple
              value={investing}
              onChange={handleChange}
              input={<OutlinedInput label="Investing Strategies" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              error={fieldError}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={investing.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
            {fieldError ? <FormHelperText error>{helperText}</FormHelperText> : null}
          </FormControl>
          <Typography sx={{ textAlign: 'left', fontSize: '14px' }}>
            Pick one or two Investment strategies
          </Typography>
          <Box display="flex" justifyContent="space-between" marginTop="20px">
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={sendValue}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default StrategiesPage;
