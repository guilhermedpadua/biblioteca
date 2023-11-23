const dbLivros = _db.query(`
  SELECT *
  FROM livros
`);

if (dbLivros.length === 0) {
  _header.status(404);
  _exec.stop();
}

const data = dbLivros.map((livro) =>
  _val
    .map()
    .set("titulo", livro.getString("titulo"))
    .set("autor", livro.getString("autor"))
    .set("editora", livro.getString("editora"))
    .set("ano", livro.getString("ano"))
);

_out.json(
  _val
    .map()
    .set("result", true)
    .set("data", data)
);

// Logging each book's title
dbLivros.forEach((livro) => {
  _log.info("livros", livro.getString("titulo"));
});
