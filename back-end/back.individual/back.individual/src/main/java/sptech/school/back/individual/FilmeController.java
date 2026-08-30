package sptech.school.back.individual;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/filmes")
public class FilmeController {
    @Autowired
    private JdbcTemplate jdbctemplate;

    @GetMapping
    public ResponseEntity<List<Filme>> listar(){
        String sql = "SELECT * FROM filme";

        List<Filme> resultado = jdbctemplate.query(
                sql,
                new BeanPropertyRowMapper<>(Filme.class)
        );


        return ResponseEntity.status(200).body(resultado);
    }

    @PostMapping
    public ResponseEntity<Void> cadastrar(@RequestBody Filme filme) {

        if (filme.getTitulo() == null || filme.getTitulo().isBlank()) {
            return ResponseEntity.status(400).build();
        }

        if (filme.getDiretor() == null || filme.getDiretor().isBlank()) {
            return ResponseEntity.status(400).build();
        }

        if (filme.getGenero() == null || filme.getGenero().isBlank()) {
            return ResponseEntity.status(400).build();
        }

        if (filme.getAnoLancamento() == null) {
            return ResponseEntity.status(400).build();
        }

        if (filme.getAnoLancamento() < 1888 ||
                filme.getAnoLancamento() > LocalDate.now().getYear()) {
            return ResponseEntity.status(400).build();
        }

        if (filme.getDuracao() == null || filme.getDuracao() <= 0) {
            return ResponseEntity.status(400).build();
        }

        if (filme.getSinopse() == null || filme.getSinopse().isBlank()) {
            return ResponseEntity.status(400).build();
        }

        if (filme.getTitulo().length() > 100 ||
                filme.getDiretor().length() > 100 ||
                filme.getGenero().length() > 50 ||
                filme.getSinopse().length() > 500) {
            return ResponseEntity.status(400).build();
        }

        String sql = """
                INSERT INTO filme
                (titulo, diretor, genero, ano_lancamento, duracao, sinopse)
                VALUES (?, ?, ?, ?, ?, ?)
                """;

        jdbctemplate.update(
                sql,
                filme.getTitulo().trim(),
                filme.getDiretor().trim(),
                filme.getGenero().trim(),
                filme.getAnoLancamento(),
                filme.getDuracao(),
                filme.getSinopse().trim()
        );

        return ResponseEntity.status(201).build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {

        String sql = "DELETE FROM filme WHERE id = ?";

        int linhasAlteradas = jdbctemplate.update(sql, id);

        if (linhasAlteradas == 0) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(204).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizar(
            @PathVariable Integer id,
            @RequestBody Filme filme) {

        if (filme.getTitulo() == null || filme.getTitulo().isBlank()) {
            return ResponseEntity.status(400).build();
        }

        if (filme.getDiretor() == null || filme.getDiretor().isBlank()) {
            return ResponseEntity.status(400).build();
        }

        if (filme.getGenero() == null || filme.getGenero().isBlank()) {
            return ResponseEntity.status(400).build();
        }

        if (filme.getAnoLancamento() == null) {
            return ResponseEntity.status(400).build();
        }

        if (filme.getAnoLancamento() < 1888 ||
                filme.getAnoLancamento() > LocalDate.now().getYear()) {
            return ResponseEntity.status(400).build();
        }

        if (filme.getDuracao() == null || filme.getDuracao() <= 0) {
            return ResponseEntity.status(400).build();
        }

        if (filme.getSinopse() == null || filme.getSinopse().isBlank()) {
            return ResponseEntity.status(400).build();
        }

        if (filme.getTitulo().length() > 100 ||
                filme.getDiretor().length() > 100 ||
                filme.getGenero().length() > 50 ||
                filme.getSinopse().length() > 500) {
            return ResponseEntity.status(400).build();
        }

        String sql = """
            UPDATE filme SET titulo = ?, diretor = ?, genero = ?, ano_lancamento = ?, duracao = ?, sinopse = ? WHERE id = ?
            """;

        int linhasAlteradas = jdbctemplate.update(
                sql,
                filme.getTitulo().trim(),
                filme.getDiretor().trim(),
                filme.getGenero().trim(),
                filme.getAnoLancamento(),
                filme.getDuracao(),
                filme.getSinopse().trim(),
                id
        );

        if (linhasAlteradas == 0) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(204).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filme> buscarPorId(@PathVariable Integer id) {

        String sql = """
            SELECT * FROM filme WHERE id = ?
            """;

        List<Filme> resultado = jdbctemplate.query(
                sql,
                new BeanPropertyRowMapper<>(Filme.class),
                id
        );

        if (resultado.isEmpty()) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(200).body(resultado.get(0));
    }
}
