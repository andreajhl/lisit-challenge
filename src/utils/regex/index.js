import { MATCH_NUMBER } from '../../constants/regext';

const matchRegex = (text, regex) => text.match(regex)?.[0] ?? '';

export const matchNumber = (text) => matchRegex(text, MATCH_NUMBER);
