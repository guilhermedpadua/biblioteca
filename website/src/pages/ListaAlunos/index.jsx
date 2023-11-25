import React, { useState, useEffect } from 'react';
import { Space, Table,  Input, notification,  } from 'antd'
import _service from "@netuno/service-client";
import './index.less';
function RegistroLivro() {
  const [alunos, setAlunos] = useState([]);
  const [searchText, setSearchText] = useState('');
  
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Cpf',
      dataIndex: 'cpf',
      key: 'cpf',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
    },
    {
      title: 'Possui Pendência',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.tem_pendencia ? <span style={{ color: 'red' }}>Não</span> : <span style={{ color: 'green' }}>Sim</span>}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    buscarAlunos()
  }, []);

  const buscarAlunos = () => {
    _service({
      method: "GET",
      url: "alunos",
      success: (response) => {
        if (response.json.result) {
          setAlunos(response.json.data);
        } else {
          notification["warning"]({
            message: "Ocorreu um erro a carregar os dados",
            description: response.json.error,
          });
        }
      },
      fail: () => {
        notification["error"]({
          message: "Ocorreu um erro a carregar os dados",
          description:
            "Ocorreu um erro a carregar os dados, por favor tente novamente.",
        });
      },
    });
  };

  const handleSearch = (value) => {
    setSearchText(value); 

    if (value === '') {
      buscarAlunos();
    } else {

      const filteredalunos = alunos.filter(livro =>
        livro.name.toLowerCase().includes(value.toLowerCase()) ||
        livro.cpf.toLowerCase().includes(value.toLowerCase()) ||
        livro.email.toLowerCase().includes(value.toLowerCase()) ||
        livro.telefone.toString().includes(value)
      );
      setAlunos(filteredalunos);
    }
  };
  console.log(alunos)
  return (
    <>
      <Input.Search
        placeholder="Digite para buscar alunos"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)} // Adiciona esta linha para responder às alterações em tempo real
        value={searchText} // Controla o valor do campo de busca
        style={{ marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={alunos} />
    </>
  )
}
export default RegistroLivro;