import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../api';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/customers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => console.error("Ocorreu um erro ao listar os clientes:", error));
    }, []);
  
  function deleteCustomer(id) {
    axios.delete(`/customers/${id}`)
    .then(() => {
      alert('Cliente excluído com sucesso');
      useEffect(() => {
        axios.get('/customers')
          .then(response => {
            setCustomers(response.data);
          })
          .catch(error => console.error("Ocorreu um erro ao listar os clientes:", error));
      }, []);
    })
    .catch(error => console.error("Ocorreu um erro:", error));
}

  return (
    <div className='container mt-5'>
      <h2 className='mb-4 text-center'>Lista de Clientes</h2>
      <button onClick={() => navigate('/add-cliente')} className='btn btn-primary mb-2 d-grid mx-auto'>Adicionar Cliente</button>
        <table className='table'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Rua</th>
              <th>Número</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>País</th>
              <th>Ações</th> 
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.cpf}</td>
                <td>{customer.email}</td>
                <td>{customer.street}</td>
                <td>{customer.number}</td>
                <td>{customer.neighborhood}</td>
                <td>{customer.city}</td>
                <td>{customer.state}</td>
                <td>{customer.country}</td>
                <td>
                <button className='btn btn-sm btn-warning mr-2' onClick={() => navigate(`/editar-cliente/${customer.id}`)}>Editar</button>
                <button onClick={() => deleteCustomer(customer.id)} className='btn btn-danger btn-sm'>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default CustomerList
