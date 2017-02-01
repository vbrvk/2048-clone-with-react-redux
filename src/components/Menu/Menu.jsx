import React from 'react';
import { Link } from 'react-router';

const Menu = () => (
  <div className="pt-navbar">
    <div style={{ margin: '0 auto', width: '440px' }}>
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading" style={{ fontSize: '30px' }}>2048</div>
      </div>
      <div className="pt-navbar-group pt-align-right">
        <Link href="#" className="pt-button pt-minimal pt-icon-layout-grid">
          Game
        </Link>
        <Link href="#saved" className="pt-button pt-minimal pt-icon-list">
          Saved games
        </Link>
        <Link href="#settings" className="pt-button pt-minimal pt-icon-settings">
          Settings
        </Link>
      </div>
    </div>
  </div>
);


export default Menu;
