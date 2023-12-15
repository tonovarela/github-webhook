import 'dotenv/config';
import {get} from  'env-var'

export const envs = {

    PORT : get("PORT").required().asPortNumber(),
    DISCORD_WEBHOOK : get("DISCORD_WEBHOOK").required().asString(),
    SECRET_TOKEN : get("SECRET_TOKEN").required().asString()


}