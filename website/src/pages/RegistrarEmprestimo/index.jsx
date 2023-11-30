import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal, Form, notification, DatePicker, Select, Row, Col } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import _service from "@netuno/service-client";
import './index.less';

function RegistrarEmprestimo() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [alunos, setAlunos] = useState([]);
    const [livros, setLivros] = useState([]);
    const [emprestimo, setEmprestimo] = useState([]);
    const [searchAlunos, setSearchAlunos] = useState('');
    const [searchLivros, setSearchLivros] = useState('');
    const [linhaSelecionada, setLinhaSelecionada] = useState(null);
    const [initialValues, setInitialValues] = useState(null);
    const [userData, setUserData] = useState(false);


    const [form] = Form.useForm()
    console.lo
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
                    <EditOutlined style={{ color: 'blue' }} onClick={() => handleEdit(record)} />
                    <a onClick={() => deleteEmprestimo(record.uid)} style={{ color: 'red' }}><DeleteOutlined /></a>
                </Space>
            ),
        },
    ];

    const layout = {
        rowGutter: { gutter: [25, 0] },
        labelCol: { span: 'hide' }
    };

    const showModalEdit = (registro) => {
        setLinhaSelecionada(registro);
        setOpen(true);
        console.log("Dados selecionados para edição:", registro);
    };
    const showModal = () => {
        setOpen(true);
    };
    useEffect(() => {
        setInitialValues(linhaSelecionada);
        console.log("Dados na modal de edição:", linhaSelecionada);
    }, [linhaSelecionada]);

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
        setLinhaSelecionada(null)
    };

    useEffect(() => {
        OnAlunos()
        onLivros()
        BuscarEmprestimo()
        onUserInfo()
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
    const onUserInfo = () => {
        _service({
          method: "GET",
          url: "people",
          success: (response) => {
            if (response.json.result) {
              setUserData(response.json.data);
            } else {
              notification["warning"]({
                message: "Ocorreu um erro a carregar os dados",
                description: response.json.error,
              });
            }
          },
          // fail: () => {
          //   notification["error"]({
          //     message: "Ocorreu um erro a carregar os dados",
          //     description:
          //       "Ocorreu um erro a carregar os dados, por favor tente novamente.",
          //   });
          // },
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

    const onSearchAlunos = (value) => {
        setSearchAlunos(value);
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
                onLivros()
                OnAlunos()
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
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const editarEmprestimo = ({ aluno, entrega, vencimento, livro }) => {
        const entregaFormatada = entrega.format("YYYY-MM-DD")
        const vencimentoFormatada = vencimento.format("YYYY-MM-DD")
        _service({
            url: "/emprestimo",
            method: "PUT",
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

    const deleteEmprestimo = (uid) => {
        _service({
            url: `emprestimo`,
            method: "DELETE",
            data: { uid },
            success: (response) => {
                const data = response.json;
                if (data.result) {
                    notification.success({
                        description: "Emprestimo removido com sucesso.",
                    });
                } else {
                    notification.error({
                        description: "Não foi possível remover o emprestimo.",
                    });
                }
            },
            fail: (e) => {
                console.log("Service failed:", e);

                if (e.status === 404) {
                    notification.error({
                        description: "Emprestimo não encontrado.",
                    });
                } else {
                    notification.error({
                        description: "Não foi possível remover o livro",
                    });
                }
            },
        });
    };

    return (
        <>
            <div className="registrar-emprestimo">
                <Button type="primary" onClick={showModal}>
                    Registrar Emprestimo
                </Button>
            </div>

            <Modal
                title={linhaSelecionada ? "Editar Empréstimo" : "Registrar Empréstimo"}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    onFinish={(valores) => {
                        if (linhaSelecionada) {
                            editarEmprestimo(valores);
                        } else {
                            criarEmprestimo(valores);
                        }
                    }}
                    initialValues={{remember: true}}
                    form={form}
                >
                    <Form.Item
                    >
                        <span>{userData.name}</span>
                    </Form.Item>
                    <Row {...layout.rowGutter}>
                        <Col span={24}>
                            <Form.Item
                                name="aluno"
                                label="Aluno"
                                {...layout.labelCol}
                            >
                                <Select
                                    showSearch
                                    onSearch={onSearchAlunos}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().includes(searchAlunos.toLowerCase())
                                    }
                                    placeholder={"Aluno"}
                                >
                                    {alunos.map((aluno) => (
                                        <Select.Option value={aluno.uid} key={aluno.uid}>
                                            {`${aluno.name} - ${aluno.cpf}`}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                <Row >
                    <Col  lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                        label="Livro"
                            name="livro"
                        >
                            <Select
                                showSearch
                                onSearch={onSearchAlunos}
                                placeholder={"Livro"}
                            >
                                {livros.map(livro => (
                                    <Select.Option key={livro.uid} value={livro.uid}>
                                        {livro.titulo}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>


                <Row {...layout.rowGutter}>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                        label="Entrega"
                            name="entrega"
                            {...layout.labelCol}
                        >
                            <DatePicker placeholder={"Data Entrega"} />
                        </Form.Item>
                    </Col>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                        label="Vencimento"
                            name="vencimento"
                            {...layout.labelCol}
                        >
                            <DatePicker  placeholder={"Vencimento"}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    className='button'
                >
                    <Button type="primary" htmlType="submit">
                        Registrar
                    </Button>
                </Form.Item>
            </Form>
        </Modal >

            <Table columns={columns} dataSource={emprestimo} />
        </>
    )
}
export default RegistrarEmprestimo;