import { Link } from 'react-router-dom'
import styles from './FilmeCard.module.css'

function FilmeCard({ filme, onExcluir }) {

  return (
    <article className={styles.card}>

      <div className={styles.cabecalho}>

        <h3>{filme.titulo}</h3>

        <span className={styles.id}>
          #{filme.id}
        </span>

      </div>

      <div className={styles.informacoes}>

        <p>
          <strong>Diretor:</strong> {filme.diretor}
        </p>

        <p>
          <strong>Gênero:</strong> {filme.genero}
        </p>

        <p>
          <strong>Ano:</strong> {filme.anoLancamento}
        </p>

        <p>
          <strong>Duração:</strong> {filme.duracao} minutos
        </p>

      </div>

      <div className={styles.sinopse}>

        <strong>Sinopse</strong>

        <p>
          {filme.sinopse}
        </p>

      </div>

      <div className={styles.acoes}>

        <Link
          to={`/editar/${filme.id}`}
          className={styles.editar}
        >
          Editar filme
        </Link>

        <button
          onClick={() => onExcluir(filme.id)}
          className={styles.excluir}
        >
          Excluir filme
        </button>

      </div>

    </article>
  )
}

export default FilmeCard