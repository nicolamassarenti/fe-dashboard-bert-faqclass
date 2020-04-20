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
					<div class="col-12 title-view">Knowledge base</div>
				</div>
				<div class="row">
					<p></p>
				</div>
				<CreateFaqComponent></CreateFaqComponent>
				<div class="row">
					<p></p>
				</div>
				<div v-for="(faq, index) in faqs" :key="index">
					<FaqPreviewComponent :id="faq.id" :mainQuestion="faq.mainQuestion" :toTrain="faq.trained"></FaqPreviewComponent>
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
import FaqPreviewComponent from "./../components/FaqPreviewComponent.vue";
import CreateFaqComponent from "./../components/CreateFaqComponent.vue"

export default {
	name: "KBView",
	components: {
		FaqPreviewComponent,
		CreateFaqComponent
	},
	data() {
		return {
			urlBackend: "",
			faqs: []
		};
	},
	created() {
		this.urlBackend =
			global.config.backendUrl +
			global.config.backendPort +
			global.config.backendApiPath +
			global.config.getFaqsEndpoint;

		this.faqs = this.getFaqs();

		this.$eventHub.$on("createNewFaq", this.createNewFaq);
	},
	methods: {
		createNewFaq(){
            this.$router.push({name: 'Faq details', params: {id: "newFaq"}});
		},
		async getFaqs() {
			let that = this;
			await axios
				.get(that.urlBackend, {
					headers: {
						"Content-Type": "application/json"
					}
				})
				.then(function(response) {
					that.faqs = response.data.kb;
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}
};
</script>