const titulo = _req.getString("titulo");
const autor = _req.getString("autor");
const ano = _req.getString("ano");
const editora = _req.getString("editora");

const dblivros = _db.queryFirst(`
    SELECT *
    FROM livros
    WHERE titulo = ?
`,_val.list().add(titulo));

if (!dblivros) {
    const newLivro = _db.insert(
        "livros",
        _val.map()
            .set("titulo", titulo)
            .set("autor", autor)
            .set("ano", ano)
            .set("editora", editora)
    );
    
    if (newLivro) {
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
