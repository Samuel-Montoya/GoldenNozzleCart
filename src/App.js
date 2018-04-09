import React, { Component } from "react"
import "./App.css"
import Stores from "./Stores"
import axios from "axios"
require("dotenv").config()

class App extends Component {
  constructor() {
    super()

    this.state = {
      zip: "01105",
      distance: "5",
      storesToDisplay: Stores.map((store, index) => {
        return store
      }),
      // storesToDisplay: [],
      isSearching: false
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="main_container">
        <header className="header_container">
          <div className="header_logo_container">
            <img
              src="https://websiteconnect.drb.com/Portals/goldennozzle/Skins/goldennozzle/images/page-logo.png"
              alt=""
            />
          </div>

          <div className="header_bar_container">
            <section>
              <h1>Home</h1>
              <h1>Locations</h1>
              <h1>Unlimited Wash Pass</h1>
            </section>
          </div>
        </header>

        <div className="search_container">
          <section
            style={{
              height: "25px",
              width: "300px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <input
              className="input"
              placeholder="Zip Code..."
              value={this.state.zip}
              onChange={input => this.setState({ zip: input.target.value })}
            />
            <select
              className="miles_input"
              onChange={input =>
                this.setState({ distance: input.target.value })
              }
              value={this.state.distance}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </select>
            <label>Miles</label>
          </section>
          <button
            className="add_to_cart_button"
            onClick={this.getStoresNearZip}
          >
            Find Products
          </button>
        </div>

        <div className="stores_container">
          {this.state.isSearching ? <h1>Searching...</h1> : this.renderStores()}
        </div>
      </div>
    )
  }

  getStoresNearZip = () => {
    this.setState({
      storesToDisplay: [],
      isSearching: true
    })
    axios
      .get(
        `https://www.zipcodeapi.com/rest/${
          process.env.REACT_APP_API_KEY
        }/radius.json/${this.state.zip}/${this.state.distance}/mile`
      )
      .then(response => {
        let StoresToMap = JSON.parse(JSON.stringify(Stores))

        let zipCodes = response.data.zip_codes.sort((a, b) => {
          // Sort all the zip codes by distance
          return a.distance - b.distance
        })

        let sortedStores = StoresToMap.sort(a => {
          // Sort all stores by entered zip code, so that the one they entered comes first.
          return a.zipCode === this.state.zipCode
        }).reverse()

        let storesNearBy = []

        let amountToShow = this.state.distance <= 5 ? 1 : 10

        for (let i = 0; i < sortedStores.length; i += 1) {
          for (let j = 0; j < zipCodes.length; j += 1) {
            if (
              sortedStores[i].storeZip === zipCodes[j].zip_code &&
              storesNearBy.length < amountToShow
            ) {
              storesNearBy.push(sortedStores[i])
            }
          }
        }

        this.setState({
          storesToDisplay: storesNearBy,
          isSearching: false
        })
      })
  }

  renderStores = () =>
    this.state.storesToDisplay.map((store, key) => {
      return (
        <React.Fragment key={key}>
          <div className="store_container">
            <h1>Golden Nozzle Car Wash - {store.storeType}</h1>
            <h2>
              {store.storeCity} {store.storeState}, {store.storeZip}
            </h2>
            <h2>{store.storeAddress}</h2>
            <h3>{store.storePhone}</h3>
          </div>

          <div className="products_container">
            {store.products.map((product, key2) => (
              <div className="product_container">
                <img
                  src="https://websiteconnect.drb.com/Portals/goldennozzle/ItemGraphics/store-unlimited_wash_pass.png"
                  alt=""
                />
                <section className="product_info_container">
                  <h1 style={{ textAlign: "center" }}>
                    <span style={{ color: "#2f3094" }}>Unlimited</span>
                    <br />
                    <span style={{ fontSize: "20px" }}>
                      {key2 <= 2 ? "Exterior" : "Interior & Exterior"} Plan{" "}
                      {key2 <= 2 ? key2 + 1 : key2 - 2}
                    </span>
                  </h1>
                  <p>Plan Includes: </p>
                  <ul>
                    {product.description.map((desc, key3) => (
                      <li key={key3}>{desc}</li>
                    ))}
                  </ul>
                </section>
                <section
                  className="purchase_container"
                  style={{ textAlign: "center" }}
                >
                  <h2 style={{ color: "limegreen" }}>
                    ${product.price}{" "}
                    <span style={{ fontSize: "14px", color: "gray" }}>
                      {" "}
                      / monthly
                    </span>
                  </h2>
                  <button className="add_to_cart_button">Add To Cart</button>
                </section>
              </div>
            ))}
          </div>
        </React.Fragment>
      )
    })

  renderProducts = () =>
    this.state.storesToDisplay.map((store, key) => {
      return (
        <div className="product_container" key={key}>
          <img
            src="https://websiteconnect.drb.com/Portals/goldennozzle/ItemGraphics/store-unlimited_wash_pass.png"
            alt=""
          />
          <section className="product_info_container">
            <h1>
              <span style={{ color: "#2f3094" }}>Unlimited Wash Plan</span> -
              Exterior
            </h1>
            <p>Plan Includes: </p>
            <ul>
              <li>Exterior Soft Cloth Wash</li>
            </ul>
          </section>

          <section style={{ textAlign: "center" }}>
            <h1 style={{ color: "limegreen" }}>${store.washpassPrice}</h1>
            <button className="add_to_cart_button">Add To Cart</button>
          </section>
        </div>
      )
    })
}

export default App
