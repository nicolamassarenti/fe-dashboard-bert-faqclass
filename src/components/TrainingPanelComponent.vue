<template>
	<div class="card w-100 h-100">
		<div class="card-body">
			<div class="container">
				<div class="row">
					<div class="col-12 d-flex justify-content-center">
						<h5 class="card-title">Training Control Panel</h5>
					</div>
				</div>
				<div class="row"><p></p></div>
				<div class="row">
					<div class="col-2"></div>
					<div class="col-4 d-flex justify-content-center">
                        <div v-if="ongoingTraining">
							<div class="spinner-border text-primary" role="status">
								<span class="sr-only">Loading...</span>
							</div>
                        </div>
                        <div v-else>
							<button type="button" class="btn btn-outline-success" disabled>
								<i class="fas fa-check-circle fa-2x"></i>
							</button>
						</div>
                    </div>
                    <div class="col-4 w-100 d-flex justify-content-center align-items-center">
                        	<span class="align-middle">{{trainingMessage[ongoingTraining]}}</span>
                    </div>
					<div class="col-2"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TrainingPanel",
	components: {},
	data() {
		return {
            trainingMessage: {
                true: "Training Ongoing",
                false: "Training Completed"
            },
            
		};
	},
	props: {
        ongoingTraining: {
            type: Boolean, 
            required: true
        }
	},
	created() {
	},
	methods: {}
};
</script>