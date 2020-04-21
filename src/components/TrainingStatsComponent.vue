<template>
	<div class="card faq-card">
		<div class="container">
            <div class="row">
			<div class="col-10 card-body">
				<span>{{mainQuestion}}</span>
			</div>
			<div class="col-2 center-align-button">
				<div class="button-container">
					<button type="button" :class="classButtonTrained[trained]" v-on:click="changeTrainingStatus()">
						<span>
							<i class="fas fa-brain"></i>
						</span>
					</button>
					<button type="button" class="btn btn-outline-danger" v-on:click="deleteFaq()">
						<i class="fas fa-trash"></i>
					</button>
					<button type="button" class="btn btn-outline-success" v-on:click="getFaqDetails()">
						<i class="fas fa-arrow-right"></i>
					</button>
				</div></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TrainingStats",
	components: {},
	data() {
		return {
		};
	},
	props: {
	},
	created() {
	},
	methods: {}
};
</script>