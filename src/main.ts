import './style/global.css'
import './style/header.css'
import './style/search.css'
import './style/main.css'
import './style/card1.css'
import './style/card2.css'
import './style/card3.css'
import './style/card4.css'
import './style/card5.css'
import './style/card6.css'
import './style/card7.css'
import './style/card8.css'
import './style/footer.css'

interface Card {
  id: number,
  icone: string,
  cor: string,
  titulo: string,
  descricao: string,
  tecnologias: string[],
  link: string
}

const app = document.querySelector<HTMLDivElement>('#app')!

async function carregarCards() {
  const resposta = await fetch('./cards.json')
  const cards: Card[] = await resposta.json()

  app.innerHTML = `
  <header>
        <p>Open Source Projects</p>
    </header>

    <div class="search">
        <input type="text" name="pesquisar" id="pesquisar" placeholder="Buscar projetos">
    </div>
  <main id="cards"></main>
  <footer id="footer"></footer>
`

  const searchInput = document.querySelector<HTMLInputElement>('#pesquisar')!
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase()

    document.querySelectorAll('.card').forEach(cardElement => {
      const title = cardElement.querySelector('.card-titulo')?.textContent?.toLowerCase() || ''
      const description = cardElement.querySelector('.card-descricao')?.textContent?.toLowerCase() || ''

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        (cardElement as HTMLElement).style.display = 'block'
      } else {
        (cardElement as HTMLElement).style.display = 'none'
      }
    })
  })

  const cardsContainer = document.querySelector<HTMLElement>('#cards')!

  cards.forEach((card) => {
    const cardDiv = document.createElement('div')
    cardDiv.className = `card`

    const tecnologiasHTML = card.tecnologias
      .map(tech => `<span class="tag">${tech}</span>`)
      .join('')

    cardDiv.innerHTML = `
      <div class="card-img${card.id}">
        <img src="/${card.icone}" alt="${card.titulo}">
      </div>
      <h2 class="card-titulo">${card.titulo}</h2>
      <p class="card-descricao">${card.descricao}</p>
      <div class="card-tags">
        ${tecnologiasHTML}
      </div>
      <div class="card-botao">
        <a href="${card.link}" target="_blank">Ver projeto</a>
      </div>
    `
    cardsContainer.appendChild(cardDiv)
  })

  const footer = document.querySelector<HTMLElement>('#footer')!
  footer.innerHTML = `
    <img src="ifro.png">
    <img src="fslab.png">
  `

}

carregarCards()