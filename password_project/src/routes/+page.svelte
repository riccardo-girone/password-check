<script>
	import PasswordCheck from "../components/PasswordCheck.svelte";
	import Awareness from "../components/Awareness.svelte";
</script>

<main>
	<h1>Password Security Checker</h1>
	<PasswordCheck />
	<Awareness />
</main>

<style>
	main {
		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: bold;
		color: #333;
		text-align: center;
		margin-bottom: 2rem;
		text-transform: uppercase;
	}
</style>
