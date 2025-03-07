import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {
    url: window.location.pathname
  }
})

export default app