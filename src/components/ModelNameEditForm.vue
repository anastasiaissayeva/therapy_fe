<template>
<div>
    <!-- Модальное окно -->
    <div class="modal-overlay">
      <div class="modal">
        <h2>Редактировать элемент</h2>
        <form id="EditForm">
          <textarea form="EditForm" v-model.lazy.trim="new_name" placeholder="Краткое название" rows="2" />
          <textarea form="EditForm" v-model.lazy.trim="new_full_name" placeholder="Полное название" rows="2" />

          <select class="styled-select" id="modelTypeSelect" v-model="selectedModel">
            <option v-for="type in modelTypes" :key="type.id" :value="type.id">
              {{ type.name }}
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
    model_type: {
      type: Number,
    },
    note: {
      type: String,
    },

  },
  data() {
    return {
      new_name: this.name,
      new_full_name: this.full_name,
      new_note: this.note,
      selectedModel: this.model_type,
      modelTypes: [
        { id: 1, name: "Tumor Control Probability (TCP)" },
        { id: 2, name: "Normal Tissue Complication Probability (NTCP)" },
        { id: 3, name: "Другой" },
        { id: 0, name: "Неизвестно" },
      ],
    };
  },
  emits: ['edit_item', 'cancel_edit', 'delete_item'],
  methods: {

    onSave() {
      this.$emit('edit_item', this.id, this.new_name, this.new_full_name,this.selectedModel, this.new_note);

    },
    onCancel() {
      this.$emit('cancel_edit');

    },
  },


};
</script>

<style scoped>


</style>
