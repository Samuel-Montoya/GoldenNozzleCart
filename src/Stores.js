const products = [
  {
    price: "19.99",
    description: ["Exterior Soft Cloth Wash"]
  },
  {
    price: "24.99",
    description: ["Exterior Soft Cloth Wash", "Underbody Rinse", "Rim Cleaner"]
  },
  {
    price: "34.99",
    description: [
      "Exterior Soft Cloth Wash",
      "Underbody Rinse",
      "Rim Cleaner",
      "Clear Coat Conditioner",
      "Tire Shine"
    ]
  }
]

const exteriorProducts = [
  {
    price: "34.99",
    description: ["Soft Cloth Wash", "Interior Cleaning"]
  },
  {
    price: "44.99",
    description: ["Soft Cloth Wash", "Underbody Rinse", "Rim Cleaner"]
  },
  {
    price: "54.99",
    description: [
      "Soft Cloth Wash",
      "Underbody Rinse",
      "Rim Cleaner",
      "Clear Coat Conditioner",
      "Tire Shine"
    ]
  }
]

let combinedProducts = []
for (let i = 0; i <= products.length - 1; i++) {
  combinedProducts.push(products[i])
}
for (let i = 0; i <= exteriorProducts.length - 1; i++) {
  combinedProducts.push(exteriorProducts[i])
}
console.log(combinedProducts)

let stores = [
  {
    storeType: "Exterior",
    storeAddress: "520 Montgomery Street",
    storeCity: "Chicopee",
    storeState: "MA",
    storeZip: "01020",
    storePhone: "(413) 642-9053",
    products
  },
  {
    storeType: "Exterior",
    storeAddress: "204 N. Main Street",
    storeCity: "East Longmeadow",
    storeState: "MA",
    storeZip: "01028",
    storePhone: "(413) 642-9052",
    products
  },
  {
    storeType: "Exterior",
    storeAddress: "124 Northampton St.",
    storeCity: "Easthampton",
    storeState: "MA",
    storeZip: "01027",
    storePhone: "(413) 642-9051",
    products
  },
  {
    storeType: "Exterior",
    storeAddress: "58 Newton Street",
    storeCity: "Greenfield",
    storeState: "MA",
    storeZip: "01301",
    storePhone: "(413) 642-9056",
    products
  },
  {
    storeType: "Exterior",
    storeAddress: "456 Russell Rd (Rt. 9)",
    storeCity: "Hadley",
    storeState: "MA",
    storeZip: "01035",
    storePhone: "(413) 642-9050",
    products
  },
  {
    storeType: "Exterior",
    storeAddress: "425 Center Street",
    storeCity: "Ludlow",
    storeState: "MA",
    storeZip: "01056",
    storePhone: "(413) 642-9054",
    products
  },
  {
    storeType: "Exterior",
    storeAddress: "39 Green Street",
    storeCity: "Milford",
    storeState: "MA",
    storeZip: "01757",
    storePhone: "(508) 473-0644",
    products: [
      {
        price: "14.99",
        description: ["Exterior Soft Cloth Wash"]
      },
      {
        price: "19.99",
        description: [
          "Exterior Soft Cloth Wash",
          "Underbody Rinse",
          "Rim Cleaner"
        ]
      },
      {
        price: "29.99",
        description: [
          "Exterior Soft Cloth Wash",
          "Underbody Rinse",
          "Rim Cleaner",
          "Clear Coat Conditioner",
          "Tire Shine"
        ]
      }
    ]
  },
  {
    storeType: "Exterior",
    storeAddress: "492 Pleasant Street",
    storeCity: "Northampton",
    storeState: "MA",
    storeZip: "01060",
    storePhone: "(413) 584-1660",
    products
  },
  {
    storeType: "Exterior",
    storeAddress: "1050 South Street",
    storeCity: "Pittsfield",
    storeState: "MA",
    storeZip: "01201",
    storePhone: "(413) 642-9057",
    products
  },
  {
    storeType: "Exterior",
    storeAddress: "1315 Boston Road",
    storeCity: "Springfield",
    storeState: "MA",
    storeZip: "01119",
    storePhone: "(413) 642-9049",
    products
  },
  {
    storeType: "Full Serve",
    storeAddress: "915 East Columbus Ave",
    storeCity: "Springfield",
    storeState: "MA",
    storeZip: "01105",
    storePhone: "(413) 734-0330",
    products: combinedProducts
  },
  {
    storeType: "Exterior",
    storeAddress: "518 Memorial Ave",
    storeCity: "West Springfield",
    storeState: "MA",
    storeZip: "01089",
    storePhone: "(413) 642-9046",
    products
  },
  {
    storeType: "Exterior",
    storeAddress: "2685 Westfield Street (RT.20)",
    storeCity: "West Springfield",
    storeState: "MA",
    storeZip: "01089",
    storePhone: "(413) 642-9048",
    products
  },
  {
    storeType: "Exterior",
    storeAddress: "90 S. Maple Street",
    storeCity: "Westfield",
    storeState: "MA",
    storeZip: "01085",
    storePhone: "(413) 642-9047",
    products
  }
]

export default stores
