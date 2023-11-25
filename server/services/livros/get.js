const dbLivros = _db.query(`
SELECT livros.*, CASE WHEN emprestimo.livro_id IS NOT NULL THEN true ELSE false END AS esta_emprestado
FROM livros
LEFT JOIN emprestimo ON livros.id = emprestimo.livro_id
`);

const data = dbLivros.map((livro) =>
    _val
        .map()
        .set("uid", livro.getString("uid"))
        .set("titulo", livro.getString("titulo"))
        .set("autor", livro.getString("autor"))
        .set("editora", livro.getString("editora"))
        .set("ano", livro.getString("ano"))
        .set("esta_emprestado", livro.getBoolean("esta_emprestado"))
);

_out.json(
    _val
        .map()
        .set("result", true)
        .set("data", data)
);

// Logging each book's title

