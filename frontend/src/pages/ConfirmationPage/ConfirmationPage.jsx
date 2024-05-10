import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
  } from '@mui/material';
  import { useLocation, useNavigate } from 'react-router-dom';
  import { useEffect, useState } from 'react';
  import { BeatLoader } from 'react-spinners';
  import {fetchSuggestions} from "../../api/api";

const ConfirmationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [strategies, setStrategies] = useState(location.state.strategies);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      if (location.state.strategies.length > 1) {
        setStrategies(
          location.state.strategies[0] + ' & ' + location.state.strategies[1]
        );
      }
    }, [location.state.strategies]);
  
    const getSuggestions = async () => {
      setIsLoading(true);
      let postBody = {};
      postBody.Amount = parseInt(location.state.investValue2);
      postBody.Strategies = [];
      if (location.state.strategies.length === 2) {
        postBody.Strategies = [...location.state.strategies];
      } else {
        postBody.Strategies = location.state.strategies;
      }
  
      let response = await fetchSuggestions(postBody);
      console.log(response.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
  
      navigate('/results', {
        state: {
          respData: response.data,
          strategies: location.state.strategies,
        },
      });
    };
  
    return (
      <>
        <Box
          display="flex"
          flexDirection={'column'}
          marginTop="0.5%"
          p={10}
          width="89%"
          marginLeft={'0.1%'}
          height="510px"
        >
          <Box
            display={'flex'}
            flexDirection="column"
            backgroundColor="white"
            p={4}
            borderRadius={4}
          >
            {isLoading ? (
              <Box>
                <Typography>Loading</Typography>
                <BeatLoader color="#00BFFF" />
              </Box>
            ) : (
              <Box>
                <Typography textAlign="left" variant="h5" p={2}>
                  Confirmation
                </Typography>
                <Card>
                  <CardHeader title="Selected Details" />
                  <CardContent>
                    <Divider sx={{ my: 2 }} />
                    <Typography>
                      Investment Amount: {location.state.investValue2} $
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography>Investing Strategies: {strategies}</Typography>
                  </CardContent>
                </Card>
  
                <Box display="flex" marginTop={'5%'}>
                  <Button
                    sx={{ width: '10%' }}
                    variant="outlined"
                    onClick={() =>
                      navigate('/strategies', {
                        state: {
                          investValue: location.state.investValue2,
                          investing: location.state.strategies,
                        },
                      })
                    }
                  >
                    Back
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ width: '10%', marginLeft: '80%' }}
                    onClick={getSuggestions}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </>
    );
}

export default ConfirmationPage