import React, { Component } from 'react';
import './App.scss';

import ProductItem from './productItem';

const products = [
  {
    name: 'Get the dragged data with the dataTransfer.getData() method. This method will return any data that was set to the same type in the setData() method',
    id: 0,
    status: 'todo',
    autoEdit: false
  },
  {
    name: 'iPhone',
    id: 1,
    status: 'doing',
    autoEdit: false
  },
  {
    name: 'alma',
    id: 2,
    status: 'done',
    autoEdit: false
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
    this.idSetter = this.idSetter.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.setStatus = this.setStatus.bind(this);
  }

  componentWillMount() {
    const products = this.getProducts();

    this.setState({ products });
  }

  getProducts() {
    return this.state.products
  }

  onAdd(event) {
    event.preventDefault();

    const products = this.getProducts();
    const name = 'My to-do is...';
    const autoEdit = true;

    let status = event.target.getAttribute('data-status');
    let id = this.idSetter(products);

    products.push({ name, id, status, autoEdit });

    this.setState({ products });
  }

  idSetter(products, tempId = 0) {
    Object.keys(products).forEach(function(key) {
      products[key].autoEdit = false;

      if (products[key].id >= tempId) {
        tempId = products[key].id + 1;
      }
    });

    return tempId
  }

  onDelete(id) {
    const products = this.getProducts();

    const filteredProducts = products.filter(product => {
      return product.id !== id;
    })

    this.setState({ products: filteredProducts })
  }

  onEditSubmit(name, id) {
    let products = this.getProducts();

    Object.keys(products).forEach(function(key) {
      if (products[key].id === id) {
        products[key].name = name;
      }
    });
    this.setState({ products });
  }

  setStatus(id, status) {
    let products = this.getProducts();

    Object.keys(products).forEach(function(key) {
      if (products[key].id === id) {
        products[key].status = status;
      }
    });

    this.setState({ products });
  }

  render() {
    return (
      <div className="main-container">
        <div className="header">
          <span>Let's Do It! :)</span>
        </div>
        <div className="pseudo-body">
          <div className="grid-container">
            <div className="grid-item todo">
              <div className="column-title">I have to do...</div>
              {
                this.state.products.map(product => {
                  let productList;
                  if (product.status === 'todo') {
                    productList =
                     <ProductItem
                      key={product.id}
                      {...product}
                      onDelete={this.onDelete}
                      onEditSubmit={this.onEditSubmit}
                      setStatus={this.setStatus}
                    />
                  }
                  return productList
                })
              }
              <div className="column-add-card" data-status="todo" onClick={this.onAdd}>Add a card...</div>
            </div>
            <div className="grid-item doing">
              <div className="column-title">I'm doing...</div>
                {
                  this.state.products.map(product => {
                    let productList;
                    if (product.status === 'doing') {
                      productList =
                       <ProductItem
                        key={product.id}
                        {...product}
                        onDelete={this.onDelete}
                        onEditSubmit={this.onEditSubmit}
                        setStatus={this.setStatus}
                      />
                    }
                    return productList
                  })
                }
              <div className="column-add-card" data-status="doing" onClick={this.onAdd}>Add a card...</div>
            </div>
            <div className="grid-item done">
              <div className="column-title">I've done this all!</div>
                {
                  this.state.products.map(product => {
                    let productList;
                    if (product.status === 'done') {
                      productList =
                       <ProductItem
                        key={product.id}
                        {...product}
                        onDelete={this.onDelete}
                        onEditSubmit={this.onEditSubmit}
                        setStatus={this.setStatus}
                      />
                    }
                    return productList
                  })
                }
              <div className="column-add-card" data-status="done" onClick={this.onAdd}>Add a card...</div>
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
