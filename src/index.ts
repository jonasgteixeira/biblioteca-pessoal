// ============================
// GERENCIADOR DE BIBLIOTECA PESSOAL
// ============================

// --- Estrutura de dados (arrays paralelos) ---
const titulos: string[] = [];
const autores: string[] = [];
const anos: number[] = [];
const paginas: number[] = [];
const lido: boolean[] = [];
const avaliacoes: number[] = []; // 0 se não lido, 1-5 se lido

// Dados iniciais
titulos.push(
  'O Hobbit',
  'Clean Code',
  '1984',
  'Dom Casmurro',
  'O Nome do Vento'
);
autores.push(
  'J.R.R. Tolkien',
  'Robert C. Martin',
  'George Orwell',
  'Machado de Assis',
  'Patrick Rothfuss'
);
anos.push(1937, 2008, 1949, 1899, 2007);
paginas.push(310, 464, 328, 256, 662);
lido.push(true, true, false, true, false);
avaliacoes.push(5, 4, 0, 5, 0);

// --- Exibição ---
function exibirBiblioteca(): void {
  console.log('\n=================== MINHA BIBLIOTECA ====================');
  titulos.forEach((titulo, i) => {
    const status: string = lido[i]
      ? `LIDO (${avaliacoes[i]}/5)`
      : 'PENDENTE';
    console.log(
      `${i + 1}. "${titulo}" (${anos[i]}) - ${autores[i]} - ${paginas[i]} pág - ${status}`
    );
  });
}

// --- Teste da etapa ---
exibirBiblioteca();

// ...(Códigos da Etapa 2)...

// --- Cadastro e remoção ---

function adicionarLivro(titulo: string, autor: string, ano: number, pag: number): void {
    if(ano <= 0){
        console.log('Erro: o ano deve ser positivo.');
        return;
    }
    if(pag <= 0){
        console.log('Erro: o número de páginas deve ser positivo.')
        return;
    }
    titulos.push(titulo);
    autores.push(autor);
    anos.push(ano);
    paginas.push(pag);
    lido.push(false);
    avaliacoes.push(0);
}

function removerLivro(indice: number): void{
    if(indice < 0 || indice >= titulos.length){
        console.log('Erro: índice inválido.');
        return;
    }
    titulos.splice(indice, 1);
    autores.splice(indice, 1);
    anos.splice(indice, 1);
    paginas.splice(indice, 1);
    lido.splice(indice, 1);
    avaliacoes.splice(indice, 1);
}

// --- Teste da etapa ---
console.log('\n--- Adicionando 2 novos Livros ---');
adicionarLivro('O Pequeno Principe','Antoine de Saint-Exupéry', 1943, 96);
adicionarLivro('A Revolução dos Bichos','George Orwell', 1945, 144);

console.log('\n--- Removendo livro índice 3 ---');
removerLivro(3);

exibirBiblioteca();

// --- Busca e filtros ---

function buscarPorTitulo(termo: string): number[] {
  const termoLower: string = termo.toLowerCase();
  const indices: number[] = [];
  for (let i = 0; i < titulos.length; i++) {
    if (titulos[i]!.toLowerCase().includes(termoLower)) {
      indices.push(i);
    }
  }
  return indices;
}

function listarPorAutor(autor: string): string[] {
  return titulos.filter((_, i) =>
    autores[i]!.toLowerCase() === autor.toLowerCase()
  );
}

// --- Teste da etapa ---
console.log('\n--- Busca por título contendo "O" ---');
const indicesBusca = buscarPorTitulo('O');
console.log('Índices encontrados:', indicesBusca);
console.log('Títulos:', indicesBusca.map(i => titulos[i]).join(', '));

console.log('\n--- Livros de George Orwell ---');
const orwell = listarPorAutor('George Orwell');
console.log(orwell.join(', '));

// --- Status de leitura ---
function marcarComoLido(indice: number, avaliacao: number): void{
    if(indice < 0 || indice >= titulos.length) {
        console.log('Erro: Índice inválido.');
        return;
    }
    if(avaliacao < 1 || avaliacao > 5){
        console.log('Erro: Avaliação deve estar entre 1 e 5.');
        return;
    }
    lido[indice] = true;
    avaliacoes[indice] = avaliacao;
}

function listarLidos(): string[]{
    return titulos.filter((_, i) => !lido[i]);
}

function listarPendentes(): string[] {
    return titulos.filter((_, i) => !lido[i]);
}

//--- Teste da etapa ---
console.log('\n--- Marcando "O Nome do Vento" como lido (avaliação 4) ---');
//Após a remoção na etapa 3 o livro "O Nome do Vento" foi pro índice 4.
marcarComoLido(4, 4);

console.log('\n--- Livros Lidos ---');
console.log(listarPendentes().join(', '));

exibirBiblioteca();

// --- Estatísticas ---

function totalLivros(): number {
  return titulos.length;
}

function totalLidos(): number {
  return lido.filter(s => s).length;
}

function percentualLidos(): number {
  if (titulos.length === 0) return 0;
  return (totalLidos() / totalLivros()) * 100;
}

function mediaAvaliacoes(): number {
  const notasLidas: number[] = avaliacoes.filter((_, i) => lido[i]);
  if (notasLidas.length === 0) return 0;
  return notasLidas.reduce((soma, nota) => soma + nota, 0) / notasLidas.length;
}

function livroMaiorAvaliacao(): string {
  let melhorIndice: number = -1;
  let maiorNota: number = 0;
  for (let i = 0; i < titulos.length; i++) {
    if (lido[i] && avaliacoes[i]! > maiorNota) {
      maiorNota = avaliacoes[i]!;
      melhorIndice = i;
    }
  }
  return melhorIndice !== -1 ? titulos[melhorIndice]! : 'Nenhum livro lido';
}

function totalPaginasLidas(): number {
  return paginas
    .filter((_, i) => lido[i])
    .reduce((soma, p) => soma + p, 0);
}

// --- Teste da etapa ---
console.log('\n=================== ESTATÍSTICAS ===================');
console.log(`Total de livros: ${totalLivros()}`);
console.log(`Livros lidos: ${totalLidos()} (${percentualLidos().toFixed(2)}%)`);
console.log(`Média das avaliações: ${mediaAvaliacoes().toFixed(2)}`);
console.log(`Livro melhor avaliado: ${livroMaiorAvaliacao()}`);
console.log(`Total de páginas lidas: ${totalPaginasLidas()}`);

// --- Classificação por década ---

function exibirPorDecada(): void {
  console.log('\n=== POR DÉCADA ===');

  const decadas: number[] = [];
  for (let i = 0; i < anos.length; i++) {
    const dec = Math.floor(anos[i]! / 10) * 10;
    if (!decadas.includes(dec)) {
      decadas.push(dec);
    }
  }
  decadas.sort((a, b) => a - b);

  for (const dec of decadas) {
    const titulosDec: string[] = [];
    for (let i = 0; i < anos.length; i++) {
      if (Math.floor(anos[i]! / 10) * 10 === dec) {
        titulosDec.push(titulos[i]!);
      }
    }
    console.log(`${dec}s: ${titulosDec.join(', ')}`);
  }
}

// --- Teste da etapa ---
exibirPorDecada();