import 'dotenv/config';
import {get} from  'env-var'

export const envs = {

    PORT : get("PORT").required().asPortNumber(),
    DISCORD_WEBHOOK : get("DISCORD_WEBHOOK").required().asString(),


}