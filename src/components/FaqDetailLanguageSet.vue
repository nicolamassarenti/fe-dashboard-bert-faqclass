<template>
	<div class="card" style="width: 100%; height: auto;">
		<div class="card-body">
			<div class="row">
				<div class="col-1">
					<h5 class="card-title">{{displayLang}}</h5>
				</div>
				<div class="col-10">
					<div v-if="show" class="card">
						<ul class="list-group list-group-flush">
							<li
								class="list-group-item d-flex justify-content-between align-items-center"
								v-for="(example, index) in examples"
								:key="index"
							>
								{{example}}
								<button
									type="button"
									class="btn btn-outline-danger"
									v-on:click="deleteExample(example)"
								>
									<i class="fas fa-trash fa-xs"></i>
								</button>
							</li>
						</ul>
						<div v-if="add">
							<ul class="list-group list-group-flush">
								<li class="list-group-item d-flex justify-content-between align-items-center">
									<input
										type="text"
										class="form-control"
										aria-label="Default"
										aria-describedby="inputGroup-sizing-default"
										v-model="newExample"
									/>
									<button class="btn btn-outline-success" type="button" v-on:click="saveNewExample()">
										<i class="fas fa-check-circle fa-xs"></i>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-1">
					<button type="button" class="btn btn-light" v-on:click="hide()">
						<i :class="hideButtonClass[show]"></i>
					</button>
				</div>
			</div>
		</div>
		<div v-if="addNewExample" class="row">
			<div class="col-10"></div>
			<div class="col-1">
				<button type="button" class="btn btn-outline-success" v-on:click="addExample()">
					<i class="fas fa-plus fa-xs"></i>
				</button>
			</div>
			<div class="col-1"></div>
		</div>
		<div class="row">
			<p></p>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "FaqDetailLanguageSet",
	data() {
		return {
			urlBackendLanguage:
				global.config.backendUrl +
				global.config.backendPort +
				global.config.backendApiPath +
				global.config.getLanguageEndpoint,
			urlBackendExample:
				global.config.backendUrl +
				global.config.backendPort +
				global.config.backendApiPath +
				global.config.getFaqsEndpoint +
				global.config.getExampleEndpoint,
			displayLang: "",
			hideButtonClass: {
				true: "far fa-eye",
				false: "far fa-eye-slash"
			},
			show: true,
			add: false,
			addNewExample: true,
			newExample: ""
		};
	},
	props: {
		id: {
			type: String,
			required: true
		},
		lang: {
			type: String,
			required: true
		},
		examples: {
			type: Array,
			required: true
		}
	},
	created() {
		this.getLanguage();
	},
	update() {
		this.addNewExample = this.add * this.save;
	},
	methods: {
		async getLanguage() {
			let parameters = {
				params: {
					lang: this.lang
				}
			};
			let that = this;
			axios.get(this.urlBackendLanguage, parameters).then(res => {
				that.displayLang = res.data.displayLang;
			});
		},
		hide() {
			this.show = !this.show;
			this.addNewExample = !this.addNewExample;
		},
		async deleteExample(sentence) {
			let that = this;
			let parameters = {
				params: {
					id: that.id,
					lang: that.lang,
					example: sentence
				}
			};
			await axios
				.delete(that.urlBackendExample, parameters)
				.then(res => {
					var index = that.examples.indexOf(sentence);
					if (index !== -1) that.examples.splice(index, 1);
				})
				.catch(err => {
					console.log(err);
				});
		},
		addExample() {
			this.add = !this.add;
		},
		async saveNewExample() {
			let that = this;
			let parameters = {
				params: {
					id: that.id,
					lang: that.lang,
					example: that.newExample
				}
			};
			console.log(that.urlBackendExample);
			await axios
				.put(that.urlBackendExample, null, parameters)
				.then(res => {
					that.add = false;
					that.addNewExample = true;
					that.examples.push(that.newExample);
					that.newExample = "";
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>