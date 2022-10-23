import 'dotenv/config';
import Bot from '@/Bot';
import Logger from '@/telemetry/logger';
import knex from 'knex';
import knexfile from '../knexfile';
import {Model} from 'objection';
import {MessageCreateEvent} from './events/MessageCreateEvent';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {Maybe} from '@/types/util';
import {KortebroekCommand} from '@/commands/KortebroekCommand';
import {PingCommand} from '@/commands/PingCommand';
import {StufiCommand} from '@/commands/StufiCommand';
import {HelpCommand} from '@/commands/HelpCommand';
import {WhereMemeCommand} from '@/commands/WhereMemeCommand';

const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID ?? '';
const DISCORD_TOKEN = process.env.DISCORD_TOKEN ?? '';

const logger = new Logger('wego-overseer:index');

export let bot: Maybe<Bot> = null;

// Setup knex connection for objection
Model.knex(knex(knexfile));

dayjs.extend(utc);
dayjs.extend(timezone);

(async () => {
    bot = new Bot({
        applicationId: DISCORD_APPLICATION_ID,
        token: DISCORD_TOKEN,
        commands: [
            PingCommand,
            KortebroekCommand,
            StufiCommand,
            WhereMemeCommand,
            HelpCommand,
        ],
        events: [MessageCreateEvent],
    });

    try {
        const client = await bot.boot();
        logger.info(`Bot now ready and listening as '${client.user?.tag}'`);
    } catch (err) {
        logger.fatal(err);
    }
})();
