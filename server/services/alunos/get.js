const dbAluno = _db.query(`
  SELECT *
  FROM people
`);

const data = dbAluno.map((aluno) =>
  _val
    .map()
    .set("name", aluno.getString("name"))
    .set("cpf", aluno.getString("cpf"))
);

_out.json(
  _val
    .map()
    .set("result", true)
    .set("data", data)
);



