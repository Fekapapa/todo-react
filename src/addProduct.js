import React, { Component } from 'react';

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onAdd(this.nameInput.value, this.priceInput.value);

    this.nameInput.value = '';
    this.priceInput.value = '';
  }

  render() {
    return (
      <form className="form-field" onSubmit={this.onSubmit}>
        <input placeholder="Name" ref={nameInput => this.nameInput = nameInput } />
        <input placeholder="Price" ref={priceInput => this.priceInput = priceInput } />
        <button>Add</button>
      </form>
    );
  }
}

export default AddProduct;
