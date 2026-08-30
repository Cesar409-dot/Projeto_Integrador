import styles from "./FormularioFilme.module.css";

function FormularioFilme({
    titulo,
    setTitulo,
    diretor,
    setDiretor,
    genero,
    setGenero,
    anoLancamento,
    setAnoLancamento,
    duracao,
    setDuracao,
    sinopse,
    setSinopse,
    onSubmit,
    carregando,
}) {
    return (
        <form onSubmit={onSubmit} className={styles.formulario}>
            <div className={styles.campo}>
                <label htmlFor="titulo">Título</label>

                <input
                    id="titulo"
                    type="text"
                    value={titulo}
                    onChange={(event) => setTitulo(event.target.value)}
                    placeholder="Digite o título do filme"
                />
            </div>

            <div className={styles.campo}>
                <label htmlFor="diretor">Diretor</label>

                <input
                    id="diretor"
                    type="text"
                    value={diretor}
                    onChange={(event) => setDiretor(event.target.value)}
                    placeholder="Digite o diretor"
                />
            </div>

            <div className={styles.campo}>
                <label htmlFor="genero">Gênero</label>

                <input
                    id="genero"
                    type="text"
                    value={genero}
                    onChange={(event) => setGenero(event.target.value)}
                    placeholder="Digite o gênero"
                />
            </div>

            <div className={styles.campo}>
                <label htmlFor="anoLancamento">Ano de lançamento</label>

                <input
                    id="anoLancamento"
                    type="number"
                    value={anoLancamento}
                    onChange={(event) => setAnoLancamento(event.target.value)}
                    placeholder="Ex: 2024"
                />
            </div>

            <div className={styles.campo}>
                <label htmlFor="duracao">Duração em minutos</label>

                <input
                    id="duracao"
                    type="number"
                    value={duracao}
                    onChange={(event) => setDuracao(event.target.value)}
                    placeholder="Ex: 120"
                />
            </div>

            <div className={styles.campo}>
                <label htmlFor="sinopse">Sinopse</label>

                <textarea
                    id="sinopse"
                    value={sinopse}
                    onChange={(event) => setSinopse(event.target.value)}
                    placeholder="Digite a sinopse do filme"
                    rows="5"
                />
            </div>

            <button type="submit" disabled={carregando} className={styles.botao}>
                {carregando ? "Cadastrando..." : "Cadastrar filme"}
            </button>
        </form>
    );
}

export default FormularioFilme;
