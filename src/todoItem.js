import React, { Component } from 'react';

class TodoItem extends Component {
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
    this.props.onEditBack(this.props.id);
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
                <input className="card-button" type="submit" value="Save" title="Click here to save the text in the todo card"/>
                <span className="card-button" onClick={this.onEditBack} title="Click here to exit editing without save">Back</span>
              </div>
                <div className="card-text card-invisible">{name}</div>
                <textarea autoFocus name="text" wrap="soft" className="card-text card-textarea" defaultValue={name} placeholder="My todo is..." ref={nameInput => this.nameInput = nameInput }></textarea>
            </form>
          )
          : (
            <div className="card card-background">
              <input className="card-checkbox" id={this.props.id} type="checkbox"/>
              <div className="card-header">
                <div className="card-header-menu">
                  <span className="card-button" onClick={this.onEdit} data-id={this.props.id} data-edit={this.props.autoEdit} title="Click here to edit the text of this todo card">Edit</span>
                  <label className="card-button" htmlFor={this.props.id} title="Click here to open the Status Change Menu">Change status</label>
                </div>
                <div className="card-status-submenu">
                  <span id="todo-button" className="card-status-submenu-element card-button" data-status="todo" onClick={this.setStatus} title="Click here to set the status of this todo card to 'todo'">Set todo</span>
                  <span id="doing-button" className="card-status-submenu-element card-button" data-status="doing" onClick={this.setStatus} title="Click here to set the status of this todo card to 'doing'">Set doing</span>
                  <span id="done-button" className="card-status-submenu-element card-button" data-status="done" onClick={this.setStatus} title="Click here to set the status of this todo card to 'done'">Set done</span>
                </div>
                <span className="card-button-delete" onClick={this.onDelete} title="Click here to delete this todo card"></span>
              </div>
              <div className="card-text">{name}</div>
            </div>
          )
        }
      </div>
    );
  }
}

export default TodoItem;
