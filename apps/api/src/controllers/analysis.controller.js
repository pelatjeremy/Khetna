import { tradingCore } from '../config/api.config.js';

export const createAnalysis = async (request, response, next) => {
  try {
    if (!request.body || Object.keys(request.body).length === 0) {
      return response.status(400).json({
        error: 'Request body is required',
      });
    }

    const result = await tradingCore.run(request.body);

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};
