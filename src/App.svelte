<script>
  import { Router, Route, Link } from "svelte-routing";
  import NineTopics from "./pages/9topics/NineTopics.svelte";
  import TenTopics from "./pages/10topics/TenTopics.svelte";

  export let url = "";
</script>

<Router {url}>
  <main>
    <h1>Modelling visualization by Latent Dirichlet Allocation (LDA) (v2)</h1>
    <nav>
      <ul>
        <li><Link to="/9topics">9 Topics</Link></li>
      </ul>
    </nav>

    <div>
      <Route path="/9topics" component={NineTopics} />
    </div>
  </main>
</Router>

<style>
  /* Your styles here */
</style>