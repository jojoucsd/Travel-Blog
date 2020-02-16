import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const SecondPage = () => (
  <Layout>
    <h1>Hi Ling's Personal</h1>
    <p>Welcome about page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
