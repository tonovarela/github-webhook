import { Response, Request, NextFunction } from 'express'
import * as crypto from "crypto";
import { envs } from '../../config';

const verify_signature = (req: Request) => {

    const WEBHOOK_SECRET: string = envs.SECRET_TOKEN;
    try {
        const signature = crypto
            .createHmac("sha256", WEBHOOK_SECRET)
            .update(JSON.stringify(req.body))
            .digest("hex");
        const scopeSignature = req.header("x-hub-signature-256") ?? '';
        let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
        let untrusted = Buffer.from(scopeSignature, 'ascii');
        return crypto.timingSafeEqual(trusted, untrusted);
    } catch (e) {
        return false
    }

};


export class GitHubMiddleware {
    static verifySignature(req: Request, res: Response, next: NextFunction) {
        if (!verify_signature(req)) {
            res.status(401).send("Unauthorized");
            return;
        }
        next();
    }
}