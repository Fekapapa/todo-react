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
    this.onEditBack = this.onEditBack.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.statusMenu = this.statusMenu.bind(this);
  }

  componentDidMount() {
    if (this.props.autoEdit) {
      let myList = document.querySelectorAll('[data-id]');
      Array.from(myList).forEach(node => {
        let tempData = node.getAttribute('data-edit');
        if (tempData === 'true') {
          node.click();
        }
      });
    }
  }

  onDelete() {
    const { onDelete, id } = this.props;

    onDelete(id);
  }

  onEdit() {
    this.setState({ isEdit: true });
  }

  onEditBack() {
    this.setState({ isEdit: false });
  }

  onEditSubmit(event) {
    event.preventDefault();

    this.props.onEditSubmit(this.nameInput.value, this.props.id);

    this.setState({ isEdit: false });
  }

  statusMenu(event) {
    event.preventDefault();

    this.props.statusMenu(this.props.name, event.target);
  }

  render() {
    const { name } = this.props;

    return (
      <div>
        {
          this.state.isEdit
          ? (
            <form className="card" onSubmit={this.onEditSubmit}>
              <div className="card-header">
                <span className="card-header-text">Editing...</span>
                <input className="card-button" type="submit" value="Save"/>
                <span className="card-button" onClick={this.onEditBack}>Back</span>
              </div>
                <div className="card-text card-invisible">{name}</div>
                <textarea autoFocus name="text" wrap="soft" className="card-text card-textarea" placeholder="Name" ref={nameInput => this.nameInput = nameInput } defaultValue={name}></textarea>
            </form>
          )
          : (
            <div className="card">
              <div className="card-header">
                <span className="card-button" onClick={this.onEdit} data-id={this.props.id} data-edit={this.props.autoEdit}>Edit</span>
                <span className="card-button" onClick={this.statusMenu}>Change status</span>
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
