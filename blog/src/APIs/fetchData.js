const Strapi_Dev='http://localhost:1337/'
// const Strapi_Prod='https://family-travel-blog.herokuapp.com/'

const fetchData = async (data) => {
    const liveArticles = await fetch(`${Strapi_Dev}${data}`)
    // const liveArticles = await fetch(`${Strapi_Prod}${data}`)
    .then(response=>response.json())
    .then(result=>result)
    return Promise.resolve(liveArticles)
}
export default fetchData