import { Link } from "gatsby"
import { Button } from "antd"
import PropTypes from "prop-types"
import React from "react"

const mapStyle ={
  background: `black`,
}
const blogStyle={
  background: `black`,
  marginBottom: `1.45rem`,
  }

const Header = ({ siteTitle, content }) => (
  <header
    style={content === 'map' ? mapStyle: blogStyle}
  >
    <div
      style={{
        margin: `0 auto`,
        // maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >

      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
        <Button style={{float:'right', backgroundColor:'black', border:'transprent', marginRight:'15px', left:'10px'}}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            Blog
          </Link>
        </Button>
        <Button style={{float:'right', backgroundColor:'black', border:'transprent',}}>
        <Link
          to="/map"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          Map
          </Link>
        </Button>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
