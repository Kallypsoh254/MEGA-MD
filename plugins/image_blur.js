import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export default {
    command: 'blur',
    category: 'sticker',
    description: 'Apply blur effect to an image',
    usage: '.blur',
    async handler(sock, message) {
        const chatId = message.key.remoteJid;
        const quoted = message.message.extendedTextMessage?.contextInfo?.quotedMessage || message.message;
        const type = Object.keys(quoted)[0];

        if (type !== 'imageMessage') {
            return await sock.sendMessage(chatId, { text: '❌ Please reply to an image to apply blur. Usage: .blur' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: '🎨 Applying blur effect...' }, { quoted: message });

        try {
            const stream = await downloadContentFromMessage(quoted[type], 'image');
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            const inputPath = path.join('/tmp', `input_${Date.now()}.jpg`);
            const outputPath = path.join('/tmp', `output_${Date.now()}.jpg`);

            fs.writeFileSync(inputPath, buffer);

            // Using ffmpeg to apply blur
            await execPromise(`ffmpeg -i ${inputPath} -vf "boxblur=10:5" ${outputPath}`);

            const outputBuffer = fs.readFileSync(outputPath);

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE BLUR EFFECT\n` +
                            `╚══════════════════════════╝`;

            await sock.sendMessage(chatId, { 
                image: outputBuffer,
                caption: caption 
            }, { quoted: message });

            // Cleanup
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error applying blur: ${error.message}` }, { quoted: message });
        }
    }
};
