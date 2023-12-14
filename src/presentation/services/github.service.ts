import { PayloadGitHubIssue, PayloadGitHubStar } from "../../interfaces";
export class GitHubService {
    constructor() { }
    onStar(payload: PayloadGitHubStar): string {
        const { sender, repository, action } = payload
        return `User ${sender.login} ${action} star on ${repository.full_name}`;
    }
    onIssue(payload: PayloadGitHubIssue): string {
        const { sender, repository, action, issue } = payload;
        let message: string = `Unhandled action for the issue event ${action}`;
        if (action === 'opened') {
            message = `User ${sender.login} ${action} issue on ${repository.full_name} ${issue.body} `;
        }        
        if (action === 'closed') {
            message = `An issue was closed by ${sender.login}  issue on ${repository.full_name}`;
        }
        if (action === 'reopened') {
            message = `An issue was reopened by ${sender.login}  issue on ${repository.full_name}`;
        }
        return message;
    }
}