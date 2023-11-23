const aluno = _req.getString("aluno");
const entrega = _req.getString("entrega");
const devolucao = _req.getString("devolucao");
_log.info("aluno", aluno)
const dbAlunos = _db.queryFirst(`
    SELECT *
    FROM emprestimo
`);

if (!dbAlunos) {
    const newAluno = _db.insert(
        "emprestimo",
        _val.map()
            .set("aluno_id", aluno)
            .set("devolucao", devolucao)
            .set("entrega", entrega)
    );
    
    if (newAluno) {
        _out.json(
            _val.map().set("result", true)
        );
    } else {
        _res.status(409);
        _out.json(
            _val.map().set("result", false)
        );
    }
} else {
    _res.status(409);
    _out.json(
        _val.map().set("result", false)
    );
}

