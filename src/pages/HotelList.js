import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField } from '@mui/material';
import { styled } from '@mui/system';

const StyledList = styled('ul')`
  list-style: none;
  padding: 0;
`;

const StyledListItem = styled('li')`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const StyledHotelName = styled(Typography)`
  font-weight: bold;
  margin-right: 16px;
`;

const StyledStars = styled(Typography)`
  margin-right: 16px;
`;

const StyledRate = styled(Typography)`
  color: #ff4081;
`;

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [filterStars, setFilterStars] = useState('');
  const [filterMinRate, setFilterMinRate] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        let url = 'http://localhost:8080/hotel';
        if (filterStars || filterMinRate) {
          url += '?';
          if (filterStars) {
            url += `stars=${filterStars}&`;
          }
          if (filterMinRate) {
            url += `minDailyRate=${filterMinRate}&`;
          }
        }
        const response = await axios.get(url);
        const data = response.data;
        setHotels(data);
        console.log('Lista de hotéis:', data);
      } catch (error) {
        console.error('Erro ao obter a lista de hotéis:', error);
      }
    };

    fetchHotels();
  }, [filterStars, filterMinRate]);

  return (
    <Box>
      <Typography variant="h2">Lista de Hotéis</Typography>
      <Box marginBottom={2}>
        <Typography>Estrelas:</Typography>
        <TextField
          type="number"
          value={filterStars}
          onChange={(e) => setFilterStars(e.target.value)}
        />
      </Box>
      <Box marginBottom={2}>
        <Typography>Taxa Mínima:</Typography>
        <TextField
          type="number"
          value={filterMinRate}
          onChange={(e) => setFilterMinRate(e.target.value)}
        />
      </Box>
      <StyledList>
        {hotels.map((hotel) => (
          <StyledListItem key={hotel.id}>
            <StyledHotelName>{hotel.hotel}</StyledHotelName>
            <StyledStars>Estrelas: {hotel.stars}</StyledStars>
            <StyledRate>Diária: R${hotel.dailyRate}</StyledRate>
          </StyledListItem>
        ))}
      </StyledList>
    </Box>
  );
}

export default HotelList;
