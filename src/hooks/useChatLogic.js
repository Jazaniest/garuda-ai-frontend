import { updateChat } from '../api/chatApi';

const autoQuestions = {
  commodity: [
    "Komoditas apa yang anda ingin tanam?",
    "Sebutkan desa, kecamatan dan kabupaten tempat anda.",
    "Terima kasih. Data Anda sedang kami proses untuk prediksi... (menunggu jawaban dari BE nantinya)"
  ],
  disease: [
    "Berikan foto hama atau penyakit pada tanaman yang ingin Anda analisis.",
    "Terima kasih. Foto Anda sedang kami analisis... (menunggu jawaban dari BE nantinya)"
  ],
  qna: [
    "Tanyakan seputar pertanian yang ingin Anda ketahui.",
    "Terima kasih. Pertanyaan Anda sedang kami proses... (menunggu jawaban dari BE nantinya)"
  ]
};

export const useChatLogic = (setChatSessions) => {

  const processUserMessage = async (textOrFile, activeChat) => {
    if (!activeChat) return;

    const { id, mode, conversationStep, messages } = activeChat;
    const isChatStarted = messages.length > 1;
    let userInputText = '';

    if (typeof textOrFile !== 'string') {
      userInputText = `file-upload-simulation:${textOrFile.name}`;
    } else {
      userInputText = textOrFile;
    }

    let updatedTitle = activeChat.title;
    if (!isChatStarted) {
      updatedTitle = userInputText.substring(0, 25) + (userInputText.length > 25 ? '...' : '');
    }
    const userMessage = { sender: 'user', text: userInputText };
    const newMessages = [...messages, userMessage];

    const nextStep = conversationStep + 1;
    let aiResponseText = "Maaf, saya tidak mengerti.";

    if (mode === 'disease' && conversationStep === 0) {
        if (userInputText.startsWith("file-upload-simulation:")) {
            aiResponseText = autoQuestions.disease[1];
        } else {
            aiResponseText = "Analisis penyakit harus berupa foto. Silakan kirimkan foto.";
            const updatedChat = { ...activeChat, messages: [...newMessages, {sender: 'ai', text: aiResponseText}], title: updatedTitle };
            setChatSessions(prev => prev.map(c => c.id === id ? updatedChat : c));
            await updateChat(id, updatedChat);
            return;
        }
    } else {
        aiResponseText = autoQuestions[mode][nextStep] || autoQuestions[mode][autoQuestions[mode].length - 1];
    }
    
    const aiMessage = { sender: 'ai', text: aiResponseText };
    const finalMessages = [...newMessages, aiMessage];

    const finalUpdatedChat = {
      ...activeChat,
      title: updatedTitle,
      messages: finalMessages,
      conversationStep: nextStep
    };

    setChatSessions(prev => prev.map(c => c.id === id ? finalUpdatedChat : c));
    await updateChat(id, finalUpdatedChat);
  };

  return { processUserMessage };
};