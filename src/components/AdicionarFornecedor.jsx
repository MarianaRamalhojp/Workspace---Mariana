// import React, { useState } from 'react';
// import axios from 'axios';

// const AdicionarFornecedor = () => {
//     const [nome, setNome] = useState(""); // Estado para armazenar o nome do aluno
//     const [email, setEmail] = useState(""); // Estado para armazenar o email do aluno
//     const [cnpj, setCurso] = useState(""); // Estado para armazenar o curso do aluno

//     const addFornecedor = async () => {
//         try {
//             const response = await axios.post("http://localhost:3000/alunos", {
//                 nome: nome,
//                 email: email,
//                 cnpj: cnpj
//             });
//             console.log(`Foi adicionado o aluno: ${response.data}`);
//             alert("Aluno cadastrado com sucesso!");
//         } catch (error) {
//             console.error("Ocorreu um erro ao adicionar o aluno:", error);
//             alert("Ocorreu um erro ao cadastrar o aluno. Por favor, tente novamente.");
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 placeholder="Nome do Fornecdor"
//                 value={nome}
//                 onChange={(e) => setNome(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="E-mail do Aluno"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Curso do Aluno"
//                 value={curso}
//                 onChange={(e) => setCurso(e.target.value)}
//                 />

//             <button onClick={addAlunos}>Adicionar Aluno</button>
        
//         </div>
//     );
// };

// export default AdicionarFornecedor;
