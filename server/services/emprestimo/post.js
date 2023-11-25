const aluno = _req.getString("aluno");
const entrega = _req.getString("entrega");
const vencimento = _req.getString("vencimento");
const livro = _req.getString("livro");

const dbLivros = _db.queryFirst(`
    SELECT *
    FROM livros
    WHERE uid = ?
`, livro);

const dbEmprestimo = _db.queryFirst(`
    SELECT *
    FROM emprestimo
    WHERE livro_id = ?::int
`, dbLivros.getString('id'));

const dbAluno = _db.queryFirst(`
    SELECT *
    FROM people
    WHERE uid = ?
`, aluno);


if (!dbEmprestimo) {
    _db.insert(
        "emprestimo",
        _val.map()
            .set("aluno_id", aluno)
            .set("entrega", entrega)
            .set("vencimento", vencimento)
            .set("livro_id", livro),

    );  
} else {
    _res.status(409);
    _out.json(
        _val.map().set("result", false)
    );
}
dbAluno.set("titulo", dbLivros.getString('titulo'))
dbAluno.set("entrega", entrega)
dbAluno.set("vencimento", vencimento)


const smtp = _smtp.init();

smtp.to = dbAluno.getString('email');
smtp.subject = "Emprestimo realizado com sucesso";
smtp.html = _template.getOutput("email/requisition", dbAluno);

smtp.attachment(
  "logo.png",
  "image/png",
  _app.file("public/images/logo.png"),
  "logo"
);
_log.info("email enviado", dbAluno.getString('email'))
smtp.send();

_out.json(_val.map().set("result", true))

