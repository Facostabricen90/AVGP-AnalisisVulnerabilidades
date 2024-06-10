import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

// Obtener el formulario y el campo de entrada de URL
const urlForm = document.querySelector<HTMLFormElement>('#urlForm')!
const urlInput = document.querySelector<HTMLInputElement>('#urlInput')!

// Agregar evento de escucha para el envío del formulario
urlForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  
  const url = urlInput.value
  
  try {
    // Realizar una solicitud POST al backend con la URL
    const response = await fetch('http://localhost:5000/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    })
    
    if (response.ok) {
      console.log('URL sent successfully')
    } else {
      console.error('Failed to send URL to backend')
    }
  } catch (error) {
    console.error('Error sending URL to backend:', error)
  }
})

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
