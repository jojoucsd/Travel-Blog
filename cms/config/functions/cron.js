'use strict';
const fetch = require('node-fetch');

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/3.0.0-beta.x/concepts/configurations.html#cron-tasks
 */


module.exports = {
  '0 * * ? * *' : async () =>{
    // fetch articles to check geolocation
    const placeAPI ="https://api.mapbox.com/geocoding/v5/mapbox.places/"
    const mapboxToken =  strapi.config.environments.development.mapboxToken

    const articlesNeedsToGeoTag = await strapi.api.article.services.article.find({
      isGeo: false,
      })

      if (articlesNeedsToGeoTag.length > 0){
        console.log('success', articlesNeedsToGeoTag)
        let geoCenter
        articlesNeedsToGeoTag.forEach(async (article) => {
          const geoCode = await fetch (`${placeAPI}${article.location}.json?limit=1&access_token=${mapboxToken}`)
          .then(response => response.json())
          .then(result => geoCenter = result.features[0].center)
          .catch(err => console.log('geoCode err',err))
          const updateStrapi = await strapi.api.article.services.article.update(
            {id: article.id},
            { isGeo: true,
              geolocation: {lat: geoCode[1] , lng: geoCode[0]}
            }
          )
      })
    }
  }
};
