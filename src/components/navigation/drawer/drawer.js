import { Component } from 'react';
import classes from './drawer.module.css';
import Backdrop from '../../UI/Backdrop/backdrop';

const links = [
  1, 2, 3
]

class Drawer extends Component {
  renderLinks() {
    return links.map((link, index) => (
      <li key={index}>
        <a href="#">Link {link}</a>
      </li>
    ))
  };

  render() {
    const cls = [
      classes.drawer
    ]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }
    return (
      <>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
      </>
    )
  }
}

export default Drawer;