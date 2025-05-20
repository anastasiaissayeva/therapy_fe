<template>
  <div>

    <div class="modal-overlay">
      <div class="modal">
        <h2>Редактировать элемент</h2>
        <form id="EditForm">
          <select class="styled-select" v-model="selected_result" required>
            <option v-for="result in results" :key="result.id" :value="result.id">
              {{ result.name_model_structure }}{{ result.name_parameter }}={{ result.value }}({{ result.lower_value
              }}-{{ result.upper_value }}){{ result.name_unit }}
            </option>
          </select>
          <select class="styled-select" v-model="selected_clinical_case">
            <option v-for="clinical_case in clinical_cases" :key="clinical_case.id" :value="clinical_case.id">
              {{ clinical_case.clinical_case_text }}
            </option>
          </select>
          <select class="styled-select" v-model="selected_source">
            <option v-for="source in sources" :key="source.id" :value="source.id">
              {{ source }}
            </option>
          </select>

          <textarea form="EditForm" v-model.lazy.trim="new_note" placeholder="Заметка" rows="4" />
        </form>

        <div class="button-group">
          <button type="submit" form="EditForm" title="Сохранить" class="btn add-btn" @click="onSave">
            Сохранить
          </button>

          <button type="button" form="EditForm" title="Отменить" class="btn cancel-btn" @click="onCancel">
            Отменить
          </button>
        </div>



      </div>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    name_result: {
      type: String,
    },
    name_clinical_case: {
      type: String,
    },
    name_source: {
      type: String,
    },
    note: {
      type: String,
    },
    results: { type: Array, },
    clinical_cases: { type: Array, },
    sources: { type: Array, }
  },
  data() {
    return {

      new_note: this.note,
      selected_result: null,
      selected_clinical_case: null,
      selected_source: null,


    };
  },
  emits: ['edit_item', 'cancel_edit', 'delete_item'],
  methods: {

    onSave() {
      this.$emit('edit_item', this.id, this.selected_result, this.selected_clinical_case, this.selected_source, this.new_note);

    },
    onCancel() {
      this.$emit('cancel_edit');

    },
  },

  mounted() {



    // const found_result = this.results.find(result => result.name === this.name_result);
    // this.selected_result = found_result ? found_result.id : null;

    // const found_clinical_case = this.clinical_cases.find(clinical_case => clinical_case.name === this.name_clinical_case);
    // this.selected_clinical_case = found_clinical_case ? found_clinical_case.id : null;

    // const found_source = this.sources.find(source => source === this.name_source);
    // this.selected_source = found_source ? found_source.id : null;
  }
};
</script>

<style scoped></style>
