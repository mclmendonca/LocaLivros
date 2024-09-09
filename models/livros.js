class Livro {
  constructor(id, titulo, autor, genero, quantidadeEmEstoque) {
      this.id = id;
      this.titulo = titulo;
      this.autor = autor;
      this.genero = genero;
      this.quantidadeEmEstoque = quantidadeEmEstoque;
  }
}

module.exports = Livro;
