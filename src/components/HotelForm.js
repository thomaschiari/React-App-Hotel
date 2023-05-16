import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/system';

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
`;

const StyledFieldWrapper = styled('div')`
  margin-bottom: 16px;
`;

const StyledLabel = styled('label')`
  font-weight: bold;
  margin-bottom: 4px;
`;

const StyledButton = styled(Button)`
  background-color: #ff4081;
  color: #fff;
  &:hover {
    background-color: #e5006e;
  }
  &.sameSize {
    font-size: 1.5rem;
    padding: 10px 20px;
  }
`;

function HotelForm() {
  const [name, setName] = useState('');
  const [stars, setStars] = useState('');
  const [minRate, setMinRate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hotelData = {
      hotel: name,
      stars: stars,
      dailyRate: minRate
    };

    try {
      const response = await axios.post('http://localhost:8080/hotel', hotelData);
      console.log('Hotel salvo:', response.data);
      // ALERT
      alert('Hotel salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o hotel:', error);
      // ALERT
      alert('Erro ao salvar o hotel!');
    }
  };

  return (
    <div>
      <h2>Salvar Hotel</h2>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFieldWrapper>
          <StyledLabel>Nome do Hotel:</StyledLabel>
          <TextField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </StyledFieldWrapper>
        <StyledFieldWrapper>
          <StyledLabel>Estrelas:</StyledLabel>
          <TextField
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
          />
        </StyledFieldWrapper>
        <StyledFieldWrapper>
          <StyledLabel>Taxa Diária:</StyledLabel>
          <TextField
            type="number"
            value={minRate}
            onChange={(e) => setMinRate(e.target.value)}
          />
        </StyledFieldWrapper>
        <StyledButton type="submit" className="sameSize">
          Salvar
        </StyledButton>
      </StyledForm>
    </div>
  );
}

export default HotelForm;
