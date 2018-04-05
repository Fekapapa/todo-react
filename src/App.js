import React, { Component } from 'react';
import './App.scss';

import ProductItem from './productItem';
import AddProduct from './addProduct';

const products = [
  {
    name: 'iPad',
    price: 200,
    isDone: false
  },
  {
    name: 'iPhone',
    price: 650,
    isDone: false
  }
]

localStorage.setItem('products', JSON.stringify(products));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: JSON.parse(localStorage.getItem('products'))
    };

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.isDone = this.isDone.bind(this);
  }

  componentWillMount() {
    const products = this.getProducts();

    this.setState({ products });
  }

  getProducts() {
    return this.state.products
  }

  onAdd(name, price) {
    const products = this.getProducts();

    products.push({
      name,
      price
    });

    this.setState({ products });
  }

  onDelete(name) {
    const products = this.getProducts();

    const filteredProducts = products.filter(product => {
      return product.name !== name;
    })

    this.setState({ products: filteredProducts })
  }

  onEditSubmit(name, price, originalName) {
    let products = this.getProducts();

    products = products.map(product => {
      if (product.name === originalName) {
        product.name = name;
        product.price = price;
      }

      return product;
    });

    this.setState({ products });
  }

  isDone(name, eventTarget) {
    let tempProducts = products.map(product => {
      if (product.name === name) {
        if (product.isDone) {
          product.isDone = false;
        } else {
          product.isDone = true;
        }
        eventTarget.classList.toggle('button-done')

      }
      return product;
    });

    this.setState({ tempProducts })
  }

  render() {
    return (
      <div className="main-container">
        <div className="header">
          <span>Let's Do It! :)</span>
        </div>
        <div className="pseudo-body">
          <AddProduct onAdd={this.onAdd}/>
          <div className="grid-container">
            <div className="grid-item">
              <div className="column-title">To do</div>
              {
                this.state.products.map(product => {
                  return (
                    <ProductItem
                      key={product.name}
                      {...product}
                      onDelete={this.onDelete}
                      onEditSubmit={this.onEditSubmit}
                      isDone={this.isDone}
                    />
                  );
                })
              }
            </div>
            <div className="grid-item">
              <div className="column-title">Doing</div>
            </div>
            <div className="grid-item">
              <div className="column-title">Done</div>
            </div>
          </div>
        </div>
        <div className="footer">
          <span>Ferenc Hartmann's TODO React App</span>
        </div>
      </div>
    );
  }
}

export default App;
