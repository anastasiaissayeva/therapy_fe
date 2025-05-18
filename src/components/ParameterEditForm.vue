<template>
<div>
    <!-- Модальное окно -->
    <div class="modal-overlay">
      <div class="modal">
        <h2>Редактировать элемент</h2>
        <form id="EditForm">
          <textarea form="EditForm" v-model.lazy.trim="new_name" placeholder="Краткое название" rows="2" />
          <textarea form="EditForm" v-model.lazy.trim="new_full_name" placeholder="Полное название" rows="2" />

          <select class="styled-select" id="unitSelect" v-model="selectedUnit">
            <option v-for="unit in units" :key="unit.id" :value="unit.id">
              {{ unit.name }}
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
    name: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,

    },
    name_unit: {
      type: String,
    },
    note: {
      type: String,
    },
    units: {
      type: Array,
      
    },
  },
  data() {
    return {
      new_name: this.name,
      new_full_name: this.full_name,
      new_note: this.note,
      selectedUnit: null,

    };
  },
  emits: ['edit_item', 'cancel_edit', 'delete_item'],
  methods: {

    onSave() {
      this.$emit('edit_item', this.id, this.new_name, this.new_full_name,this.selectedUnit, this.new_note);

    },
    onCancel() {
      this.$emit('cancel_edit');

    },
  },

  mounted() {
    const foundUnit = this.units.find(unit => unit.name === this.name_unit);
    this.selectedUnit = foundUnit ? foundUnit.id : null;
  }
};
</script>

<style scoped>


</style>
