import React, { Component } from "react"
import "./App.css"
import Stores from "./Stores"
import axios from "axios"
require("dotenv").config()

class App extends Component {
  constructor() {
    super()

    this.state = {
      zip: "01020",
      distance: "5",
      storesToDisplay: []
    }
  }
  render() {
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
          <section>
            <input
              className="input"
              placeholder="Zip Code..."
              value={this.state.zip}
              onChange={input => this.setState({ zip: input.target.value })}
            />
            <input
              value={this.state.distance}
              onChange={input =>
                this.setState({ distance: input.target.value })
              }
              className="input miles_input"
              placeholder="25"
            />
            <label>Miles</label>
          </section>
          <button onClick={this.getStoresNearZip}>Find Products</button>
        </div>

        <div className="products_container">{this.renderProducts()}</div>
      </div>
    )
  }

  getStoresNearZip = () => {
    axios
      .get(
        `https://www.zipcodeapi.com/rest/${
          process.env.REACT_APP_API_KEY
        }/radius.json/${this.state.zip}/${this.state.distance}/mile`
      )
      .then(response => {
        const zipCodes = response.data.zip_codes

        let storesNearBy = []
        for (let i = 0; i < Stores.length; i += 1) {
          for (let j = 0; j < zipCodes.length; j += 1) {
            if (Stores[i].storeZip === zipCodes[j].zip_code) {
              storesNearBy.push(Stores[i])
            }
          }
        }

        this.setState({
          storesToDisplay: storesNearBy
        })
      })
  }

  renderProducts = () =>
    this.state.storesToDisplay.map((store, key) => {
      return (
        <div key={key} style={{ marginBottom: "15px" }}>
          <h1>{store.storeName}</h1>
          <h1>
            {store.storeCity} {store.storeState}, {store.storeZip}
          </h1>
          <h1>{store.storeAddress}</h1>
          <h1>{store.storePhone}</h1>
          <h1>${store.washpassPrice}</h1>
        </div>
      )
    })
}

export default App
