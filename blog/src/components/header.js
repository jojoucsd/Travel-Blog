import React from "react"
import { Link } from "gatsby"
import { Button } from "antd"
import PropTypes from "prop-types"

const mapStyle ={
  background: `black`,
}
const blogStyle={
  background: `black`,
  marginBottom: `1.45rem`,
  }

const buttonsArray = ['Map' , 'Blog', 'About Me']
const buttonsRoute = ['map' , '/', 'authors/User_1']

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
        {
          buttonsArray.map((name,i)=>
            <Button key= {i} style={{float:'right', backgroundColor:'black', border:'transprent', marginRight:'15px', left:'10px'}}>
            <Link
              to={buttonsRoute[i]}
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {name}
            </Link>
          </Button>
            )
        }
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
