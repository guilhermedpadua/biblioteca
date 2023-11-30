const uid = _req.getUUID("uid")
const user = _user.get(_user.id()).getString("user")
const dbEmprestimo = _db.queryFirst(`
    SELECT *
    FROM emprestimo
    WHERE uid = ? 
`, uid);


if (dbEmprestimo) {
    _db.delete("emprestimo", dbEmprestimo.getInt("id"))
    _out.json(
        _val.map().set("result", true)
    );
}
else {
    _res.status(404);
    _out.json(
        _val.map().set("result", false)
    );
}