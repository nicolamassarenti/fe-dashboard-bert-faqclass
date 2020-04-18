<template>
	<div class="card" style="height: 100%">
		<div class="card-body">
			<div class="row">
				<div class="col-10">
					<h5 class="card-title">Main question</h5>
					<span class="card-text">{{question}}</span>
				</div>
				<div class="col-2">
					<div v-if="!edit" class="main-question-edit-container">
						<button class="btn btn-warning" v-on:click="editMainQuestion()">Edit</button>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-10">
					<div v-if="edit">
						<input
							type="text"
							class="form-control"
							aria-label="Default"
							aria-describedby="inputGroup-sizing-default"
							v-model="question"
						/>
					</div>
				</div>
				<div class="col-2">
					<div v-if="edit">
						<div class="main-question-edit-container">
							<a href="#" class="btn btn-success" v-on:click="saveNewMainQuestion()">Save</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "MainQuestionComponent",
	data() {
		return {
			edit: false,
			question: "",
			urlBackend:
				global.config.backendUrl +
				global.config.backendPort +
				global.config.backendApiPath +
				global.config.getFaqsEndpoint
		};
	},
	props: {
		text: {
			type: String,
			required: true
		},
		id: {
			type: String,
			required: true
		}
	},
	watch:{
		text: function(val){
			this.question = val;
		}
	},
	methods: {
		editMainQuestion() {
			this.edit = !this.edit;
		},
		async saveNewMainQuestion() {
			let that = this;

			let parameters = {
				params: {
					mainQuestion: that.question,
					id: that.id
				}
			};
			await axios
				.put(that.urlBackend, null, parameters)
				.then(res => {
					that.text = that.question;
					that.edit = !that.edit;
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>