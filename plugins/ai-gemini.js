import axios from 'axios';

export default {
    command: 'gemini',
    category: 'ai',
    description: 'Ask a question to Gemini AI',
    usage: '.gemini <question>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const query = args.join(' ');
        if (!query) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a question. Usage: .gemini <question>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { react: { text: '🤖', key: message.key } });

        try {
            // Using a public API for Gemini
            const response = await axios.get(`https://api.lolhuman.xyz/api/gemini?apikey=85faf717d0545d14074659ad&query=${encodeURIComponent(query)}`);
            const result = response.data.result;

            if (!result) throw new Error('No response from AI');

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE GEMINI AI\n` +
                            `╚══════════════════════════╝\n\n` +
                            `${result}`;

            await sock.sendMessage(chatId, { text: caption }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error calling Gemini AI: ${error.message}` }, { quoted: message });
        }
    }
};
