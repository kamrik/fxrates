<main class="grid">
	<aside data-theme="dark" class="closed-on-mobile">
		<nav>
			<p>Table of content</p>
			<details>
				<summary>Getting started</summary>
				<ul>
					<li><a href="./" id="start-link" class="secondary">Usage</a></li>
					<li><a href="./themes.html" id="themes-link" class="secondary">Themes</a></li>
					<li>
						<a href="./customization.html" id="customization-link" class="secondary"
							>Customization</a
						>
					</li>
					<li>
						<a href="./classless.html" id="classless-link" class="secondary">Class-less version</a>
					</li>
					<li><a href="./rtl.html" id="rtl-link" class="secondary">RTL</a></li>
				</ul>
			</details>

			<details>
				<summary>Layout</summary>
				<ul>
					<li><a href="./containers.html" id="containers-link" class="secondary">Containers</a></li>
					<li><a href="./grid.html" id="grid-link" class="secondary">Grid</a></li>
					<li>
						<a href="./scroller.html" id="scroller-link" class="secondary">Horizontal scroller</a>
					</li>
				</ul>
			</details>
			<details>
				<summary>Elements</summary>
				<ul>
					<li><a href="./typography.html" id="typography-link" class="secondary">Typography</a></li>
					<li><a href="./buttons.html" id="buttons-link" class="secondary">Buttons</a></li>
					<li><a href="./forms.html" id="forms-link" class="secondary">Forms</a></li>
					<li><a href="./tables.html" id="tables-link" class="secondary">Tables</a></li>
				</ul>
			</details>
			<details>
				<summary>Components</summary>
				<ul>
					<li><a href="./accordions.html" id="accordions-link" class="secondary">Accordions</a></li>
					<li><a href="./cards.html" id="cards-link" class="secondary">Cards</a></li>
					<li><a href="./dropdowns.html" id="dropdowns-link" class="secondary">Dropdowns</a></li>
					<li><a href="./modal.html" id="modal-link" class="secondary">Modal</a></li>
					<li><a href="./navs.html" id="navs-link" class="secondary">Navs</a></li>
					<li><a href="./progress.html" id="progress-link" class="secondary">Progress</a></li>
				</ul>
			</details>
			<details>
				<summary>Utilities</summary>
				<ul>
					<li><a href="./loading.html" id="loading-link" class="secondary">Loading</a></li>
					<li><a href="./tooltips.html" id="tooltips-link" class="secondary">Tooltips</a></li>
				</ul>
			</details>
			<details>
				<summary>Extend</summary>
				<ul>
					<li>
						<a href="./we-love-classes.html" id="we-love-classes-link" class="secondary"
							>We love .classes</a
						>
					</li>
				</ul>
			</details>
		</nav>
		<script>
			const activeLink = document.querySelector(`aside a#${props.active}`);
			const parentAccordion = activeLink.closest('details');
			activeLink.setAttribute('aria-current', 'page');
			parentAccordion.setAttribute('open', 'true');
		</script>
	</aside>

	<div role="document">
		<h1>Accordions</h1>
		<details>
			<summary>Accordion 1</summary>
			<p>…</p>
		</details>

		<details open>
			<summary>Accordion 2</summary>
			<ul>
				<li>…</li>
				<li>…</li>
			</ul>
		</details>

		<h2>Accordion with role button</h2>
		<!-- Primary -->
		<details>
			<summary role="button">Accordion 1</summary>
			<p>…</p>
		</details>

		<!-- Secondary -->
		<details>
			<summary role="button" class="secondary">Accordion 2</summary>
			<p>…</p>
		</details>

		<!-- Contrast -->
		<details>
			<summary role="button" class="contrast">Accordion 3</summary>
			<p>…</p>
		</details>
	</div>
</main>

<style>
	main {
		grid-template-columns: 200px auto;
		grid-column-gap: calc(var(--block-spacing-horizontal) * 3);
	}
	aside {
		background-color: var(--background-color);
		padding: var(--block-spacing-horizontal) var(--block-spacing-horizontal);
	}
</style>
