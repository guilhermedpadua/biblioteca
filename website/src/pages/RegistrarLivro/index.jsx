import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Modal, Form, Input, notification, InputNumber, Row, Col } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import _service from "@netuno/service-client";
import './index.less';
function RegistroLivro() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [livros, setLivros] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [editData, setEditData] = useState(null)
    const [modalKey, setModalKey] = useState(0);

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
            title: 'Ações',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined style={{ color: 'blue' }} onClick={() => handleEdit(record)} />
                    <a onClick={() => deleteLivro(record.uid)} style={{ color: 'red' }}><DeleteOutlined /></a>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        onLivros()
    }, []);

    const handleEdit = (record) => {
        setEditData(record); // Define os dados do livro a serem editados
        setOpen(true); // Abre a modal para edição
    };
    useEffect(() => {
        if (!open) {
            // Limpa editData quando a modal é fechada
            setEditData(null);
        }
    }, [open]);
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

    const deleteLivro = (uid) => {
        _service({
            url: `livros`,
            method: "DELETE",
            data: { uid },
            success: (response) => {
                const data = response.json;
                if (data.result) {
                    notification.success({
                        description: "Livro excluído com sucesso.",
                    });
                    onLivros();
                } else {
                    notification.error({
                        description: "Não foi possível excluir o livro.",
                    });
                }
            },
            fail: (e) => {
                console.log("Service failed:", e);

                if (e.status === 404) {
                    notification.error({
                        description: "Livro não encontrado.",
                    });
                } else {
                    notification.error({
                        description: "Não foi possível excluir o livro",
                    });
                }
            },
        });
    };


    const criarLivro = ({ titulo, autor, editora, ano  }) => {
        _service({
            url: "/livros",
            method: "POST",
            data: { titulo, autor, editora, ano },
            success: (response) => {
                const data = response.json;
                if (data.result) {
                    notification.success({
                        description: "Livro registrado com sucesso.",
                    });
                    onLivros()
                } else {
                    notification.error({
                        description: "Não foi possível registrar o livro.",
                    });
                }

            },
            fail: (e) => {
                console.log("Service failed:", e);

                if (e.status === 409) {
                    notification.error({
                        description: "Este item já existe.",
                    });
                } else {
                    notification.error({
                        description: "Não foi possível registrar o livro",
                    });
                }
            },
        });
    };
    const editarLivro = ({ titulo, autor, editora, ano, uid }) => {
        const livroEditado = { titulo, autor, editora, ano, uid: editData.uid }
        _service({
            url: "/livros",
            method: "PUT",
            data: livroEditado,
            success: (response) => {
                const data = response.json;
                if (data.result) {
                    notification.success({
                        description: "Livro editado com sucesso.",
                    });
                    onLivros()
                } else {
                    notification.error({
                        description: "Não foi possível editar o livro.",
                    });
                }

            },
            fail: (e) => {
                console.log("Service failed:", e);

                if (e.status === 409) {
                    notification.error({
                        description: "Não foi possivel Editar",
                    });
                } else {
                    notification.error({
                        description: "Não foi possível editar o livro",
                    });
                }
            },
        });
    };

    const showModal = () => {
        setOpen(true);
        setEditData(null)
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
        setModalKey((prevKey) => prevKey + 1);
        setEditData(null)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = (values) => {
        if (editData) {
            // Se existem dados de edição, chama a função de edição
            editarLivro(values);
        } else {
            // Se não, chama a função de criação
            criarLivro(values);
        }
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
    console.log("edit data", editData)
    return (
        <>
            <div className="register-book">
                <Button type="primary" onClick={showModal}>
                    Registrar Livro
                </Button>
            </div>
            <Input.Search
                placeholder="Digite para buscar livros"
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)} // Adiciona esta linha para responder às alterações em tempo real
                value={searchText} // Controla o valor do campo de busca
                style={{ marginBottom: 16 }}
            />
            <Modal
                key={modalKey}
                title={editData ? "Editar Livro" : "Registrar Livro"}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={editData}
                    autoComplete="off"
                >
                    <Row >
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="titulo"
                                name="titulo"
                                labelCol={24}
                            >
                                <Input placeholder='Titulo' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Autor"
                                name="autor"
                                labelCol={24}
                            >
                                <Input placeholder='Autor' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Editora"
                                name="editora"
                                labelCol={24}
                            >
                                <Input placeholder='Editora' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="Ano de Publicação"
                        name="ano"
                        className='ano-publicacao'
                        labelCol={24}
                    >
                        <InputNumber placeholder='Ano de Publicação' style={{ width: 250 }} />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 18,
                        }}
                        className='button-book'
                    >
                        <Button type="primary" htmlType="submit" onClick={handleOk}>
                            Registrar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Table columns={columns} dataSource={livros} />
        </>
    )
}
export default RegistroLivro;