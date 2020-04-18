<template>
	<div class="container-fluid kb-view">
		<div class="row">
			<p></p>
		</div>
		<div class="row">
			<div class="col-1"></div>
			<div class="col-10">
				<div class="row">
					<p></p>
				</div>
				<div class="row">
					<div class="col-12 title-view">Faq Detail</div>
				</div>
				<div class="row">
					<p></p>
				</div>
				<div class="row">
					<div class="col-7">
						<MainQuestionComponent :text="mainQuestion" :id="id"></MainQuestionComponent>
					</div>
					<div class="col-1"></div>
					<div class="col-4">
						<FaqDetailCommandsComponent :trained="trained" :id="id"></FaqDetailCommandsComponent>
					</div>
				</div>
				<div class="row">
					<p></p>
				</div>
				<div v-for="(example, lang) in examples" :key="lang">
					<FaqDetailLanguageSet :id="id" :lang="lang" :examples="example"></FaqDetailLanguageSet>
					<div class="row"><p></p></div>
				</div>
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
import MainQuestionComponent from "./../components/MainQuestionComponent.vue";
import FaqDetailCommandsComponent from "./../components/FaqDetailCommandsComponent.vue";
import FaqDetailLanguageSet from "./../components/FaqDetailLanguageSet.vue";

export default {
	name: "FaqDetailView",
	components: {
		MainQuestionComponent,
		FaqDetailCommandsComponent,
		FaqDetailLanguageSet
	},
	data() {
		return {
			id: "",
			urlBackend: "",
			mainQuestion: "",
			examples: [],
			trained: false
		};
	},
	mounted() {
		this.id = this.$route.params.id;
		this.urlBackend =
			global.config.backendUrl +
			global.config.backendPort +
			global.config.backendApiPath +
			global.config.getFaqsEndpoint;
		this.getFaqDetails();
	},
	methods: {
		async getFaqDetails() {
			let that = this;
			let parameters = {};
			await axios
				.get(this.urlBackend, {
					params: { id: that.id }
				})
				.then(function(response) {
					that.mainQuestion = response.data.mainQuestion;
					that.examples = response.data.examples;
					that.id = response.data.id;
					that.trained = response.data.trained;
				})
				.catch(function(error) {});
		}
	}
};
</script>