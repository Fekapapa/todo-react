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

    this.props.onEditSubmit(this.nameInput.value, this.props.name);

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
              <button>Save</button>
            </form>
          )
          : (
            <div className="card">
              <div className="card-header">
                <span className="card-button" onClick={this.onEdit}>Edit</span>
                <span className="card-button" onClick={this.isDone}>Set state</span>
                <span className="card-button-delete" onClick={this.onDelete}></span>
              </div>
              <div className="card-text">{name}</div>
            </div>
          )
        }
      </div>

    );
  }
}

export default ProductItem;
