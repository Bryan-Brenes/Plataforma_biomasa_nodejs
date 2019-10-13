const express = require('express');
const router = express.Router();

// al ingresar a / renderiza welcome.ejs que esta en views
router.get('/', (req, res) => {
    res.send("pantallaInicio");
});

module.exports = router;
