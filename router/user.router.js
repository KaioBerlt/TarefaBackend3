const router = require("express").Router();
const usuario = require("../controller/user.controller");

router.get("/findAll", usuario.findAllUsers);
router.get("/find/:id", usuario.find);
router.post("/create", usuario.createUser);

router.put("/update/:id", usuario.updateUser);
router.delete("/delete/:id", usuario.deleteUser);



module.exports = router;