import React, { useState, useEffect } from 'react';
import { Space, Table,  Input, notification,  } from 'antd'
import _service from "@netuno/service-client";
import './index.less';
function RegistroLivro() {
  const [livros, setLivros] = useState([]);
  const [searchText, setSearchText] = useState('');
  
  const columns = [
    {
      title: 'Titulo',
      dataIndex: 'titulo',
      key: 'titulo',
    },
    {
      title: 'Autor',
      dataIndex: 'autor',
      key: 'autor',
    },
    {
      title: 'Editora',
      dataIndex: 'editora',
      key: 'editora',
    },
    {
      title: 'Ano de publicação',
      dataIndex: 'ano',
      key: 'ano',
    },
    {
      title: 'Status',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.esta_emprestado ? <span style={{ color: 'red' }}>Indisponível</span> : <span style={{ color: 'green' }}>Disponível</span>}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    onLivros()
  }, []);

  const onLivros = () => {
    _service({
      method: "GET",
      url: "livros",
      success: (response) => {
        if (response.json.result) {
          setLivros(response.json.data);
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
    setSearchText(value); // Atualiza o estado do texto de busca

    // Se o campo de busca estiver vazio, carrega todos os livros
    if (value === '') {
      onLivros();
    } else {
      // Caso contrário, filtra os livros com base no valor da busca
      const filteredLivros = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(value.toLowerCase()) ||
        livro.autor.toLowerCase().includes(value.toLowerCase()) ||
        livro.editora.toLowerCase().includes(value.toLowerCase()) ||
        livro.ano.toString().includes(value)
      );
      setLivros(filteredLivros);
    }
  };
  return (
    <>
      <Input.Search
        placeholder="Digite para buscar livros"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)} // Adiciona esta linha para responder às alterações em tempo real
        value={searchText} // Controla o valor do campo de busca
        style={{ marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={livros} />
    </>
  )
}
export default RegistroLivro;