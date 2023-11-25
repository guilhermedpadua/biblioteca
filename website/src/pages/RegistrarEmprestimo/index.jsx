import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal, Form, notification,  DatePicker, Select } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import _service from "@netuno/service-client";
import './index.less';

function RegistrarEmprestimo() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [alunos, setAlunos] = useState([]);
    const [livros, setLivros] = useState([]);
    const [emprestimo, setEmprestimo] = useState([]);

    const columns = [
        {
            title: 'Livro',
            dataIndex: 'livro',
            key: 'livro',
        },
        {
            title: 'Aluno',
            dataIndex: 'aluno',
            key: 'aluno',
            render: (text, record) => (
                <span>{`${record.aluno.name} - ${record.aluno.cpf}`}</span>
            ),
        },
        {
            title: 'Data de entrega',
            dataIndex: 'entrega',
            key: 'entrega',
        },
        {
            title: 'Vencimento',
            dataIndex: 'vencimento',
            key: 'vencimento',
        },
        {
            title: 'Ações',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined style={{ color: 'blue' }}  />
                    <a style={{ color: 'red' }}><DeleteOutlined /></a>
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
        onLivros()
        BuscarEmprestimo()
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

    const BuscarEmprestimo = () => {
        _service({
            method: "GET",
            url: "/emprestimo",
            success: (response) => {
                if (response.json.result) {
                    setEmprestimo(response.json.data);
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

    const criarEmprestimo = ({ aluno, entrega, vencimento, livro }) => {
        const entregaFormatada = entrega.format("YYYY-MM-DD")
        const vencimentoFormatada = vencimento.format("YYYY-MM-DD")
        _service({
            url: "/emprestimo",
            method: "POST",
            data: { aluno, entrega: entregaFormatada, vencimento: vencimentoFormatada, livro },
            success: (response) => {
                const data = response.json;
                if (data.result) {
                    notification.success({
                        description: "Emprestimo registrado com sucesso.",
                    });
                    onLivros()
                    BuscarEmprestimo()
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
                                <Select.Option value={aluno.uid} key={aluno.uid}>
                                    {`${aluno.name} - ${aluno.cpf}`}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Livro"
                        name="livro"
                    >
                        <Select style={{ width: '100%' }}>
                            {livros.map(livro => (
                                <Select.Option key={livro.uid} value={livro.uid}>
                                    {livro.titulo}
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
                        label="Vencimento"
                        name="vencimento"
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

            <Table columns={columns} dataSource={emprestimo} />
        </>
    )
}
export default RegistrarEmprestimo;