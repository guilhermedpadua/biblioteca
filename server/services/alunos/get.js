
const dbAluno = _db.query(`
SELECT *, p.id, p.uid, p.name, p.email, p.cpf, p.telefone, ng.name as "group",  e.vencimento as "vencimento_emprestimo"
FROM people p
INNER JOIN netuno_user nu ON nu.id = p.people_user_id
INNER JOIN netuno_group ng ON ng.id = nu.group_id
LEFT JOIN emprestimo e ON e.aluno_id = p.id
WHERE ng.code = 'people'
`);


const data = dbAluno.map((aluno) => {
  const vencimentoEmprestimo = aluno.getString("vencimento_emprestimo");
  const hasOverduePayment = vencimentoEmprestimo && new Date(vencimentoEmprestimo) > new Date();
 return  _val
    .map()
    .set("uid", aluno.getString("uid"))
    .set("name", aluno.getString("name"))
    .set("cpf", aluno.getString("cpf"))
    .set("email", aluno.getString("email"))
    .set("telefone", aluno.getString("telefone"))
    .set("tem_pendencia", hasOverduePayment);;
}

);

_out.json(
  _val
    .map()
    .set("result", true)
    .set("data", data)
);





