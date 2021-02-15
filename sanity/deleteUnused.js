/* eslint-disable no-console */
import client from 'part:@sanity/base/client';

const query = `*[_type in ["sanity.imageAsset", "sanity.fileAsset"] && count(*[references(^._id)]) == 0]._id`;

client
  .fetch(query)
  .then((ids) => {
    if (ids.length === 0) {
      console.log('No assets to delete');
      return true;
    }

    console.log(`Deleting ${ids.length} assets`);
    return ids
      .reduce((transaction, id) => transaction.delete(id), client.transaction())
      .commit()
      .then(() => console.log('Done'));
  })
  .catch((error) => {
    console.error(error.stack);
  });
