import { Component } from 'react';
import classes from './drawer.module.css';
import Backdrop from '../../UI/backdrop/backdrop';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'List quiz', exact: true },
  { to: '/auth', label: 'Auth', exact: false },
  { to: '/quiz-creator', label: 'Create test', exact: false },
]

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks() {
    return links.map((link, index) => (
      <li key={index}>
        <NavLink
          to={link.to}
          exact={`${link.exact}`}
          onClick={this.clickHandler}
          className={({ isActive }) =>
            isActive ? classes.active : ""
          }
        >
          {link.label}
        </NavLink>
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