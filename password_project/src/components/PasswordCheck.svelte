<script>
	import { zxcvbn } from "@zxcvbn-ts/core";

	let password = "";
	let result = null;

	async function checkPassword() {
		const res = zxcvbn(password);

		const entropy = Math.log2(res.guesses);

		result = {
			score: res.score,
			entropy,
			feedback: res.feedback,
		};

		const scores = JSON.parse(
			localStorage.getItem("passwordScores") || "[]",
		);
		scores.push(result.score);
		localStorage.setItem("passwordScores", JSON.stringify(scores));

		try {
			const response = await fetch(
				"http://localhost:3001/api/save-password",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ password }),
				},
			);

			if (!response.ok) {
				console.error("Errore nel salvataggio della password");
			} else {
				console.log("Password salvata nel database");
			}
		} catch (err) {
			console.error("Errore connessione backend:", err);
		}
	}
</script>

<div class="password-check">
	<label class="title">Inserisci la tua password:</label>
	<br />
	<input
		type="password"
		bind:value={password}
		class="input"
		placeholder="Password"
	/>
	<button on:click={checkPassword} class="button">Controlla</button>

	{#if result}
		<div class="result">
			<p><strong>Score:</strong> {result.score} / 4</p>
			<p>
				<strong>Entropia stimata:</strong>
				{result.entropy.toFixed(2)} bit
			</p>
			{#if result.feedback.warning}
				<p class="warning">
					<strong>Attenzione:</strong>
					{result.feedback.warning}
				</p>
			{/if}
			<ul>
				{#each result.feedback.suggestions as suggestion}
					<li>⚠️ {suggestion}</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	.password-check {
		max-width: 500px;
		margin: 2rem auto;
		background: #ffffff;
		padding: 2rem;
		border-radius: 8px;
		border: 1px solid #e0e7ff;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}

	.input {
		width: 100%;
		padding: 0.8rem;
		margin-bottom: 1rem;
		border: 2px solid #ddd;
		border-radius: 8px;
		font-size: 1rem;
		box-sizing: border-box;
		transition: border-color 0.3s ease;
	}

	.input:focus {
		border-color: #4c51bf;
		outline: none;
	}

	.title {
		margin-bottom: 1rem;
	}

	.button {
		width: 100%;
		padding: 0.8rem;
		background-color: #484db0;
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-size: 1rem;
		transition: background-color 0.3s ease;
	}

	.button:hover {
		background-color: #484c97;
	}

	.result {
		margin-top: 1rem;
		background: #f9f9f9;
		padding: 1rem;
		border-radius: 8px;
		border: 1px solid #ddd;
	}

	.warning {
		color: #f44336;
		font-weight: bold;
	}

	ul {
		margin-top: 1rem;
		list-style-type: none;
		padding-left: 1rem;
	}

	ul li {
		margin: 0.5rem 0;
	}
</style>
