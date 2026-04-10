// sistema.js
// Gerenciador de playlist de musicas

var listaMusicas = []
var totalGlobal = 0
var ativo = false
var relatorioGlobal = ""

// Converte minutos e segundos para segundos totais
function tempoEmSegundos(minutos, segundos) { 
    var totalSegundos = minutos * 60 + segundos
    return totalSegundos
}

// Converte segundos para formato minutos:segundos (ex: 2:30)
function segundosParaMinutos(total) { 
    var minutos = Math.floor(total / 60)
    var segundos = total % 60
    if (segundos < 10) {
        return minutos + ":0" + segundos
    }
    return minutos + ":" + segundos
}

// Busca uma música pelo nome dentro da lista
function buscarPorNome(lista, n) {
    var resultado = null
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].nome === n) {
            resultado = lista[i]
        }
    }
    return resultado
}

// Valida se um número está entre 0 e 100
function validarNumero(volume) { 
    if (volume === null) return false;

    if (volume < 0 || volume > 100 || (typeof volume !== "number")) return false;

    return true;
}

// Calcula a duração total de todas as músicas da lista
function calcularDuracaoTotal(listaMusicas) { 
    var duracaoTotal = 0
    for (var i = 0; i < listaMusicas.length; i++) {
        duracaoTotal = duracaoTotal + listaMusicas[i].duracao
    }
    totalGlobal = duracaoTotal
    return duracaoTotal
}

// Alterna o status de favorito (true/false) de uma música pelo índice
function alternarFavorito(indice) {
    if (indice >= 0 && indice < listaMusicas.length) {
        if (listaMusicas[indice].favorito == false) {
            listaMusicas[indice].favorito = true
        } else {
            listaMusicas[indice].favorito = false
        }
    }
}

// Retorna uma lista de músicas com base em uma propriedade (ex: artista ou genero)
function buscarPorPropriedade(listaMusicas, propriedade, valor) {
    var musicasEncontradas = []

    for (var indice = 0; indice < listaMusicas.length; indice++) {
        if (listaMusicas[indice][propriedade] === valor) {
            musicasEncontradas.push(listaMusicas[indice])
        }
    }

    return musicasEncontradas
}

// Conta quantas músicas estão marcadas como favoritas
function contarFavoritas(listaMusicas) {
    var quantidadeFavoritas = 0
    for (var indice = 0; indice < listaMusicas.length; indice++) {
        if (listaMusicas[indice].favorito === true) {
            quantidadeFavoritas = quantidadeFavoritas + 1
        }
    }
    return quantidadeFavoritas
}

// Ordena a lista de músicas em ordem alfabética pelo nome
function ordenarLista(listaMusicas) {
    var listaOrdenada = listaMusicas.slice()

    listaOrdenada.sort(function (posicaoA, posicaoB) {
        if (posicaoA.nome < posicaoB.nome) return -1
        if (posicaoA.nome > posicaoB.nome) return 1
        return 0
    })
    return listaOrdenada
}

// Troca a posição de duas músicas na lista
function trocarPosicoes(listaMusicas, indice1, indice2) {
    if (indice1 < 0 || indice1 >= listaMusicas.length) return
    if (indice2 < 0 || indice2 >= listaMusicas.length) return

    var musicaTemporaria = listaMusicas[indice1]
    listaMusicas[indice1] = listaMusicas[indice2]
    listaMusicas[indice2] = musicaTemporaria
}

// Retorna músicas com duração menor ou igual ao valor informado
function buscarPorDuracao(listaMusicas, duracaoMaxima) {
    var musicasEncontradas = []

    for (var indice = 0; indice < listaMusicas.length; indice++) {
        if (listaMusicas[indice].duracao <= duracaoMaxima) {
            musicasEncontradas.push(listaMusicas[indice])
        }
    }
    return musicasEncontradas
}

// Adiciona uma nova música na lista
function adicionarMusica(nome, artista, genero, minutos, segundos) {
    var musica = {}
    musica.nome = nome
    musica.artista = artista
    musica.genero = genero
    musica.duracao = tempoEmSegundos(minutos, segundos)
    musica.favorito = false
    listaMusicas.push(musica)
}

// Exibe as músicas da lista na tela (HTML)
function mostra() { 
    for (var indice = 0; indice < listaMusicas.length; indice++) {
        document.getElementById('musica' + indice).innerHTML = listaMusicas[indice].nome + " - " + listaMusicas[indice].artista + " (" + segundosParaMinutos(listaMusicas[indice].duracao) + ")"
    }
}

// Gera um relatório completo da playlist em formato de texto
function gerarRelatorioPlaylist() {
    var relatorio = ""

    relatorio = relatorio + "=== RELATORIO DA PLAYLIST ===\n"
    relatorio = relatorio + "Total de musicas: " + listaMusicas.length + "\n"
    relatorio = relatorio + "Favoritas: " + contarFavoritas(listaMusicas) + "\n"
    relatorio = relatorio + "Duracao total: " + segundosParaMinutos(calcularDuracaoTotal(listaMusicas)) + "\n"
    relatorio = relatorio + "\n"

    for (var indice = 0; indice < listaMusicas.length; indice++) {
        var favorito = ""

        if (listaMusicas[indice].favorito == true) {
            favorito = " [FAVORITA]"
        }
        relatorio = relatorio + (indice + 1) + ". " + listaMusicas[indice].nome + " - " + listaMusicas[indice].artista + " (" + segundosParaMinutos(listaMusicas[indice].duracao) + ")" + favorito + "\n"
    }
    relatorioGlobal = relatorio
    console.log(relatorio)

    return relatorio
}