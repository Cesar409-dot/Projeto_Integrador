import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilmeCard from "../componentes/FilmeCard";
import styles from "./Home.module.css";
import axios from "axios";

function Home() {

    const [filmes, setFilmes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        buscarFilmes();
    }, []);

    async function buscarFilmes() {

        try {

            setCarregando(true);
            setErro("");

            const resposta = await axios.get(
                "http://localhost:8080/filmes"
            );

            setFilmes(resposta.data);

        } catch (error) {

            setErro("Não foi possível carregar os filmes.");

        } finally {

            setCarregando(false);

        }
    }

    async function excluirFilme(id) {

        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este filme?"
        );

        if (!confirmar) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8080/filmes/${id}`
            );

            setFilmes(
                filmes.filter((filme) => filme.id !== id)
            );

        } catch (error) {

            if (error.response && error.response.status === 404) {

                alert("Filme não encontrado.");

            } else {

                alert("Não foi possível excluir o filme.");

            }

        }
    }

    return (
        <div className={styles.container}>

            <header className={styles.header}>

                <div>
                    <h1>CesarFlix</h1>
                    <p>Catálogo de filmes:</p>
                </div>

                <Link
                    to="/cadastro"
                    className={styles.botao}
                >
                    Cadastrar filme
                </Link>

            </header>

            <main className={styles.conteudo}>

                <div className={styles.tituloPagina}>

                    <h2>Filmes cadastrados</h2>

                    <button
                        onClick={buscarFilmes}
                        className={styles.atualizar}
                    >
                        Atualizar
                    </button>

                </div>

                {carregando && (
                    <p className={styles.mensagem}>
                        Carregando filmes...
                    </p>
                )}

                {!carregando && erro && (
                    <div className={styles.erro}>

                        <p>{erro}</p>

                        <button onClick={buscarFilmes}>
                            Tentar novamente
                        </button>

                    </div>
                )}

                {!carregando &&
                    !erro &&
                    filmes.length === 0 && (
                        <div className={styles.mensagem}>

                            <p>
                                Nenhum filme cadastrado.
                            </p>

                        </div>
                    )}

                {!carregando &&
                    !erro &&
                    filmes.length > 0 && (
                        <div className={styles.lista}>

                            {filmes.map((filme) => (

                                <FilmeCard
                                    key={filme.id}
                                    filme={filme}
                                    onExcluir={excluirFilme}
                                />

                            ))}

                        </div>
                    )}

            </main>

        </div>
    );
}

export default Home;