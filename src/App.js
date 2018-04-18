import React, { Component } from "react"
import "./App.css"
import Stores from "./Stores"
import axios from "axios"
import { Spin } from "react-loading"
import passImage from "./resources/washpass.jpg"
import ReactLoading from "react-loading"

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
          <img
            src={passImage}
            alt=""
            style={{ marginBottom: "30px", width: "300px" }}
          />
          <h1
            style={{
              marginBottom: "30px",
              fontSize: "24px",
              width: "180%",
              textAlign: "center",
              fontWeight: "300",
              color: "rgb(220, 15, 15)"
            }}
          >
            Enter your zip code for location(s) near{" "}
            <span style={{ fontWeight: "600" }}>you!</span>
          </h1>
          <section
            style={{
              width: "100%",
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
            Find Unlimited Wash Pass Plans
          </button>
        </div>

        <div className="stores_container">
          {this.state.isSearching ? (
            <ReactLoading type="spin" color="#2f3094" delay={0} />
          ) : (
            this.renderStores()
          )}
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
        // Copy the stores array so it doesn't get changed.
        let storeLocations = JSON.parse(JSON.stringify(Stores))

        // Sort all the zip codes by distance.
        let zipCodes = response.data.zip_codes.sort((a, b) => {
          return a.distance - b.distance
        })

        let storesNearBy = []

        for (let i = 0; i < storeLocations.length; i += 1) {
          for (let j = 0; j < zipCodes.length; j += 1) {
            if (storeLocations[i].storeZip === zipCodes[j].zip_code) {
              storeLocations[i].distance = zipCodes[j].distance
              storesNearBy.push(storeLocations[i])
            }
          }
        }

        storesNearBy.sort((a, b) => {
          return a.distance - b.distance
        })

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
                  {key2 >= 3 && (
                    <p
                      style={{
                        fontSize: "12px",
                        textAlign: "center",
                        marginTop: "-5px",
                        color: "red",
                        marginBottom: "15px"
                      }}
                    >
                      Includes Towel Drying, Washing Inside Windows, Vacuuming
                      Interior and Dusting of Dashboard.
                    </p>
                  )}
                  <p>Plan Includes: </p>
                  <ul style={key2 >= 3 ? { marginBottom: "80px" } : null}>
                    {product.description.map((desc, key3) => (
                      <li key={key3}>{desc}</li>
                    ))}
                  </ul>
                </section>
                <section
                  className="purchase_container"
                  style={{ textAlign: "center" }}
                >
                  <h2 style={{ color: "#dc0f0f" }}>
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
}

export default App
