import { siteMetadata } from '../../gatsby-config'
const Map_Box_API_Base = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const Strapi_Dev_Base='http://localhost:1337/'
// const Strapi_Prod_Base='https://family-travel-blog.herokuapp.com/'

const GeoLocation = async (data) => {
    // console.log('data', data)
    const apiName = data.id.split('_')[0]
    const updateId = data.id.split('_')[1]
    const getGeocode = await fetch (`${Map_Box_API_Base}${data.location}.json?limit=1&access_token=${siteMetadata.mapboxToken}`)
    .then(response => response.json())
    .then(result => result.features[0].center)
    // console.log(getGeocode)
    const url = `${Strapi_Dev_Base}${apiName}s/${updateId}`
    // console.log(url)
    const updateStrapi = await fetch (url,{
        method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                geolocation: { lat: getGeocode[1] , lng:getGeocode[0]},
                isGeo: true
             }),
            json: true 
          })
          .then(response => response.json())
          .then(result => result)
          return Promise.resolve(updateStrapi)
}

export default GeoLocation