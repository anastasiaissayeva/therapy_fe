<template>
<div>

    <div class="modal-overlay">
      <div class="modal">
        <h2>Редактировать элемент</h2>
        <form id="EditForm">
          <select class="styled-select" v-model="selected_result" required>
              <option v-for="result in results" :key="result.id" :value="result.id">
                  {{ result.name_model_structure }}{{ result.name_parameter }}={{ result.value }}({{ result.lower_value }}-{{ result.upper_value }}){{ result.name_unit }}
              </option>
          </select>
          <select class="styled-select" v-model="selected_сlinical_сase" >
              <option v-for="сlinical_сase in сlinical_сases" :key="сlinical_сase.id" :value="сlinical_сase.id">
                  {{ сlinical_сase.сlinical_сase_text }}
              </option>
          </select>
          <select class="styled-select" v-model="selected_source" >
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

          <button type="button" form="EditForm" title="Отменить" class="btn cancel-btn"  @click="onCancel">
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
    name_сlinical_сase: {
      type: String,
    },
    name_source: {
      type: String,
    },
    note: {
      type: String,
    },
    results: {type: Array,},
    сlinical_сases: {type: Array,},
    sources: {type: Array,}
  },
  data() {
    return {

      new_note: this.note,
      selected_result: null,
      selected_сlinical_сase: null,
      selected_source: null,


    };
  },
  emits: ['edit_item', 'cancel_edit', 'delete_item'],
  methods: {

    onSave() {
      this.$emit('edit_item', this.id, this.selected_result,this.selected_сlinical_сase, this.selected_source, this.new_note);

    },
    onCancel() {
      this.$emit('cancel_edit');

    },
  },

  mounted() {



    // const found_result = this.results.find(result => result.name === this.name_result);
    // this.selected_result = found_result ? found_result.id : null;

    // const found_сlinical_сase = this.сlinical_сases.find(сlinical_сase => сlinical_сase.name === this.name_сlinical_сase);
    // this.selected_сlinical_сase = found_сlinical_сase ? found_сlinical_сase.id : null;

    // const found_source = this.sources.find(source => source === this.name_source);
    // this.selected_source = found_source ? found_source.id : null;
  }
};
</script>

<style scoped>


</style>
