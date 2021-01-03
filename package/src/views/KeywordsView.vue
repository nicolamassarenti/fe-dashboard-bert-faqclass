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
					<div class="col-12 title-view">Keywords</div>
				</div>
				<div class="row">
				<p></p>
				</div>
				<CreateKeywordComponent></CreateKeywordComponent>
				<div class="row">
				<p></p>
				</div>
				<div v-for="(item, index) in keywords" :key="index">
					<div class="row">
						<div class="col-3">
							<KeywordComponent
								:id="item[0].id"
								:keyword="item[0].keyword"
							></KeywordComponent>
						</div>
						<div class="col-3">
							<KeywordComponent
								:id="item[1].id"
								:keyword="item[1].keyword"
							></KeywordComponent>
						</div>
						<div class="col-3">
							<KeywordComponent
								:id="item[2].id"
								:keyword="item[2].keyword"
							></KeywordComponent>
						</div>
						<div class="col-3">
							<KeywordComponent
								:id="item[3].id"
								:keyword="item[3].keyword"
							></KeywordComponent>
						</div>
					</div>
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
import KeywordComponent from "../components/KeywordComponent.vue";
import CreateKeywordComponent from "../components/CreateKeywordComponent.vue";

export default {
	name: "KeywordsView",
	components: {
		KeywordComponent,
		CreateKeywordComponent
	},
	data() {
		return {
		urlKeywords: global.config.server + global.config.endpoints["keyword"],
		keywords: [
			[
				{
					id: "123",
					keyword: "Pippo"
				},
				{
					id: "456",
					keyword: "Pluto"
				},
				{
					id: "22",
					keyword: "Alan"
				},
				{
					
				}
			],
			[
				{
					id: "123",
					keyword: "Pippo"
				},
				{
					id: "456",
					keyword: "Pluto"
				},
				{
					id: "22",
					keyword: "Alan"
				},
				{
					id: "22",
					keyword: "Asd"
				}
			],
		]
		};
	},
	mounted() {
		this.$eventHub.$on("createKeyword", this.createKeyword);
		this.$eventHub.$on("deleteKeyword", this.deleteKeyword);
		this.$eventHub.$on("keywordDetails", this.keywordDetails);
	},
	created() {
		//this.keywords = this.getKeywords()
	},
	beforeDestroy() {
		this.$eventHub.$off("createKeyword", this.createKeyword);
		this.$eventHub.$off("deleteKeyword", this.deleteKeyword);
		this.$eventHub.$off("keywordDetails", this.keywordDetails);
	},
	methods: {
		getKeywords(){},
		createKeyword(data){},
		deleteKeyword(data){},
		keywordDetails(data){}
	}
};
</script>
