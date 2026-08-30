import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./EditarFilme.module.css";
import axios from "axios";

function EditarFilme() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState("");
    const [diretor, setDiretor] = useState("");
    const [genero, setGenero] = useState("");
    const [anoLancamento, setAnoLancamento] = useState("");
    const [duracao, setDuracao] = useState("");
    const [sinopse, setSinopse] = useState("");

    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");

    useEffect(() => {
        buscarFilme();
    }, [id]);

    async function buscarFilme() {

        try {

            setCarregando(true);
            setErro("");

            const resposta = await axios.get(
                `http://localhost:8080/filmes/${id}`
            );

            const filme = resposta.data;

            setTitulo(filme.titulo);
            setDiretor(filme.diretor);
            setGenero(filme.genero);
            setAnoLancamento(filme.anoLancamento);
            setDuracao(filme.duracao);
            setSinopse(filme.sinopse);

        } catch (error) {

            if (error.response && error.response.status === 404) {
                setErro("Filme não encontrado.");
            } else {
                setErro("Não foi possível carregar o filme.");
            }

        } finally {

            setCarregando(false);

        }
    }

    async function atualizarFilme(event) {

    event.preventDefault();

    setErro("");

    if (
        titulo.trim() === "" ||
        diretor.trim() === "" ||
        genero.trim() === "" ||
        anoLancamento === "" ||
        duracao === "" ||
        sinopse.trim() === ""
    ) {
        setErro("Preencha todos os campos.");
        return;
    }

    const filme = {
        titulo: titulo.trim(),
        diretor: diretor.trim(),
        genero: genero.trim(),
        anoLancamento: Number(anoLancamento),
        duracao: Number(duracao),
        sinopse: sinopse.trim()
    };

    try {

    setSalvando(true);

    console.log("ANTES DO PUT");

    await axios.put(
        `http://localhost:8080/filmes/${id}`,
        filme
    );

    console.log("PUT DEU CERTO");

    navigate("/");

} catch (error) {

    console.log("CAIU NO CATCH");
    console.log(error);

    setErro("Não foi possível atualizar o filme.");

} finally {

    setSalvando(false);

}
}

    if (carregando) {

        return (
            <div className={styles.mensagem}>
                Carregando filme...
            </div>
        );

    }

    if (erro && !titulo) {

        return (
            <div className={styles.mensagem}>

                <p>{erro}</p>

                <Link to="/">
                    Voltar para filmes
                </Link>

            </div>
        );

    }

    return (

        <div className={styles.container}>

            <header className={styles.header}>

                <div>
                    <h1>CesarFlix</h1>
                    <p>Editar filme</p>
                </div>

                <Link
                    to="/"
                    className={styles.voltar}
                >
                    Voltar
                </Link>

            </header>

            <main className={styles.conteudo}>

                <form
                    onSubmit={atualizarFilme}
                    className={styles.formulario}
                >

                    <h2>Editar filme</h2>

                    {erro && (
                        <div className={styles.erro}>
                            {erro}
                        </div>
                    )}

                    <label>
                        Título

                        <input
                            type="text"
                            value={titulo}
                            onChange={(event) =>
                                setTitulo(event.target.value)
                            }
                        />

                    </label>

                    <label>
                        Diretor

                        <input
                            type="text"
                            value={diretor}
                            onChange={(event) =>
                                setDiretor(event.target.value)
                            }
                        />

                    </label>

                    <label>
                        Gênero

                        <input
                            type="text"
                            value={genero}
                            onChange={(event) =>
                                setGenero(event.target.value)
                            }
                        />

                    </label>

                    <label>
                        Ano de lançamento

                        <input
                            type="number"
                            value={anoLancamento}
                            onChange={(event) =>
                                setAnoLancamento(event.target.value)
                            }
                        />

                    </label>

                    <label>
                        Duração em minutos

                        <input
                            type="number"
                            value={duracao}
                            onChange={(event) =>
                                setDuracao(event.target.value)
                            }
                        />

                    </label>

                    <label>
                        Sinopse

                        <textarea
                            value={sinopse}
                            onChange={(event) =>
                                setSinopse(event.target.value)
                            }
                            rows="5"
                        />

                    </label>

                    <button
                        type="submit"
                        disabled={salvando}
                    >
                        {salvando
                            ? "Salvando..."
                            : "Salvar alterações"}
                    </button>

                </form>

            </main>

        </div>

    );
}

export default EditarFilme;