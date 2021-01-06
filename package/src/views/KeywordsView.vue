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
		<div v-if="creating">
			<div class="row">
					<div class="col-4">
					</div>
					<div class="col-3">
						<input
							type="text"
							class="form-control"
							aria-label="Default"
							aria-describedby="inputGroup-sizing-default"
							v-model="newKeyword"
						/>
					</div>
					<div class="col-1 main-question-edit-container">
						<button class="btn btn-outline-success" v-on:click="keywordCreated()">
							<i class="fas fa-check"></i>
						</button>
						<button class="btn btn-outline-danger" v-on:click="resetKeywordCreation()">
							<i class="fas fa-trash"></i>
						</button>
					</div>
					<div class="col-4">
					</div>
			</div>
			<div class="row">
				<p></p>
			</div>
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
	CreateKeywordComponent,
  },
  data() {
	return {
	  urlKeywords: global.config.server + global.config.endpoints["keyword"],
	  creating: false,
	  newKeyword: "New keyword",
	  keywords: [
		[
		  {
			id: "123",
			keyword: "Pippo",
		  },
		  {
			id: "456",
			keyword: "Pluto",
		  },
		  {
			id: "22",
			keyword: "Alan",
		  },
		  {},
		],
		[
		  {
			id: "123",
			keyword: "Pippo",
		  },
		  {
			id: "456",
			keyword: "Pluto",
		  },
		  {
			id: "22",
			keyword: "Alan",
		  },
		  {
			id: "22",
			keyword: "Asd",
		  },
		],
	  ],
	};
  },
  mounted() {
	this.$eventHub.$on("createKeyword", this.createKeyword);
	this.$eventHub.$on("deleteKeyword", this.deleteKeyword);
	this.$eventHub.$on("editKeyword", this.editKeyword);
  },
  created() {
	//this.keywords = this.getKeywords()
  },
  beforeDestroy() {
	this.$eventHub.$off("createKeyword", this.createKeyword);
	this.$eventHub.$off("deleteKeyword", this.deleteKeyword);
	this.$eventHub.$off("editKeyword", this.editKeyword);
  },
  methods: {
	async getKeywords() {
	  let that = this;
	  await axios
		.get(that.urlKeywords, {
		  headers: {
			"Content-Type": "application/json",
		  },
		})
		.then(function (response) {
		  that.keywords = response.data.keywords;
		})
		.catch(function (error) {
		  console.log(error);
		});
	},
	createKeyword() {
		this.creating = true;
	},
	resetKeywordCreation(){
		this.creating = false;
		this.newKeyword = "New keyword"
	},
	async keywordCreated(){
		let that = this;
        let body = {
          keyword: this.newKeyword
        };
		await axios
          .post(this.urlKeywords, body)
          .then(function() {
			that.resetKeywordCreation();
            that.getKeywords();
          })
          .catch(function(error) {
            console.log(error);
		  });
	},
	async deleteKeyword(data) {
	  var parameters = {
		params: data,
	  };
	  let that = this;
	  await axios
		.delete(that.urlKeywords, parameters)
		.then(function () {
		  conosle.log("A");
		  //that.keywords = that.getKeywords();
		})
		.catch((err) => {
		  console.log(err);
		});
	},
	async editKeyword(data) {
	  var parameters = {
		params: data,
	  };
	  let that = this;
	  await axios
		.put(that.urlKeywords, null, parameters)
		.catch((err) => {
		  console.log(err);
		});
	},
  },
};
</script>
