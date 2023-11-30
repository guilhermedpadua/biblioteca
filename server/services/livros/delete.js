const uid =  _req.getUUID("uid")

const dblivros = _db.queryFirst(`
    SELECT *
    FROM livros 
    WHERE uid = ? 
`, uid);

const dbEmprestimo = _db.queryFirst(`
    SELECT *
    FROM emprestimo 
    WHERE livro_id = ?::int 
`, dblivros.getInt("id"));

if (dblivros) {
    if(dbEmprestimo) {
        _db.delete("emprestimo", dbEmprestimo.getInt("id"))
    }
    _db.delete("livros", dblivros.getInt("id"));

    _out.json(
        _val.map().set("result", true)
    );
} else {
    // Se o livro não existir, retorne false
    _res.status(404);
    _out.json(
        _val.map().set("result", false)
    );
}