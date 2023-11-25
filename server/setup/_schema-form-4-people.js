/**
  *
  *  CODE GENERATED AUTOMATICALLY
  *
  *  THIS FILE SHOULD NOT BE EDITED BY HAND
  *
  */

_form.createIfNotExists(
	_val.init()
	.set("big", false)
	.set("control_active", true)
	.set("control_group", false)
	.set("control_user", false)
	.set("description", "")
	.set("displayname", "Usuario")
	.set("export_id", false)
	.set("export_json", true)
	.set("export_lastchange", false)
	.set("export_uid", true)
	.set("export_xls", true)
	.set("export_xml", true)
	.set("firebase", "")
	.set("name", "people")
	.set("reorder", 0)
	.set("report", false)
	.set("show_id", true)
	.set("uid", "0028953a-b610-4e37-9f25-87bdad2e37dd")
)
_form.createComponentIfNotExists(
	"0028953a-b610-4e37-9f25-87bdad2e37dd",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "Avatar")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "avatar")
	.set("notnull", false)
	.set("primarykey", false)
	.set("properties", "{}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "image")
	.set("uid", "4b80a27b-49b2-413b-b518-c8323d80d71d")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", true)
	.set("whennew", true)
	.set("whenresult", true)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 1)
	.set("y", 6)
)
_form.createComponentIfNotExists(
	"0028953a-b610-4e37-9f25-87bdad2e37dd",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "Cpf")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "cpf")
	.set("notnull", false)
	.set("primarykey", false)
	.set("properties", "{\"MASK\":{\"default\":\"\",\"type\":\"STRING\",\"value\":\"\"},\"MASK_REVERSE\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"},\"MASK_SELECTONFOCUS\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"}}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "text")
	.set("uid", "eb612e29-5cb2-406e-94eb-26fd2e332d3c")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", true)
	.set("whennew", true)
	.set("whenresult", true)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 1)
	.set("y", 7)
)
_form.createComponentIfNotExists(
	"0028953a-b610-4e37-9f25-87bdad2e37dd",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "Email")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "email")
	.set("notnull", false)
	.set("primarykey", true)
	.set("properties", "{}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "email")
	.set("uid", "a7742a50-8128-448b-aa4a-31882ac70ee6")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", true)
	.set("whennew", true)
	.set("whenresult", true)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 1)
	.set("y", 3)
)
_form.createComponentIfNotExists(
	"0028953a-b610-4e37-9f25-87bdad2e37dd",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "Nome")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "name")
	.set("notnull", true)
	.set("primarykey", false)
	.set("properties", "{\"MASK\":{\"default\":\"\",\"type\":\"STRING\",\"value\":\"\"},\"MASK_REVERSE\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"},\"MASK_SELECTONFOCUS\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"}}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "text")
	.set("uid", "2d86e335-27cb-43aa-99ce-2daa811815bc")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", true)
	.set("whennew", true)
	.set("whenresult", true)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 1)
	.set("y", 1)
)
_form.createComponentIfNotExists(
	"0028953a-b610-4e37-9f25-87bdad2e37dd",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "Utilizador")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "people_user_id")
	.set("notnull", true)
	.set("primarykey", false)
	.set("properties", "{\"ALLOW_USER_LOGGED\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"},\"GROUPS\":{\"default\":\"\",\"type\":\"STRING\",\"value\":\"\"},\"GROUPS_MODE\":{\"default\":\"all|exclude|only\",\"type\":\"CHOICE\",\"value\":\"all\"},\"USERS\":{\"default\":\"\",\"type\":\"STRING\",\"value\":\"\"},\"USERS_MODE\":{\"default\":\"all|exclude|only\",\"type\":\"CHOICE\",\"value\":\"all\"}}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "user")
	.set("uid", "feeb2b03-19af-4b58-8fef-2ce5b81ffa31")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", true)
	.set("whennew", true)
	.set("whenresult", true)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 1)
	.set("y", 2)
)
_form.createComponentIfNotExists(
	"0028953a-b610-4e37-9f25-87bdad2e37dd",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "Chave de Recupera\u00E7\u00E3o")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "recovery_key")
	.set("notnull", false)
	.set("primarykey", false)
	.set("properties", "{\"MASK\":{\"default\":\"\",\"type\":\"STRING\",\"value\":\"\"},\"MASK_REVERSE\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"},\"MASK_SELECTONFOCUS\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"}}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "text")
	.set("uid", "efbe9d80-b9ec-4b89-9208-461681f51b8d")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", true)
	.set("whennew", true)
	.set("whenresult", false)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 1)
	.set("y", 4)
)
_form.createComponentIfNotExists(
	"0028953a-b610-4e37-9f25-87bdad2e37dd",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "Limite de Recupera\u00E7\u00E3o")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "recovery_limit")
	.set("notnull", false)
	.set("primarykey", false)
	.set("properties", "{\"DEFAULT_CURRENT\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"}}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "datetime")
	.set("uid", "f4274938-f4e8-41de-a090-5dd76f2b93c5")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", true)
	.set("whennew", true)
	.set("whenresult", false)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 1)
	.set("y", 5)
)
_form.createComponentIfNotExists(
	"0028953a-b610-4e37-9f25-87bdad2e37dd",
	_val.init()
	.set("colspan", 0)
	.set("description", "")
	.set("displayname", "Telefone")
	.set("firebase", "")
	.set("group_id", 0)
	.set("height", 0)
	.set("max", 0)
	.set("min", 0)
	.set("name", "telefone")
	.set("notnull", false)
	.set("primarykey", false)
	.set("properties", "{\"MASK\":{\"default\":\"\",\"type\":\"STRING\",\"value\":\"\"},\"MASK_REVERSE\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"},\"MASK_SELECTONFOCUS\":{\"default\":\"false\",\"type\":\"BOOLEAN\",\"value\":\"false\"}}")
	.set("rowspan", 0)
	.set("tdheight", 0)
	.set("tdwidth", 0)
	.set("type", "text")
	.set("uid", "f287d1b4-e421-43c3-b36b-cb7826c628ae")
	.set("user_id", 0)
	.set("whenedit", true)
	.set("whenexport", true)
	.set("whenfilter", true)
	.set("whennew", true)
	.set("whenresult", true)
	.set("whenview", true)
	.set("width", 0)
	.set("x", 1)
	.set("y", 8)
)
