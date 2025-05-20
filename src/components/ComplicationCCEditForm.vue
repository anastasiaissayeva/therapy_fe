<template>
  <div>

    <div class="modal-overlay">
      <div class="modal">
        <h2>Редактировать элемент</h2>
        <form id="EditForm">

          <input type="text" v-model="searchQuery" placeholder="Поиск осложнения..." class="search-input" />
          <select class="styled-select" v-model="selected_complication">
            <option v-for="Сomplication in filteredСomplications" :key="Сomplication.id" :value="Сomplication.id">
              {{ Сomplication.name }}
            </option>
          </select>


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

    name_clinical_case: {
      type: String,
    },
    name_complication: {
      type: String,
    },




    clinical_cases: { type: Array, },
    complications: { type: Array, },
    complication: { type: Number },
  },
  data() {
    return {
      searchQuery: '',


      selected_clinical_case: null,
      selected_complication: null,


    };
  },
  emits: ['edit_item', 'cancel_edit', 'delete_item'],
  computed: {
    filteredСomplications() {
      if (!this.searchQuery) return this.complications;
      const q = this.searchQuery.toLowerCase();
      return this.complications.filter(complication => complication.name.toLowerCase().includes(q));
    },
  },
  methods: {

    onSave() {
      this.$emit('edit_item', this.id, this.selected_clinical_case, this.selected_complication,);

    },
    onCancel() {
      this.$emit('cancel_edit');

    },
  },

  mounted() {

    const found_complication = this.complications.find(sr => sr.id === this.complication);
    this.selected_complication = found_complication ? found_complication.id : null;
  }
};
</script>

<style scoped></style>
