import axios from 'axios';

export default {
    command: 'translate',
    aliases: ['tr'],
    category: 'general',
    description: 'Translate text to another language',
    usage: '.translate <lang> <text>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const lang = args[0];
        const text = args.slice(1).join(' ');

        if (!lang || !text) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a language and text. Usage: .translate <lang> <text>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `🌐 Translating to *${lang}*...` }, { quoted: message });

        try {
            // Using a public API for translation
            const response = await axios.get(`https://api.lolhuman.xyz/api/translate?apikey=85faf717d0545d14074659ad&to=${lang}&text=${encodeURIComponent(text)}`);
            const result = response.data.result;

            if (!result) throw new Error('Translation failed');

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE TRANSLATE\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🌐 *Target Language:* ${lang}\n` +
                            `📝 *Original:* ${text}\n` +
                            `📊 *Result:* ${result}`;

            await sock.sendMessage(chatId, { text: caption }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error translating: ${error.message}` }, { quoted: message });
        }
    }
};
