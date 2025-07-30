import axios from 'axios';

const apiKey = "AIzaSyCMDXmZ8yIwAIUkbJXJ2wlUIzRogwd926g";
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

export const sendMessage = async (message: string) => {
  try {
    const cryptoExpertPrompt = `Kamu adalah seorang ahli investasi cryptocurrency yang berpengalaman. Berikan jawaban yang informatif, akurat, dan mudah dipahami dalam bahasa Indonesia. Fokus pada analisis fundamental, teknikal, dan strategi investasi yang aman. Selalu ingatkan tentang risiko investasi kripto.

Pertanyaan: ${message}`;

    const response = await axios.post(apiUrl, {
      contents: [{
        parts: [{
          text: cryptoExpertPrompt,
        }],
      }],
    });
      
    if(response.status === 200){
      return response.data.candidates[0].content.parts[0].text;
    }
    throw new Error(`HTTP error! status: ${response.status}`);

  } catch (error) {
    console.error("Error fetching API:", error);
    throw error;
  }
};