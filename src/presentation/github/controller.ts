
import { Request, Response } from 'express';
import { GitHubService } from '../services/github.service';
import { DiscordService } from '../services/discord.service';

export class GitHubController {
  constructor(private gitHubService: GitHubService = new GitHubService(),
    private discordService: DiscordService = new DiscordService()) {

  }


  public weebHookHandler = (req: Request, res: Response) => {
    
    const payload = req.body;
    const githubEvent = req.headers['x-github-event'] ?? 'unknown';
    let message: string;
    switch (githubEvent) {
      case 'star':
        message = this.gitHubService.onStar(payload);

        break;
      case 'issues':
        message = this.gitHubService.onIssue(payload);

        break
      default:
        message = 'unknown event';

    }
    this.discordService.notify(message)
    .then(() => res.status(202).send("Aceptado"))
    .catch(() => res.status(500).json({ error: "Error al enviar el mensaje a discord" }));



  }

}