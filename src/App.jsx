import { React } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import SupplierList from './pages/Supplier/SupplierList'
import SupplierForm from './pages/Supplier/SupplierForm'
import ProductList from './pages/Products/ProductList'
import ProductForm from './pages/Products/ProductForm'
import CustomerList from './pages/Customers/CustomerList'
import CustomerForm from './pages/Customers/CustomerForm'
import Supplier from './pages/Supplier/Supplier'
import Product from './pages/Products/Product'
import Customer from './pages/Customers/Customer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


const App = () => {
  
  return (
    
    <BrowserRouter>
        <Navbar />
        <div className='container'>
        <Routes> 
          <Route path='/' element={<SupplierList />} />
          <Route path='/add-fornecedor' element={<SupplierForm /> } />
          <Route path='/listar-fornecedores' element={<SupplierList />} />
          <Route path='/editar-fornecedor/:id' element={<SupplierForm />} />
          <Route path='/listar-produtos' element={<ProductList />} />
          <Route path='/add-produto' element={<ProductForm/>} /> 
          <Route path='/editar-produto/:id' element={<ProductForm />} />
          <Route path='/add-cliente' element={<CustomerForm /> } />
          <Route path='/listar-clientes' element={<CustomerList />} />
          <Route path='/editar-cliente/:id' element={<CustomerForm />} />
          <Route path='/fornecedores' element={<Supplier />} />
          <Route path='/produtos' element={<Product />} />
          <Route path='/clientes' element={<Customer />} />
        </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
