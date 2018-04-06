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
    this.setStatus = this.setStatus.bind(this);
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

  setStatus(event) {
    event.preventDefault();
    const { setStatus, id } = this.props;
    let status = event.target.getAttribute('data-status');

    setStatus(id, status);
  }

  render() {
    const { name } = this.props;

    return (
      <div>
        {
          this.state.isEdit
          ? (
            <form className="card card-background" onSubmit={this.onEditSubmit}>
              <div className="card-header">
                <span className="card-header-text">Editing...</span>
                <input className="card-button" type="submit" value="Save"/>
                <span className="card-button" onClick={this.onEditBack}>Back</span>
              </div>
                <div className="card-text card-invisible">{name}</div>
                <textarea autoFocus name="text" wrap="soft" className="card-text card-textarea" defaultValue={name} ref={nameInput => this.nameInput = nameInput }></textarea>
            </form>
          )
          : (
            <div className="card card-background">
              <input className="card-checkbox" id={this.props.id} type="checkbox"/>
              <div className="card-header">
                <div className="card-header-menu">
                  <span className="card-button" onClick={this.onEdit} data-id={this.props.id} data-edit={this.props.autoEdit}>Edit</span>
                  <label className="card-button" htmlFor={this.props.id}>Change status</label>
                </div>
                <div className="card-status-submenu">
                  <span className="card-status-submenu-element card-button" data-status="todo" onClick={this.setStatus}>Set todo</span>
                  <span className="card-status-submenu-element card-button" data-status="doing" onClick={this.setStatus}>Set doing</span>
                  <span className="card-status-submenu-element card-button" data-status="done" onClick={this.setStatus}>Set done</span>
                </div>
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
