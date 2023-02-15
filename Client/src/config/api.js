export const backendUrl = process.env.API_URL ? process.env.API_URL : "https://uniclix.test";

export const apiUrl = `${backendUrl}/api`;

export const oathTokenUrl = `${backendUrl}/oauth/token`;

export const twitterRequestTokenUrl = `${apiUrl}/twitter/reverse`;

export const twitterAccessTokenUrl = `${apiUrl}/twitter/access`;

export const clientId = process.env.CLIENT_ID ? process.env.CLIENT_ID : 1;

export const clientSecret = process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : 'N1zvzdmDKe04kqzYG95x1bYQFb5wa5DSPCrMUjTF';

export const facebookAppId = process.env.FACEBOOK_APP_ID ? process.env.FACEBOOK_APP_ID : '256286968360427';

export const linkedinAppId = process.env.LINKEDIN_APP_ID ? process.env.LINKEDIN_APP_ID : '77d3j1o1cby4cc';

export const pinterestAppId = process.env.PINTEREST_APP_ID ? process.env.PINTEREST_APP_ID : '5005154042182128975';

export const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY ? process.env.STRIPE_PUBLISHABLE_KEY : "";

