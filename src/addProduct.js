import React, { Component } from 'react';

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onAdd(this.nameInput.value);

    this.nameInput.value = '';
  }

  render() {
    return (
      <form className="form-field" onSubmit={this.onSubmit}>
        <input placeholder="Name" ref={nameInput => this.nameInput = nameInput } />
        <button>Add</button>
      </form>
    );
  }
}

export default AddProduct;
