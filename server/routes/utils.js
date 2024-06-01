var express = require("express");
var db = require("../test_db");

var router = express.Router();

// Get catedras
router.get("/catedras", function (req, res, next) {
  db.query("SELECT * FROM catedra", function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

// Get libros por catedra
router.get("/libros/:catedra_id", function (req, res, next) {
  db.query(
    `SELECT
        l.libro_id,
        l.isbn,
        l.titulo,
        l.autor,
        l.genero, 
        l.descripcion,
        CASE
            WHEN EXISTS (
                SELECT 1 
                FROM Libro_Instancia li 
                LEFT JOIN Prestamo p ON li.instancia_id = p.instancia_id 
                WHERE li.libro_id = l.libro_id AND p.fecha_devolucion IS NULL
            ) THEN "disponible"
            ELSE "nope"
        END AS disponible
    FROM
        Catedra_Libro cl
    JOIN
        Libro l ON cl.libro_id = l.libro_id
    WHERE
        cl.catedra_id = ?;`,
    [req.params.catedra_id],
    function (error, results, fields) {
      if (error) throw error;

      res.json(results);
    }
  );
});

/*

x getLibrosPosesion() -> solo logged in y user

x getLibro(id)
->x getVencimientoUsuario(id)
->x  getUnidadesDisponibles()


carrera
  getCatedrasCarrera(nombre)
    getLibrosCatedra(id)

searchLibros(query)
searchLibrosByGenero(query)

*/

module.exports = router;
