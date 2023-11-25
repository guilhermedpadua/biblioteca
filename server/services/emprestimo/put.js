const aluno = _req.getString("aluno");
const entrega = _req.getString("entrega");
const vencimento = _req.getString("vencimento");
const livro = _req.getString("livro");
const uid = _req.getUUID("uid")

const dbEmprestimo = _db.queryFirst(`
  SELECT * FROM emprestimo WHERE uid = ?
`, uid)

const emprestimoData = _val.map()

    .set("aluno_id", aluno)
    .set("entrega", entrega)
    .set("vencimento", vencimento)
    .set("livro_id", livro)


    _db.update(
        "emprestimo",
        dbEmprestimo.getInt("id"),
        emprestimoData
    )

_out.json(
    _val.map()
        .set("result", true)
)
