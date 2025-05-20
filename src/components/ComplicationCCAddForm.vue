<template>
  <div class="add-item-form" v-if="showForm">
    <div class="modal-overlay">
      <div class="modal">
        <h2>Создать новый элемент</h2>
        <form @submit.prevent="onAdd">

          <input type="text" v-model="searchQuery" placeholder="Поиск осложнения..." class="search-input" />
          <select class="styled-select" v-model="selected_complication">
            <option v-for="complication in filteredСomplications" :key="complication.id" :value="complication.id">
              {{ complication.name }}
            </option>
          </select>

          <div class="button-group">
            <button type="submit" title="Добавить" class="btn add-btn">
              Добавить
            </button>
            <button type="button" title="Отменить" class="btn cancel-btn" @click="onCancel">
              Отменить
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    showForm: {
      type: Boolean,
      default: true
    },


    // clinical_cases: {
    //     type: Array,

    // },
    clinical_case_id: {
      type: Number,
      required: true
    },
    complications: {
      type: Array,

    }
  },
  data() {
    return {
      searchQuery: '',
      selected_complication: null,

    };
  },
  computed: {
    filteredСomplications() {
      if (!this.searchQuery) return this.complications;
      const q = this.searchQuery.toLowerCase();
      return this.complications.filter(complication => complication.name.toLowerCase().includes(q));
    },
  },
  methods: {
    onAdd() {

      this.$emit('add_item', {
        clinical_case_id: this.clinical_case_id,
        // name_clinical_case: this.selected_clinical_case,
        name_complication: this.selected_complication,

      });
      this.resetForm();

    },
    onCancel() {
      this.resetForm();
      this.$emit('cancel_add');
    },
    resetForm() {


      // this.selected_clinical_case= null;
      this.selected_complication = null;

    }
  }
};
</script>

<style scoped>
.search-input {
  width: 100%;
  padding: 5px 8px;
  margin-bottom: 8px;
  box-sizing: border-box;
}
</style>
