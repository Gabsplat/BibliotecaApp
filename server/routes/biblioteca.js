var express = require("express");
var db = require("../test_db");

var router = express.Router();

// Get libros
router.get("/libros", function (req, res, next) {
  db.query("SELECT * FROM libro", function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

// Get libro y datos extra por ids
router.get("/libro/:id/", function (req, res, next) {
  if (!req.user) {
    res.status(401).send("Unauthorized");
    return;
  }

  db.query(
    `
    SELECT 
        l.libro_id,
        l.isbn,
        l.titulo,
        l.autor,
        l.genero,
        l.descripcion,
        p.fecha_prestamo,
        p.fecha_devolucion,
        p.usuario_origen,
        uo.nombre AS nombre_usuario_origen,
        uo.apellido AS apellido_usuario_origen,
        CASE 
            WHEN p.fecha_devolucion IS NULL AND p.fecha_prestamo IS NOT NULL THEN 1
            ELSE 0
        END AS estado_prestamo_usuario,
        (SELECT COUNT(*) 
        FROM Libro_Instancia li 
        LEFT JOIN Prestamo p2 ON li.instancia_id = p2.instancia_id 
        WHERE li.libro_id = l.libro_id 
        AND (p2.fecha_devolucion IS NOT NULL OR p2.instancia_id IS NULL)
        ) AS instancias_disponibles
    FROM 
        Libro l
    LEFT JOIN 
        Libro_Instancia li ON l.libro_id = li.libro_id
    LEFT JOIN 
        Prestamo p ON li.instancia_id = p.instancia_id 
        AND p.usuario_destino = ?
        AND p.fecha_devolucion IS NULL
    LEFT JOIN 
        Usuario uo ON p.usuario_origen = uo.usuario_id
    WHERE 
        l.libro_id = ?
    LIMIT 1;
    `,
    [req.user.id, req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

// Libros en posesión por el usuario (prestamos actuales)
router.get("/libros/posesion", function (req, res, next) {
  if (!req.user) {
    res.status(401).send("Unauthorized");
    return;
  }
  console.log("query");
  db.query(
    `SELECT
          l.libro_id,
          l.isbn,
          l.titulo,
          l.autor,
          l.genero,
          l.descripcion,
          li.instancia_id,
          p.fecha_prestamo,
          p.fecha_devolucion,
          p.usuario_origen AS "origen"
      FROM
          prestamo p
      JOIN
          libro_instancia li ON p.instancia_id = li.instancia_id
      JOIN
          libro l ON li.libro_id = l.libro_id
      WHERE
          p.usuario_destino = ? AND p.fecha_devolucion IS NULL;`,
    [req.user.id],
    function (error, results, fields) {
      if (error) throw error;

      res.json(results);
    }
  );
});

// Buscar libros por query
router.get("/libros/buscar", function (req, res, next) {
  console.log(req.query.search_term);
  db.query(
    `SELECT 
        l.libro_id,
        l.isbn,
        l.titulo,
        l.autor,
        l.genero,
        l.descripcion
      FROM 
        Libro l
      WHERE 
        l.titulo LIKE CONCAT('%', ?,  '%') ;`,
    //FALTA AGREGAR AUTOR? GENERO?
    [req.query.search_term],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

// Catedras por carrerea
router.get("/carrera/catedras/:id", function (req, res, next) {
  db.query(
    `SELECT 
        *
      FROM 
        Catedra c
      JOIN 
        Carrera_Catedra cc ON c.catedra_id = cc.catedra_id
      WHERE 
        cc.carrera_id = ?
      ORDER BY 
        c.anio;`,
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

// Libros por catedra
router.get("/catedra/:id/libros", function (req, res, next) {
  db.query(
    `SELECT 
        *
      FROM 
        Catedra c
      JOIN 
        Carrera_Catedra cc ON c.catedra_id = cc.catedra_id
      WHERE 
        cc.carrera_id = ?
      ORDER BY 
        c.anio;`,
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

// Catedras y libros por carrera
router.get("/carrera/:id", function (req, res, next) {
  db.query(
    `SELECT 
        c.anio,
        c.catedra_id,
        c.nombre_catedra,
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
                WHERE li.libro_id = l.libro_id 
                AND p.fecha_devolucion IS NULL AND p.fecha_prestamo IS NOT NULL
            ) THEN 0
            ELSE 1
        END AS disponibilidad
    FROM 
        Carrera_Catedra cc
    JOIN 
        Catedra c ON cc.catedra_id = c.catedra_id
    LEFT JOIN 
        Catedra_Libro cl ON c.catedra_id = cl.catedra_id
    LEFT JOIN 
        Libro l ON cl.libro_id = l.libro_id
    WHERE 
        cc.carrera_id = ?
    ORDER BY 
        c.anio, c.catedra_id;`,
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      const formatedResults = formatResults(results);
      res.json(formatedResults);
    }
  );
});

function formatResults(rows) {
  const result = [];
  const yearsMap = new Map();
  console.log(rows);
  rows.forEach((row) => {
    const year = `${row.anio} AÑO`;
    if (!yearsMap.has(year)) {
      yearsMap.set(year, { year, subjects: [] });
      result.push(yearsMap.get(year));
    }

    const yearEntry = yearsMap.get(year);
    let subjectEntry = yearEntry.subjects.find(
      (subject) => subject.title === row.nombre_catedra
    );

    if (!subjectEntry) {
      subjectEntry = { title: row.nombre_catedra, books: [] };
      yearEntry.subjects.push(subjectEntry);
    }

    if (row.titulo) {
      subjectEntry.books.push({
        title: row.titulo,
        status: row.disponibilidad,
      });
    }
  });

  return result;
}

// Get instancias
router.get("/instancias", function (req, res, next) {
  db.query("SELECT * FROM libro_instancia", function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

module.exports = router;
