const titulo = _req.getString("titulo");
const autor = _req.getString("autor");
const ano = _req.getString("ano");
const editora = _req.getString("editora");
const uid = _req.getString("uid")
_log.info("uid", uid)
const dblivros = _db.queryFirst(`
    SELECT *
    FROM livros
    WHERE uid = ?
`, uid);

if (dblivros) {
    const emprestimoData = _val.map()
        .set("titulo", titulo)
        .set("autor", autor)
        .set("ano", ano)
        .set("editora", editora)


    _db.update(
        "livros",
        dblivros.getInt("id"),
        emprestimoData
    )

    _out.json(
        _val.map()
            .set("result", true)
    )
} else {
    _res.status(409);
    _out.json(
        _val.map().set("result", false)
    );
}
