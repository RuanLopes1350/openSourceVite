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
  <div id="cards" class="cards"> </div>
  
`
  const cardsContainer = document.querySelector<HTMLDivElement>('#cards')!
  cards.forEach((card) => {
    const cardDiv = document.createElement('div')
    cardDiv.className = `card card${card.id}`
    cardDiv.style.borderColor = card.cor
    
    const tecnologiasHTML = card.tecnologias
      .map(tech => `<span class="tech-tag">${tech}</span>`)
      .join('')
    
    cardDiv.innerHTML = `
      <div class="card-icon" style="background-color: ${card.cor}">${card.icone}</div>
      <h2 class="card-title">${card.titulo}</h2>
      <p class="card-description">${card.descricao}</p>
      <div class="card-technologies">
        ${tecnologiasHTML}
      </div>
      <a href="${card.link}" target="_blank" class="card-link" style="color: ${card.cor}">Ver projeto</a>
    `
    cardsContainer.appendChild(cardDiv)
  })

  // Adicionar funcionalidade de pesquisa
  const searchInput = document.querySelector<HTMLInputElement>('#pesquisar')!
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase()
    
    document.querySelectorAll('.card').forEach(cardElement => {
      const title = cardElement.querySelector('.card-title')?.textContent?.toLowerCase() || ''
      const description = cardElement.querySelector('.card-description')?.textContent?.toLowerCase() || ''
      
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        (cardElement as HTMLElement).style.display = 'flex'
      } else {
        (cardElement as HTMLElement).style.display = 'none'
      }
    })
  })
}

carregarCards()