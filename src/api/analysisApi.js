import api from './axiosConfig';

/**
 * Post ke endpoint luons.
 * @param {string} prompt
 * @returns {Promise<any>}
 */
export const analyzeLunos = async (prompt) => {
  try {
    const response = await api.post('/lunos/analyze', { prompt });
    return response.data;
  } catch (error) {
    console.error("Error saat menganalisis prompt:", error);
    throw error;
  }
};

/**
 * Post ke endpoint unlidev.
 * @param {File} file
 * @returns {Promise<any>}
 */
export const analyzeUnliDev = async (file) => {
  const formData = new FormData();
  formData.append('image', file); 

  try {
    const response = await api.post('/unli-dev/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saat menganalisis foto:", error);
    throw error;
  }
};