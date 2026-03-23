import axios from 'axios';

export default {
    command: 'play',
    category: 'downloader',
    description: 'Download a song from YouTube',
    usage: '.play <song name>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const query = args.join(' ');
        if (!query) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a song name. Usage: .play <song name>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `🎵 Searching for *"${query}"*...` }, { quoted: message });

        try {
            // Using a public API for YouTube search and download
            const response = await axios.get(`https://api.lolhuman.xyz/api/ytplay?apikey=85faf717d0545d14074659ad&query=${encodeURIComponent(query)}`);
            const result = response.data.result;

            if (!result || !result.audio) throw new Error('No song found');

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE PLAY DL\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🎵 *Title:* ${result.title}\n` +
                            `👤 *Uploader:* ${result.uploader}\n` +
                            `📅 *Published:* ${result.published}\n` +
                            `🔗 *Link:* ${result.url}`;

            await sock.sendMessage(chatId, { 
                image: { url: result.thumbnail },
                caption: caption 
            }, { quoted: message });

            await sock.sendMessage(chatId, { 
                audio: { url: result.audio },
                mimetype: 'audio/mpeg',
                fileName: `${result.title}.mp3`
            }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error downloading song: ${error.message}` }, { quoted: message });
        }
    }
};
