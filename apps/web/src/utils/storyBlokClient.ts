import StoryblokClient from 'storyblok-js-client';
import { STORYBLOK_ACCESS_TOKEN } from './constants';



export const storyblokClient = new StoryblokClient({
  accessToken: STORYBLOK_ACCESS_TOKEN,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
});
