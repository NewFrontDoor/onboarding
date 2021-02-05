import {createContext} from 'react';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
  // Find your project ID and dataset in `sanity.json` in your studio project
  projectId: '72cgurx6',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: true
  // UseCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
});

export default client;

/*************/
/** Context **/
/*************/

export const SanityContext = createContext(client);

/**************************/
/** Sanity image builder **/
/**************************/

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

/******************************************/
/** Fetch function which includes client **/
/******************************************/

export function fetchQuery(query, parameters) {
  return client.fetch(query, parameters);
}

/************************************************************/
/** Function to flatten portable text blocks to plain text **/
/************************************************************/

const defaults = {nonTextBehavior: 'remove'};

export function blocksToText(blocks, options_ = {}) {
  const options = Object.assign({}, defaults, options_);
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${block._type} block]`;
      }

      return block.children.map((child) => child.text).join('');
    })
    .join('\n\n');
}
