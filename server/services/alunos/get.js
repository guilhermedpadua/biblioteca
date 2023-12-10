
const dbAluno = _db.query(`
SELECT
  MAX(p.id) as id,
  MAX(p.uid) as uid,
  MAX(p.name) as name,
  p.email,
  MAX(p.cpf) as cpf,
  MAX(p.telefone) as telefone,
  MAX(ng.name) as "group",
  MAX(e.vencimento) as "vencimento_emprestimo"
FROM
  people p
  INNER JOIN netuno_user nu ON nu.id = p.people_user_id
  INNER JOIN netuno_group ng ON ng.id = nu.group_id
  LEFT JOIN emprestimo e ON e.aluno_id = p.id
WHERE
  ng.code = 'people'
GROUP BY
  p.email;
`);


const dbAlunoPendencia = _db.query(`
SELECT *, p.id, p.uid, p.name, p.email, p.cpf, p.telefone, ng.name as "group",  e.vencimento as "vencimento_emprestimo"
FROM people p
INNER JOIN netuno_user nu ON nu.id = p.people_user_id
INNER JOIN netuno_group ng ON ng.id = nu.group_id
LEFT JOIN emprestimo e ON e.aluno_id = p.id
WHERE ng.code = 'people'
`);

// // dbAlunoPendencia.map((aluno) => {
// //   const vencimentoEmprestimo = aluno.getString("vencimento_emprestimo");
// //   let pendencia = false
// //   if(new Date(vencimentoEmprestimo).getTime() < new Date().getTime()){
// //     pendencia = true
// //   }
// //   if (!dbEmprestimo) {
// //     _db.insert(
// //         "emprestimo",
// //         _val.map()
// //             .set("aluno_id", aluno)
// //             .set("entrega", entrega)
// //             .set("vencimento", vencimento)
// //             .set("livro_id", livro)
// //             .set("responsavel_id", userData.getString('id')),

// //     );  
// // } else {
// //     _res.status(409);
// //     _out.json(
// //         _val.map().set("result", false)
// //     );
// // }
// // }


// );

const hoje = new Date();


const data = dbAluno.map((aluno) => {
  const vencimento = new Date(aluno.getString("vencimento_emprestimo"));
  const falta = vencimento.getTime() - hoje.getTime();

  let pendencia = false;
  if (vencimento < hoje) {
    pendencia = true;
  }

 
  return _val
    .map()
    .set("uid", aluno.getString("uid"))
    .set("name", aluno.getString("name"))
    .set("cpf", aluno.getString("cpf"))
    .set("email", aluno.getString("email"))
    .set("telefone", aluno.getString("telefone"))
    .set("pendencia", pendencia);
}

);


_out.json(
  _val
    .map()
    .set("result", true)
    .set("data", data)
);





