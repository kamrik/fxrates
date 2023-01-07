<script lang="ts">
	import { onMount } from 'svelte';
	import { quickAccess } from './stores';
	import Icon from '@iconify/svelte';
	import { dev } from '$app/environment';

	//// Data source: https://www.floatrates.com/json-feeds.html
	let dataURL = 'https://www.floatrates.com/daily/usd.json';
	if (dev) {
		dataURL = '/rates.json';
	}

	let loading = true;
	let rateMap = new Map();
	let rates: Object;
	let symbols: string[] = [];

	let amount1 = 1;
	let amount2 = 1;

	let symbol1 = 'USD';
	let symbol2 = 'RUB';

	let symbolQA = '';

	$: amount2 = convert(amount1, symbol1, symbol2);

	onMount(async () => {
		const res = await fetch(dataURL);
		rates = await res.json();
		rates.usd = { code: 'USD', rate: 1, inverseRate: 1, name: 'US Dollar' };
		rateMap = new Map();
		for (const record of Object.values(rates)) {
			symbols.push(record?.code);
			rateMap.set(record?.code, record);
		}

		symbols.sort();

		symbol1 = localStorage.getItem('symbol1') ?? 'USD';
		symbol2 = localStorage.getItem('symbol2') ?? 'RUB';

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

		// Save to localStorage
		localStorage.setItem('symbol1', symbol1);
		localStorage.setItem('symbol2', symbol2);

		const fromRate = rateMap.get(fromSymbol)?.rate;
		const toRate = rateMap.get(toSymbol)?.rate;
		let x = (amount / fromRate) * toRate;
		// For numbers above 10 preserve two digits after the period (like cents)
		if (x >= 10) {
			return Math.round(x * 100) / 100;
		}

		// For numbers below 10, preserve N significant digits
		const N = 4;
		const pow = Math.floor(Math.log10(x));
		const factor = Math.pow(10, N - 1 - pow);
		return Math.round(x * factor) / factor;
	}

	function handleClick() {
		console.log('Clicked');
	}

	function addQA() {
		if (symbolQA === '') {
			return;
		}
		let qa = $quickAccess.splice(0);
		qa.push(symbolQA);
		qa.sort();
		quickAccess.set(qa);
		symbolQA = '';
	}

	function arrayMinus(a: Array<any>, b: Array<any>) {
		let s = new Set(b);
		return a.filter((el) => !s.has(el));
	}
</script>

<main class="container">
	{#if loading}
		<span aria-busy="true" />
	{:else}
		<article>
			<header>
				<h3>Exchange Rates</h3>
			</header>

			<div class="input-and-button">
				<input title="Amount" role="textbox" type="number" bind:value={amount1} />

				<button on:click={swap}>
					<!-- <Icon icon="material-symbols:swap-vertical-circle-outline" width="3em" height="3em" /> -->
					Swap
				</button>
			</div>
			<div>
				<select id="cur1select" name="cur1" bind:value={symbol1}>
					<optgroup label="Quick access list">
						{#each $quickAccess as symbol}
							<option value={symbol}>{symbol} - {rateMap.get(symbol).name}</option>
						{/each}
					</optgroup>
					<optgroup label="All currencies">
						{#each symbols as symbol}
							<option value={symbol}>{symbol} - {rateMap.get(symbol).name}</option>
						{/each}
					</optgroup>
				</select>

				<select id="cur2select" name="cur2" bind:value={symbol2}>
					<optgroup label="Quick access list">
						{#each $quickAccess as symbol}
							<option value={symbol}>{symbol} - {rateMap.get(symbol).name}</option>
						{/each}
					</optgroup>
					<optgroup label="All currencies">
						{#each symbols as symbol}
							<option value={symbol}>{symbol} - {rateMap.get(symbol).name}</option>
						{/each}
					</optgroup>
				</select>
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
		</article>

		<article>
			<header>
				<h3>Quick access list</h3>
			</header>
			<p>
				Manage your quick access list (currencies shown at the top). This list is saved across
				browser sessions.
			</p>
			<div class="input-and-button">
				<select id="curQAselect" name="curQA" bind:value={symbolQA}>
					<option value="" disabled selected>Add a currency to quick access</option>
					{#each arrayMinus(symbols, $quickAccess) as symbol}
						<option value={symbol}>{symbol} - {rateMap.get(symbol).name}</option>
					{/each}
				</select>
				<button class="btn-add" on:click={addQA}>Add</button>
			</div>
			<div class="quickaccess">
				{#each $quickAccess as symbol (symbol)}
					<button
						title="Remove from quick access"
						on:click={() => {
							quickAccess.set($quickAccess.filter((x) => x !== symbol));
						}}>&#10005;</button
					>
					<span>{symbol} - {rateMap.get(symbol).name}</span>
				{/each}
			</div>
		</article>
	{/if}

	<!-- Raw data -->
	<article>
		<header>
			<h3>Raw data</h3>
		</header>
		<details>
			<summary>JSON</summary>
			<pre>{JSON.stringify(rates, null, '    ')}</pre>
		</details>
	</article>
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

	/* .currencies {
		display: grid;
		grid-template-columns: auto 100px;
		grid-column-gap: calc(var(--block-spacing-horizontal) * 3);
		align-items: center;
	} */
	.input-and-button {
		display: flex;
	}

	.input-and-button > button {
		margin-left: 1em;
		width: 6em;
	}

	.small-rates {
		display: grid;
		font-size: 0.8em;
	}

	.quickaccess {
		display: grid;
		gap: 1em;
		grid-template-columns: 1.2em auto;
		align-items: center;
	}

	.quickaccess > button {
		display: inline;
		margin: 0;
		padding: 0;
		width: 1.5em;
		height: 1.5em;
		color: red;
		border: none;
		background-color: white;
		/*
		border-color: black;
		border-radius: 1em; */
	}
</style>
