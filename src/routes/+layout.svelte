<script lang="ts">
	import '@picocss/pico';
	import '../app.css';
</script>

<nav class="container">
	<ul><li><strong>Logo</strong></li></ul>
	<ul>
		<li><a href="/">Item 1</a></li>
		<li><a href="pico">Pico</a></li>
	</ul>
</nav>
<slot />

<footer class="container">
	<hr />
	<p>Footer be here</p>
</footer>
