<script lang="ts">
	import '@picocss/pico';
	import '../app.css';
</script>

<!-- <header>
	<nav class="container-fluid">
		<ul><li><strong><Icon icon="mdi:home" /></strong></li></ul>
		<ul>
			<li><strong>Currency calculator</strong></li>
		</ul>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/pico">Pico</a></li>
		</ul>
	</nav>
</header> -->

<slot />

<footer class="container">
	<hr />
	<p>Experimental code, do not rely on this data!</p>
</footer>

<style>
	nav {
		background-color: var(--background-color);
	}
</style>
