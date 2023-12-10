import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal, Form, notification, DatePicker, Select, Row, Col } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import _service from "@netuno/service-client";
import './index.less';
import moment from 'moment';
import dayjs from 'dayjs';
import { parseISO, isValid } from 'date-fns';


function RegistrarEmprestimo() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [alunos, setAlunos] = useState([]);
    const [livros, setLivros] = useState([]);
    const [emprestimo, setEmprestimo] = useState([]);
    const [searchAlunos, setSearchAlunos] = useState('');
    const [userData, setUserData] = useState(false);
    const [editData, setEditData] = useState(null)
    const [modalKey, setModalKey] = useState(0);
    const [form] = Form.useForm()
    const dateFormat = 'YYYY/MM/DD';


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

    const handleEdit = (record) => {
            setEditData({
                ...record,
                aluno: {
                    uid: record.aluno.uid,
                    name: record.aluno.name,
                    cpf: record.aluno.cpf,
                },
            });
           setOpen(true);   
    };
       
    useEffect(() => {
        if (editData) {
            // Formatar as datas antes de preencher o formulário
            const entregaFormatted = moment(editData.entrega, 'YYYY-MM-DD');
            const vencimentoFormatted = moment(editData.vencimento, 'YYYY-MM-DD');
            form.setFieldsValue({
                ...editData,
                entrega: entregaFormatted,
                vencimento: vencimentoFormatted,
            });
        }
    }, [editData, form]);

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
        setModalKey((prevKey) => prevKey + 1);
        setEditData(null)
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
        const emprestimoEditado = { aluno, entrega, vencimento, livro, uid: editData.uid }
        _service({
            url: "/emprestimo",
            method: "PUT",
            data: emprestimoEditado,
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
                BuscarEmprestimo();
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
    const onFinish = (values) => {
        if (editData) {
            // Se existem dados de edição, chama a função de edição
            editarEmprestimo(values);
        } else {
            // Se não, chama a função de criação
            criarEmprestimo(values);
        }
    };
console.log("editdata", editData)

    return (
        <>
            <div className="registrar-emprestimo">
                <Button type="primary" onClick={showModal}>
                    Registrar Emprestimo
                </Button>
            </div>

            <Modal
                key={modalKey}
                title={editData ? "Editar Empréstimo" : "Registrar Empréstimo"}
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
                    onFinish={onFinish}
                    initialValues={editData}
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
                                labelCol={24}
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
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Livro"
                                name="livro"
                                labelCol={24}
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
                                labelCol={24}
                            >
                                    <DatePicker  style={{ width: '200px' }} />

                            </Form.Item>
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Vencimento"
                                name="vencimento"
                                labelCol={24}
                            >
                                <DatePicker placeholder={"Vencimento"}  style={{ width: '200px' }}/>
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