import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Nav.module.scss'
export default function Nav() {
  return (
    <div className={styles.Nav}>
        <NavLink to='/employee'>Employee</NavLink>
        <NavLink to='/passenger'>Passenger</NavLink>
    </div>
  )
}
