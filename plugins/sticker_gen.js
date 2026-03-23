import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export default {
    command: 'sticker',
    aliases: ['s'],
    category: 'sticker',
    description: 'Convert an image or video to a sticker',
    usage: '.sticker',
    async handler(sock, message) {
        const chatId = message.key.remoteJid;
        const quoted = message.message.extendedTextMessage?.contextInfo?.quotedMessage || message.message;
        const type = Object.keys(quoted)[0];

        if (type !== 'imageMessage' && type !== 'videoMessage') {
            return await sock.sendMessage(chatId, { text: '❌ Please reply to an image or video to create a sticker. Usage: .sticker' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: '🎨 Creating sticker...' }, { quoted: message });

        try {
            const stream = await downloadContentFromMessage(quoted[type], type === 'imageMessage' ? 'image' : 'video');
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            const inputPath = path.join('/tmp', `input_${Date.now()}.${type === 'imageMessage' ? 'jpg' : 'mp4'}`);
            const outputPath = path.join('/tmp', `output_${Date.now()}.webp`);

            fs.writeFileSync(inputPath, buffer);

            // Using ffmpeg to convert to webp sticker
            await execPromise(`ffmpeg -i ${inputPath} -vcodec libwebp -filter:v "scale='if(gt(iw,ih),512,-1)':'if(gt(iw,ih),-1,512)',fps=15,pad=512:512:(512-iw)/2:(512-ih)/2:color=0x00000000" -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${outputPath}`);

            const stickerBuffer = fs.readFileSync(outputPath);

            await sock.sendMessage(chatId, { 
                sticker: stickerBuffer,
                packname: 'DARKCORE BOT',
                author: '+254797510941'
            }, { quoted: message });

            // Cleanup
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error creating sticker: ${error.message}` }, { quoted: message });
        }
    }
};
