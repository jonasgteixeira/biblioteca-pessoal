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