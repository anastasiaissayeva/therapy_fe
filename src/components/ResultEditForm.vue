<template>
  <div>
    <div class="modal-overlay">
      <div class="modal">
        <h2>Редактировать элемент</h2>

        <form id="EditForm" @submit.prevent="onSave">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Поиск источника..."
            class="search-input"
          />

          <label for="data_set">Выберите набор данных</label>
          <select class="styled-select" id="data_set" v-model="selected_data_set" required>
            <option v-for="dataSet in data_sets" :key="dataSet.id" :value="dataSet.id">
              {{ dataSet.name_source }}
            </option>
          </select>

          <label for="model_structure">Выберите структуру модели</label>
          <select class="styled-select" id="model_structure" v-model="selected_model_structure" required>
            <option v-for="modelStructure in model_structures" :key="modelStructure.id" :value="modelStructure.id">
              Модель: {{ modelStructure.name_model_name }}
              Параметр: {{ modelStructure.name_parameter }} ({{ modelStructure.name_unit }})
            </option>
          </select>

          <label for="value">Значение</label>
          <input
            type="number"
            id="value"
            v-model.number="new_value"
            placeholder="Значение"
            step="0.01"
            required
          />

          <label for="lower_value">Нижняя граница</label>
          <input
            type="number"
            id="lower_value"
            v-model.number="new_lower_value"
            placeholder="Нижняя граница"
            step="0.01"
          />

          <label for="upper_value">Верхняя граница</label>
          <input
            type="number"
            id="upper_value"
            v-model.number="new_upper_value"
            placeholder="Верхняя граница"
            step="0.01"
          />

          <textarea v-model.lazy.trim="new_note" placeholder="Введите заметку" rows="4"></textarea>
        </form>

        <div class="button-group">
          <button type="submit" form="EditForm" title="Сохранить" class="btn add-btn">
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
    id: { type: Number, required: true },
    value: { type: Number },
    upper_value: { type: Number },
    lower_value: { type: Number },
    name_model_structure: { type: [String, Number] },
    note: { type: String },
    data_sets: { type: Array, required: true },
    model_structures: { type: Array, required: true },
    data_set:{ type: Number },
    model_structure:{ type: Number },
  },
  data() {
    return {
      searchQuery: '',
      new_value: this.value,
      new_upper_value: this.upper_value,
      new_lower_value: this.lower_value,
      new_note: this.note,
      selected_model_structure: null,
      selected_data_set: null,
    };
  },
  emits: ['edit_item', 'cancel_edit'],
  mounted() {
    const realModelStructure = this.model_structures.find(ms => ms.id === this.model_structure);
    this.selected_model_structure = realModelStructure ? realModelStructure.id : (this.model_structures.length > 0 ? this.model_structures[0].id : null);

    const realDataSet = this.data_sets.find(ds => ds.id === this.data_set);

    this.selected_data_set = realDataSet ? realDataSet.id : (this.data_sets.length > 0 ? this.data_sets[0].id : null);
  },
  methods: {
    onSave() {
    if (!this.selected_model_structure || !this.selected_data_set) {
      alert('Пожалуйста, выберите модель и набор данных.');
      return;
    }

    this.$emit('edit_item', this.id, this.new_value, this.new_upper_value, this.new_lower_value, this.selected_model_structure, this.new_note, this.selected_data_set);
  },
    onCancel() {
      this.$emit('cancel_edit');
    },
  },
};
</script>
