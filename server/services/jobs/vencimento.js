const dbEmprestimos = _db.query(`
    SELECT *
    FROM emprestimo
`);
const hoje = new Date();
for (const emprestimo of dbEmprestimos) {
    const vencimento = new Date(emprestimo.getString("vencimento"));
    const falta = hoje - vencimento
    const diferencaEmHoras = falta / (1000 * 60 * 60);

    _log.info("falta:", diferencaEmHoras)
    _log.info("venciemnto:", vencimento)
    _log.info("hoje", hoje)

    if (diferencaEmHoras < 30) {
        _log.info(`O empréstimo com ID ${emprestimo.getString("aluno_id")} está prestes a vencer em 1 dia ou menos.`);
        const dbAlunos = _db.query(`
        SELECT *, p.id, p.name, p.email
        FROM people p
        LEFT JOIN emprestimo_email e ON p.id = e.aluno_id
        WHERE e.aluno_id IS NULL and p.id = ?::int;
        `, emprestimo.getString('aluno_id'));

        dbAlunos.map((aluno) => {
            _log.info("Alunos", aluno.getString('name'))
            _db.insert(
                "emprestimo_email",
                _val.map()
                    .set("aluno_id", aluno.getString('id'))
                    .set("livro_id", emprestimo.getString('livro_id')),
            );

            const smtp = _smtp.init();

            smtp.to = aluno.getString('email');
            smtp.subject = "Emprestimo realizado com sucesso";
            smtp.html = _template.getOutput("email/vencimento", aluno);
            smtp.attachment(
                "logo.png",
                "image/png",
                _app.file("public/images/logo.png"),
                "logo"
            );
            _log.info("email enviado", dbAluno.getString('email'))
            smtp.send();
        })

    }
}