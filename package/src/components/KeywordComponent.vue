<template>
	<div v-if="id">
		<div class="card faq-card">
			<div class="container-fluid">
				<div class="row">
					<div v-if="!edit" class="col-7 card-body">
						<span>{{ keyword }}</span>
					</div>
					<div v-else class="col-7 card-body">
						<input
							type="text"
							class="form-control"
							aria-label="Default"
							aria-describedby="inputGroup-sizing-default"
							v-model="propValue"
						/>
					</div>
					<div class="col-5">
						<div class="main-question-edit-container">
							<button :class="btn_classes[edit]" v-on:click="modifySave()">
								<i :class="font_awesome_classes[edit]"></i>
							</button>
							<button
								class="btn btn-outline-danger"
								v-on:click="deleteKeyword()"
							>
								<i class="fas fa-trash"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "KeywordComponent",
	components: {},
	data() {
		return {
			edit: false,
			font_awesome_classes: {
				true: "fas fa-check",
				false: "fas fa-edit",
			},
			btn_classes: {
				true: "btn btn-outline-success",
				false: "btn btn-outline-warning",
			},
			propValue: ""
		};
	},
	props: {
		id: {
			type: String,
			required: false,
		},
		keyword: {
			type: String,
			required: false,
		},
	},
	created() {
		this.propValue = keyword;
	},
	methods: {
		deleteKeyword() {
			var data = {
				id: this.id,
			};
			this.$eventHub.$emit("deleteKeyword", data);
		},
		modifySave() {
			var data = {
				id: this.id,
				keyword: this.propValue,
			};
			this.$eventHub.$emit("editKeyword", data);
			this.edit = !this.edit;
		},
	},
};
</script>
