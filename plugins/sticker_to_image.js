import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export default {
    command: 'simage',
    category: 'sticker',
    description: 'Convert a sticker to an image',
    usage: '.simage',
    async handler(sock, message) {
        const chatId = message.key.remoteJid;
        const quoted = message.message.extendedTextMessage?.contextInfo?.quotedMessage || message.message;
        const type = Object.keys(quoted)[0];

        if (type !== 'stickerMessage') {
            return await sock.sendMessage(chatId, { text: '❌ Please reply to a sticker to convert it to an image. Usage: .simage' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: '🎨 Converting sticker to image...' }, { quoted: message });

        try {
            const stream = await downloadContentFromMessage(quoted[type], 'sticker');
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            const inputPath = path.join('/tmp', `input_${Date.now()}.webp`);
            const outputPath = path.join('/tmp', `output_${Date.now()}.jpg`);

            fs.writeFileSync(inputPath, buffer);

            // Using ffmpeg to convert webp to jpg
            await execPromise(`ffmpeg -i ${inputPath} ${outputPath}`);

            const outputBuffer = fs.readFileSync(outputPath);

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE STICKER TO IMAGE\n` +
                            `╚══════════════════════════╝`;

            await sock.sendMessage(chatId, { 
                image: outputBuffer,
                caption: caption 
            }, { quoted: message });

            // Cleanup
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error converting sticker: ${error.message}` }, { quoted: message });
        }
    }
};
