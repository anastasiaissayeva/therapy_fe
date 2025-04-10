<template>
<div>
    <!-- Модальное окно -->
    <div class="modal-overlay">
      <div class="modal">
        <h2>Редактировать элемент</h2>
        <form id="EditForm">
          <textarea form="EditForm" v-model.lazy.trim="new_name" placeholder="Полное название" rows="2" required />

          <select class="styled-select" id="locationSelect" v-model="selectedLocation" required>
            <option v-for="location in locations" :key="location.id" :value="location.id">
              {{ location.name }}
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
    name_location: {
      type: String,
    },
    note: {
      type: String,
    },
    locations: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      new_name: this.name,
      new_note: this.note,
      selectedLocation: null,

    };
  },
  emits: ['edit_item', 'cancel_edit', 'delete_item'],
  methods: {

    onSave() {
      this.$emit('edit_item', this.id, this.new_name, this.selectedLocation, this.new_note);

    },
    onCancel() {
      this.$emit('cancel_edit');

    },
  },

  mounted() {
    const foundLocation = this.locations.find(location => location.name === this.name_location);
    this.selectedLocation = foundLocation ? foundLocation.id : null;
  }
};
</script>

<style scoped>


</style>
