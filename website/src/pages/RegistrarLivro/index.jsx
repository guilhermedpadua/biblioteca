import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Modal, Form, Input, notification, InputNumber } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import _service from "@netuno/service-client";
import './index.less';
function RegistroLivro() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false); 
    const [livros, setLivros] = useState([]);

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
                    <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDelete(record)} />
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

    const createCategory = ({ titulo, autor, editora, ano }) => {
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

    const showModal = () => {
        setOpen(true);
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
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <>
            <div className="register-book">
                <Button type="primary" onClick={showModal}>
                    Registrar Livro
                </Button>
            </div>

            <Modal
                title="Title"
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
                    onFinish={createCategory}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Titulo"
                        name="titulo"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Autor"
                        name="autor"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ano"
                        name="ano"
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Editora"
                        name="editora"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 18,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
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