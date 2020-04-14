import { siteMetadata } from '../../gatsby-config'

// move this logic to backend, leave this code here for future reference 

const Map_Box_API = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const Strapi_Dev='http://localhost:1337/'

const GeoLocation = async (data) => {
    const apiName = data.id.split('_')[0]
    const updateId = data.id.split('_')[1]
    const url = `${Strapi_Dev}${apiName}s/${updateId}`
    const updateStrapi = await fetch (url)
          .then(response => response.json())
          .then(result => result)
          return Promise.resolve(updateStrapi)
}

export default GeoLocation