import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api';

const SupplierForm = () => {
    const [supplier, setSupplier] = useState({ name: '', cnpj: '', email: '' })
    const navigate = useNavigate('/') //redirecionamento
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            axios.get(`/suppliers/${id}`)
            .then(response => {
             setSupplier(response.data)   
            })
            .catch(error => 
                console.error('Erro ao buscar o fornecedor', error))
            } else {
                setSupplier({ name: "", cnpj: "", email: ""})
            }
        }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'cnpj') {
            const formattedCnpj = formatarCNPJ(value);
            setSupplier(prevState => ({
                ...prevState,
                [name]: formattedCnpj
            }));
        } else {
            setSupplier(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    function formatarCNPJ(cnpj) {
        // Remove caracteres não numéricos
        cnpj = cnpj.replace(/\D/g, '');
      
        // Insere os pontos e a barra na formatação
        cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
        cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
        cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
      
        return cnpj;
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id ? `/suppliers/${id}` : '/suppliers';
    
        axios[method](url, supplier)
            .then(() => {
                alert(`Fornecedor ${id ? 'atualizado' : 'adicionado'} com sucesso!`)
                navigate("/listar-fornecedores");
            })
            .catch(error => console.error("Ocorreu um erro:", error));
    };
    

    return (
        
        <div className='container mt-5'>
            <h2> { id ? 'Editar Fornecedor' : 'Adicionar Fornecedor' } </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="name" name="name" value={supplier.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cnpj" className="form-label">CNPJ</label>
                    <input type="text" className="form-control" id="cnpj" name="cnpj" value={supplier.cnpj} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={supplier.email} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-success">Adicionar</button>
            </form>
        </div>
    );
};

export default SupplierForm;
