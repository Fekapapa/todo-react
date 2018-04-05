import React, { Component } from 'react';
// import cardBackground from'./img/card_background.png';

class ProductItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false
    };

    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.isDone = this.isDone.bind(this);
  }

  onDelete() {
    const { onDelete, name } = this.props;

    onDelete(name);
  }

  onEdit() {
    this.setState({ isEdit: true });
  }


  onEditSubmit(event) {
    event.preventDefault();

    this.props.onEditSubmit(this.nameInput.value, this.priceInput.value, this.props.name);

    this.setState({ isEdit: false });
  }

  isDone(event) {
    event.preventDefault();

    this.props.isDone(this.props.name, event.target);
  }

  render() {
    const { name, price } = this.props;

    return (
      <div>
        {
          this.state.isEdit
          ? (
            <form onSubmit={this.onEditSubmit}>
              <input placeholder="Name" ref={nameInput => this.nameInput = nameInput } defaultValue={name}/>
              <input placeholder="Price" ref={priceInput => this.priceInput = priceInput } defaultValue={price}/>
              <button>Save</button>
            </form>
          )
          : (
            <div className="card">
              <span>{name}</span>
               <span>{price}</span>
              <button onClick={this.onEdit}>Edit</button>
              <button onClick={this.onDelete}>Delete</button>
              <button className="button-todo" onClick={this.isDone}>Click to ready / unready</button>
            </div>
          )
        }
      </div>

    );
  }
}

export default ProductItem;
