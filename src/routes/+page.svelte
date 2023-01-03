<script lang="ts">
	import { onMount } from 'svelte';

	let loading = true;
	let rateMap = new Map();
	let rates: any[] = [];

	let amount1 = 1;
	let amount2 = 1;

	// TODO: try to get the default pair from local storage or cookie
	let symbol1 = 'USD';
	let symbol2 = 'RUB';

	// $: amount2 = (amount1 / rateMap.get(symbol1).rate) * rateMap.get(symbol2).rate;
	$: amount2 = convert(amount1, symbol1, symbol2);

	onMount(async () => {
		const url = '/rates.json';
		const res = await fetch(url);
		rates = await res.json();
		rateMap = new Map();
		rates.forEach((rate: any) => {
			rateMap.set(rate.symbol, rate);
		});

		loading = false;

		amount2 = convert(amount1, symbol1, symbol2);
	});

	function swap() {
		const symTmp = symbol2;
		symbol2 = symbol1;
		symbol1 = symTmp;
	}

	function convert(amount: number, fromSymbol: string, toSymbol: string) {
		if (loading) return NaN;

		const fromRate = rateMap.get(fromSymbol)?.rate;
		const toRate = rateMap.get(toSymbol)?.rate;
		let x = (amount / fromRate) * toRate;
		// Rounding
		if (x >= 1) {
			return Math.round(x * 100) / 100;
		}

		// For numbers below 1, preserve N significant digits
		const N = 4;
		const pow = Math.floor(Math.log10(x));
		const factor = Math.pow(10, N - 1 - pow);
		return Math.round(x * factor) / factor;
	}

	function handleClick() {
		console.log('Clicked');
	}
</script>

<main class="container">
	<h2>Main title</h2>

	<input type="number" bind:value={amount1} />

	{#if loading}
		<span aria-busy="true" />
	{:else}
		<div class="currencies">
			<div>
				<select id="cur1select" name="cur1" bind:value={symbol1}>
					{#each rates as rate, i}
						<option value={rate.symbol}>{rate.symbol}</option>
					{/each}
				</select>

				<select id="cur2select" name="cur2" bind:value={symbol2}>
					{#each rates as rate}
						<option value={rate.symbol}>{rate.symbol}</option>
					{/each}
				</select>
			</div>
			<button on:click={swap}>Swap</button>
		</div>

		<p>
			<b>{amount1}</b>
			{symbol1} =
			<b>{amount2}</b>
			{symbol2}
		</p>
		<div class="small-rates">
			<span>1 {symbol1} = {convert(1, symbol1, symbol2)} {symbol2}</span>
			<span>1 {symbol2} = {convert(1, symbol2, symbol1)} {symbol1}</span>
		</div>
	{/if}

	<!-- Raw data -->
	<article>
		<header>
			<h3>Raw data</h3>
		</header>
		<pre>{JSON.stringify(rates, null, '    ')}</pre>
	</article>

	<!-- Experiments -->
	<p>Press <kbd>Ctrl+Z</kbd> to fix <s>shit</s> it all</p>
	<button>Fetch</button>
</main>

<!-- ### Style ########### -->
<style>
	main {
		/* For alternating dark and light blocks */
		background-color: var(--background-color);
	}
	article > header > h3 {
		margin-bottom: 0;
	}

	.currencies {
		display: grid;
		grid-template-columns: auto 100px;
		grid-column-gap: calc(var(--block-spacing-horizontal) * 3);
		align-items: center;
	}
	.small-rates {
		display: grid;
		font-size: 0.8em;
	}
</style>
