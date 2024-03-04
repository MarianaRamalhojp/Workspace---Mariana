import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api';

const CustomerForm = () => {
  const [customer, setCustomer] = useState({
    name: "",
    cpf: "",
    email: "",
    zipcode: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    country: ""
  });
  const [cepLoading, setCepLoading] = useState(false); // Adicionando o estado para o loading do CEP
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`/customers/${id}`)
        .then(response => {
          setCustomer(response.data);
        })
        .catch(error =>
          console.error('Erro ao buscar o cliente', error)
        );
    } else {
      setCustomer({
        name: "",
        cpf: "",
        email: "",
        zipcode: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        country: ""
      });
    }
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === 'cpf') {
      const formattedCpf = value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      setCustomer(prevState => ({
          ...prevState,
          [name]: formattedCpf
      }));
  } else {
      setCustomer(prevState => ({
          ...prevState,
          [name]: value
      }));
  }
};

  const handleSubmit = (event) => {
    event.preventDefault();
    const method = id ? 'put' : 'post';
    const url = id ? `/customers/${id}` : '/customers';

    axios[method](url, customer)
      .then(() => {
        alert(`Cliente ${id ? 'atualizado' : 'adicionado'} com sucesso!`);
        navigate('/listar-clientes');
      })
      .catch(error => console.error("Ocorreu um erro", error));
  };

  // Função para lidar com o evento onBlur do campo de CEP
  function handleCepBlur(event) {
    // Vai consultar a API dos Correios - pesquisar sobre digex
    const cep = event.target.value.replace(/\D/g, '');
    if (cep.length !== 8) {
      alert('O CEP deve conter apenas 8 dígitos');
      return;
    }
    setCepLoading(true);
    axios.get(`https://viacep.com.br/ws/${cep}/json`)
      .then(response => {
        if (response.data.error) {
          alert("CEP não encontrado");
          setCepLoading(false);
          return;
        }
        setCustomer(prevState => ({
          ...prevState,
          street: response.data.logradouro,
          neighborhood: response.data.bairro,
          city: response.data.localidade,
          state: response.data.uf,
          country: 'Brasil'
        }));
      })
      .catch(error => {
        console.error("Erro ao buscar informações do CEP", error);
        alert("Erro ao buscar informações do CEP");
      })
      .finally(() => {
        setCepLoading(false); // Atualizando o estado de loading do CEP após a requisição
      });
  };

  return (
    <div className="container mt-5">
     <h2>{id ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="name">Nome do Cliente</label>
      <input type="text" className="form-control" id="name" name="name" value={customer.name} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="cpf">CPF do cliente</label>
      <input type="text" className="form-control" id="cpf" name="cpf" value={customer.cpf} onChange={handleChange} maxLength={11} minLenght={11} required />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email do cliente</label>
      <input type="text" className="form-control" id="email" name="email" value={customer.email} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="zipcode">CEP</label>
      <input type="text" className="form-control" id="zipcode" name="zipcode" value={customer.zipcode} onChange={handleChange} onBlur={handleCepBlur} required />
      {cepLoading && <p>Buscando CEP...</p>}
    </div>
    <div className="form-group">
      <label htmlFor="street">Rua/logradouro</label>
      <input type="text" className="form-control" id="street" name="street" value={customer.street} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="number">Número</label>
      <input type="text" className="form-control" id="number" name="number" value={customer.number} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="neighborhood">Bairro</label>
      <input type="text" className="form-control" id="neighborhood" name="neighborhood" value={customer.neighborhood} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="city">Cidade</label>
      <input type="text" className="form-control" id="city" name="city" value={customer.city} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="state">Estado</label>
      <input type="text" className="form-control" id="state" name="state" value={customer.state} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="number">País</label>
      <input type="text" className="form-control" id="country" name="country" value={customer.country} onChange={handleChange} required />
    </div>
    <button type="submit" className="btn btn-success">{id ? 'Atualizar' : 'Adicionar'}</button>
  </form>
</div>
);
  };

export default CustomerForm;
