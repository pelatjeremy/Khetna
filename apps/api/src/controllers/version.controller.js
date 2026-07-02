export const getVersion = (_request, response) => {
  response.status(200).json({
    name: 'TradeAI API',
    version: '1.0.0',
  });
};
