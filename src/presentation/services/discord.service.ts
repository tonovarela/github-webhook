import { envs } from "../../config";

export class DiscordService {
    private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK;

    async notify(message: string): Promise<boolean> {
        const body = {
            content: message, embeds: [
                {
                    image: { url: "https://media.giphy.com/media/d9RbxjZ8QXesiYoerE/giphy.gif" }
                }
            ]
        };

        const response = await fetch(this.discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            console.log("No se pudo enviar el mensaje a discord");
            return false;
        }
        return true;
    }

}