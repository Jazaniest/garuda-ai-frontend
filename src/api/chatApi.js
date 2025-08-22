const API_URL = 'http://localhost:3001';

export const getChatsByUserId = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/chat_sessions?userId=${userId}&_sort=id&_order=desc`);
    if (!response.ok) throw new Error('Gagal memuat data chat.');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createChat = async (chatData) => {
  try {
    const response = await fetch(`${API_URL}/chat_sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chatData),
    });
    if (!response.ok) throw new Error('Gagal membuat chat baru.');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateChat = async (chatId, updatedChatData) => {
  try {
    const response = await fetch(`${API_URL}/chat_sessions/${chatId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedChatData),
    });
    if (!response.ok) throw new Error('Gagal memperbarui chat.');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};