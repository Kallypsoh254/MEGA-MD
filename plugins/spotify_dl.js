import axios from 'axios';

export default {
    command: 'spotify',
    category: 'downloader',
    description: 'Download a song from Spotify',
    usage: '.spotify <query>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const query = args.join(' ');
        if (!query) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a song name or link. Usage: .spotify <query>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `🎵 Searching Spotify for *"${query}"*...` }, { quoted: message });

        try {
            // Using a public API for Spotify search and download
            const response = await axios.get(`https://api.lolhuman.xyz/api/spotify?apikey=85faf717d0545d14074659ad&query=${encodeURIComponent(query)}`);
            const result = response.data.result;

            if (!result || !result.link) throw new Error('No song found');

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE SPOTIFY DL\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🎵 *Title:* ${result.title}\n` +
                            `👤 *Artist:* ${result.artists}\n` +
                            `🔗 *Link:* ${result.link}`;

            await sock.sendMessage(chatId, { 
                image: { url: result.thumbnail },
                caption: caption 
            }, { quoted: message });

            await sock.sendMessage(chatId, { 
                audio: { url: result.link },
                mimetype: 'audio/mpeg',
                fileName: `${result.title}.mp3`
            }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error downloading Spotify song: ${error.message}` }, { quoted: message });
        }
    }
};
