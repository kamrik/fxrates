<script>
	function handleClick() {
		console.log('Clicked');
	}
</script>

<main class="container">
	<h2>Main title</h2>
	<button class="contrast theme-switcher">…</button>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	<p>Press <kbd>Ctrl+Z</kbd> to fix <s>shit</s> it all</p>
	<button on:click={handleClick}> Click me</button>
</main>

<style>
	main {
		/* For alternating dark and light blocks */
		background-color: var(--background-color);
	}
</style>
