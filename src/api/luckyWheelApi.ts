import apiClient from './apiClient';

export const getLuckyWheelData = async () => {
  const response = await apiClient.get('/lucky-wheel');
  return response.data;
};

export const spinWheel = async () => {
  const response = await apiClient.post('/lucky-wheel/spin');
  return response.data;
};

export const getUserBalance = async () => {
  const response = await apiClient.get('/user/balance');
  return response.data;
};

export const getLastWinner = async () => {
  const response = await apiClient.get('/lucky-wheel/last-winner');
  return response.data;
};

export const getMoreChances = async () => {
  const response = await apiClient.post('/lucky-wheel/more-chances');
  return response.data;
};

export const getUserAssets = async () => {
  const response = await apiClient.get('/user/assets');
  return response.data;
};