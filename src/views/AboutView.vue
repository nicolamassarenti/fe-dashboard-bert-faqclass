<template>
	<div class="container-fluid">
		<div class="row"><p></p></div>
		<div class="row">
			<div class="col-1"></div>
			<div class="col-10 d-flex justify-content-center">
				<h2>About</h2>
			</div>
			<div class="col-1"></div>
		</div>
		<div class="row"  style="height: 100px">
			<p></p>
		</div>
		<div class="row">
			<div class="col-1"></div>
			<div class="col-4">
				<div class="card mb-3">
					<img class="card-img-top" src="../assets/NicolaMassarenti.jpg" alt="Nicola Massarenti">
					<div class="card-body">
						<h5 class="card-title">Who I am</h5>
						<p class="card-text">I'm Nicola Massarenti a Machine Learning Engineer.</p>
						<p class="card-text">You can check out my references here:</p>
						<div class="d-flex justify-content-around">
							<a class="btn-floating btn-lg btn-li" type="button" role="button"><i class="fab fa-linkedin-in"></i></a>
							<a class="btn-floating btn-lg btn-git" type="button" role="button"><i class="fab fa-github"></i></a>
						</div>
					</div>
				</div>
			</div>
			<div class="col-2"></div>
			<div class="col-4">
				<div class="card mb-3">
					<div class="card-body">
						<h5 class="card-title">About this project</h5>
						<p class="card-text">This project wants to demonstrate the power of a cloud native application.</p>
						<p class="card-text">All the components are managed with the Google Cloud Platform.</p>
					</div>
				</div>
			</div>
			<div class="col-1"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "About"
}
</script>
