import express from 'express';
import { envs } from './config';
import { GitHubController } from './presentation/github/controller';
import { GitHubMiddleware } from './presentation/middleware/github-sha256.middleware';

(()=>{
main();
})();


function main() {
    const app= express();
    const controller = new GitHubController();
    app.use(express.json());
    app.use(GitHubMiddleware.verifySignature);
    app.post('/api/github', controller.weebHookHandler);
    app.listen(envs.PORT,()=>{
        console.log(`Server is running on port ${envs.PORT}`);
    });
}