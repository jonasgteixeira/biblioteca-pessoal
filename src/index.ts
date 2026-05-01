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