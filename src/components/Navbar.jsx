// import React from 'react'
// import { Link } from 'react-router-dom'

// const Navbar = () => {
//   return (
//     <nav className='menu'>
//         <div>
//             <Link to="/"> Painel de Controle </Link>
//             <Link to="/add-fornecedor"> Adicionar Fornecedor </Link>
//             <Link to="/listar-fornecedores">Listar Fornecedores </Link>
//             <Link to="/listar-produtos">Listar Produtos</Link>
//             <Link to="/add-produto"> Adicionar Produto</Link>
//         </div>
//     </nav>
//   )
// }

// export default Navbar

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='menu'>
      <div className="menu-container">
        <Link to="/" className="menu-item">Painel de Controle</Link>
        <div className="submenu">
          <Link to="/fornecedores" className="menu-item">Fornecedores</Link>
          <div className="submenu-content">
            <Link to="/add-fornecedor">Adicionar Fornecedor</Link>
            <Link to="/listar-fornecedores">Listar Fornecedores</Link>
          </div>
        </div>
        <div className="submenu">
          <Link to="/produtos" className="menu-item">Produtos</Link>
          <div className="submenu-content">
            <Link to="/add-produto">Adicionar Produto</Link>
            <Link to="/listar-produtos">Listar Produtos</Link>
          </div>
        </div>
        <div className="submenu">
          <Link to="/clientes" className="menu-item">Clientes</Link>
          <div className="submenu-content">
            <Link to="/add-cliente">Adicionar Cliente</Link>
            <Link to="/listar-clientes">Listar Clientes</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
