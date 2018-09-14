export const backendUrl = process.env.API_URL ? process.env.API_URL : "http://uniclix.test";

export const apiUrl = `${backendUrl}/api`;

export const oathTokenUrl = `${backendUrl}/oauth/token`;

export const twitterRequestTokenUrl = `${apiUrl}/twitter/reverse`;

export const twitterAccessTokenUrl = `${apiUrl}/twitter/access`;

export const clientId = process.env.CLIENT_ID ? process.env.CLIENT_ID : 1;

export const clientSecret = process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : 'SPZ82BtU1zDeeazQgg4jQJZ1RPmHNHM2dxfBSvKQ';