import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormularioFilme from "../componentes/FormularioFilme";
import styles from "./CadastroFilme.module.css";
import axios from "axios";

function CadastroFilme() {

    const navigate = useNavigate();

    const [titulo, setTitulo] = useState("");
    const [diretor, setDiretor] = useState("");
    const [genero, setGenero] = useState("");
    const [anoLancamento, setAnoLancamento] = useState("");
    const [duracao, setDuracao] = useState("");
    const [sinopse, setSinopse] = useState("");

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    async function cadastrarFilme(event) {

        event.preventDefault();

        setErro("");
        setSucesso("");

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

            setCarregando(true);

            await axios.post(
                "http://localhost:8080/filmes",
                filme
            );

            setSucesso("Filme cadastrado com sucesso!");

            setTitulo("");
            setDiretor("");
            setGenero("");
            setAnoLancamento("");
            setDuracao("");
            setSinopse("");

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {

            if (error.response) {

                if (error.response.status === 400) {
                    setErro("Os dados informados são inválidos.");
                } else {
                    setErro("Não foi possível cadastrar o filme.");
                }

            } else {

                setErro("Não foi possível conectar com a API.");

            }

        } finally {

            setCarregando(false);

        }
    }

    return (
        <div className={styles.container}>

            <header className={styles.header}>

                <div>
                    <h1>CesarFlix</h1>
                    <p>Cadastrar novo filme</p>
                </div>

                <Link
                    to="/"
                    className={styles.voltar}
                >
                    Voltar para filmes
                </Link>

            </header>

            <main className={styles.conteudo}>

                <div className={styles.formularioContainer}>

                    <h2>Cadastrar filme</h2>

                    {erro && (
                        <div className={styles.erro}>
                            {erro}
                        </div>
                    )}

                    {sucesso && (
                        <div className={styles.sucesso}>
                            {sucesso}
                        </div>
                    )}

                    <FormularioFilme
                        titulo={titulo}
                        setTitulo={setTitulo}

                        diretor={diretor}
                        setDiretor={setDiretor}

                        genero={genero}
                        setGenero={setGenero}

                        anoLancamento={anoLancamento}
                        setAnoLancamento={setAnoLancamento}

                        duracao={duracao}
                        setDuracao={setDuracao}

                        sinopse={sinopse}
                        setSinopse={setSinopse}

                        onSubmit={cadastrarFilme}
                        carregando={carregando}
                    />

                </div>

            </main>

        </div>
    );
}

export default CadastroFilme;