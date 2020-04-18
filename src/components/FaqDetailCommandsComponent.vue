<template>
	<div class="card" style="height: 100%">
		<div class="card-body d-flex align-items-end" style="height: 100%">
			<div class="row" style="width: 100%;">
				<div class="col-4">
					<button type="button" style="height: 100%; width:100%;" :class="classButtonTrained[toTrain]" v-on:click="changeTrainingStatus()">
						<i class="fas fa-brain"></i><br>{{trainingStatusText}}
					</button>
				</div>
				<div class="col-4">
					<button type="button" style="height: 100%; width:100%;" class="btn btn-outline-danger" v-on:click="deleteFaq()">
						<i class="fas fa-trash"></i><br>Delete
					</button>
				</div>	
				<div class="col-4">
					<button type="button" style="height: 100%; width:100%;" class="btn btn-outline-success" v-on:click="saveFaq()">
						<i class="fas fa-save"></i><br>Save
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "FaqDetailCommandsComponent",
	props: {
		trained: {
			type: Boolean,
			required: true
		},
		id: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			toTrain: false,
			trainingStatusText: "Inactive",
			classButtonTrained: {
				true: "btn btn-outline-success",
				false: "btn btn-outline-dark"
			},
			urlBackend:
				global.config.backendUrl +
				global.config.backendPort +
				global.config.backendApiPath +
				global.config.getFaqsEndpoint
		};
	},
	created() {
		this.toTrain = this.trained;
	},
	methods: {
		changeTrainingStatus() {},
		async changeTrainingStatus() {
			var that = this;
			var newTrainingStatus = !that.toTrain;

			var parameters = {
				params: {
					id: that.id,
					toTrain: newTrainingStatus
				}
			};
			await axios
				.put(that.urlBackend, null, parameters)
				.then(res => {
					that.toTrain = newTrainingStatus;
					if (newTrainingStatus) {
						that.trainingStatusText = "Active";
					} else {
						that.trainingStatusText = "Inactive";
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		async deleteFaq() {
			var that = this;
			var parameters = {
				params: {
					id: that.id
				}
			};
			await axios
				.delete(that.urlBackend, parameters)
				.then(res => {
					this.$router.push({ name: "Knowledge Base" });
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>