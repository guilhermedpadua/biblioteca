const dbEmprestimos = _db.query(`
    SELECT *
    FROM emprestimo
`);

const data = dbEmprestimos.map((emprestimo) => {
    const livroId = emprestimo.getString("livro_id");
    const alunoId = emprestimo.getString("aluno_id");

    const dbLivro = _db.queryFirst(`
        SELECT *
        FROM livros
        WHERE id = ?::int
    `, livroId);

    const dbAluno = _db.queryFirst(`
        SELECT *
        FROM people
        WHERE id = ?::int
    `, alunoId);


    return _val
        .map()
        .set("uid", emprestimo.getString("uid"))
        .set("aluno", {
            name: dbAluno.getString("name"),
            cpf: dbAluno.getString("cpf")          
        })
        .set("livro", dbLivro.getString("titulo"))
        .set("entrega", emprestimo.getString("entrega"))
        .set("vencimento", emprestimo.getString("vencimento"));
});


_out.json(
    _val
        .map()
        .set("result", true)
        .set("data", data)
);


_log.info("data:", data);