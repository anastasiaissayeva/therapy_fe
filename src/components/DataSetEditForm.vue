<template>
  <div>

    <div class="modal-overlay">
      <div class="modal">
        <h2>Редактировать элемент</h2>
        <form id="EditForm">

          <input type="text" v-model="searchQuery" placeholder="Поиск источника..." class="search-input" />
          <select class="styled-select" v-model="selected_source">
            <option v-for="Source in filteredSources" :key="Source.id" :value="Source.id">
              {{ Source.name }}
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

    name_clinical_case: {
      type: String,
    },
    name_source: {
      type: String,
    },
    note: {
      type: String,
    },
    model_structure: { type: Number },


    clinical_cases: { type: Array, },
    sources: { type: Array, },
    source: { type: Number },
  },
  data() {
    return {
      searchQuery: '',
      new_note: this.note,

      selected_clinical_case: null,
      selected_source: null,


    };
  },
  emits: ['edit_item', 'cancel_edit', 'delete_item'],
  computed: {
    filteredSources() {
      if (!this.searchQuery) return this.sources;
      const q = this.searchQuery.toLowerCase();
      return this.sources.filter(source => source.name.toLowerCase().includes(q));
    },
  },
  methods: {

    onSave() {
      this.$emit('edit_item', this.id, this.selected_clinical_case, this.selected_source, this.new_note);

    },
    onCancel() {
      this.$emit('cancel_edit');

    },
  },

  mounted() {

    const found_source = this.sources.find(sr => sr.id === this.source);
    this.selected_source = found_source ? found_source.id : null;
  }
};
</script>

<style scoped></style>
