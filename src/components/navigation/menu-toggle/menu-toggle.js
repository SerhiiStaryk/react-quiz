import classes from './menu-toggle.module.css';

const MenuToggle = props => {
  const cls = [
    classes.menuToggle,
    'fa',
  ]

  if (props.isOpen) {
    cls.push('fa-times');
    cls.push(classes.open);
  } else {
    cls.push('fa-bars')
  }

  return (
    <i
      className={cls.join(' ')}
      onClick={(props.onToggle)}
    />
  )
}

export default MenuToggle;