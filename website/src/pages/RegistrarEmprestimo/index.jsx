import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal, Form, Input, notification, InputNumber, DatePicker, Select } from 'antd'
import _service from "@netuno/service-client";
import './index.less';

function RegistrarEmprestimo() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [alunos, setAlunos] = useState([]);

    const columns = [
        {
            title: 'Livro',
            dataIndex: 'livro',
            key: 'livro',
        },
        {
            title: 'Aluno',
            dataIndex: 'Aluno',
            key: 'aluno',
        },
        {
            title: 'Data de entrega',
            dataIndex: 'entrega',
            key: 'entrega',
        },
        {
            title: 'Data de devolução',
            dataIndex: 'devolução',
            key: 'devolução',
        },
        {
            title: 'Ações',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Deletar</a>
                </Space>
            ),
        },
    ];


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

    useEffect(() => {
        OnAlunos()
      }, []);

    const OnAlunos = () => {
        _service({
          method: "GET",
          url: "alunos",
          success: (response) => {
            if (response.json.result) {
              setAlunos(response.json.data);
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

    const criarEmprestimo = ({ aluno, entrega, devolucao }) => {
        _service({
            url: "/emprestimo",
            method: "POST",
            data: { aluno, entrega, devolucao  },
            success: (response) => {
                const data = response.json;
                if (data.result) {
                    notification.success({
                        description: "Emprestimo registrado com sucesso.",
                    });
                    onLivros()
                } else {
                    notification.error({
                        description: "Não foi possível registrar o Emprestimo",
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

    return (
        <>
            <div className="register-book">
                <Button type="primary" onClick={showModal}>
                    Registrar Emprestimo
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
                    onFinish={criarEmprestimo}
                >
                    {/* <Form.Item
                        label="Bibliotecario"
                        name="bibliotecario "
                    >
                        <span>bibliotecario</span>
                    </Form.Item> */}
                    <Form.Item
                        label="Aluno"
                        name="aluno"
                    >
                        <Select
                            style={{ width: '100%' }}
                        >
                            {alunos.map((aluno) => (
                                <Select.Option key={aluno.cpf} value={aluno.name}>
                                    {`${aluno.name} - ${aluno.cpf}`}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Entrega"
                        name="entrega"
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="Devolução"
                        name="devolucao"
                    >
                        <DatePicker />
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

            {/* <Table columns={columns} dataSource={livros} /> */}
        </>
    )
}
export default RegistrarEmprestimo;