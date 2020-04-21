<template>
	<div class="card" style="height: 100%">
		<div class="card-body d-flex align-items-end" style="height: 100%">
			<div class="row" style="width: 100%;">
				<div class="col-4">
					<button type="button" style="height: 100%; width:100%;" :class="classButtonTrained[trained]" v-on:click="changeTrainingStatus()">
						<i class="fas fa-brain"></i><br>{{trainingStatusText[trained]}}
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
			trainingStatusText: {
				true: "Active",
				false:  "Inactive"
			},
			classButtonTrained: {
				true: "btn btn-outline-success",
				false: "btn btn-outline-dark"
			}
		};
	},
	created() {
		this.toTrain = this.trained;
	},
	methods: {
		changeTrainingStatus() {
			this.$eventHub.$emit("changeTrainingStatus");
		},
		deleteFaq() {
			this.$eventHub.$emit("deleteFaq");
		},
		saveFaq(){
			this.$eventHub.$emit("saveFaq");
		}
	}
};
</script>