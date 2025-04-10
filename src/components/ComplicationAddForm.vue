<template>
  <div class="add-item-form" v-if="showForm">
    <div class="modal-overlay">
      <div class="modal">
        <h2>Создать новый элемент</h2>
    <form @submit.prevent="onAdd">
          <textarea
              v-model.lazy.trim="new_name"
              placeholder="Введите полное название"
              required
          ></textarea>
          <textarea
              v-model.lazy.trim="new_alt_name"
              placeholder="Введите альтернативное название"

          ></textarea>
          <select class="styled-select" v-model="selectedLocation" required>
              <option v-for="location in locations" :key="location.id" :value="location.id">
                  {{ location.name }}
              </option>
          </select>

          <textarea
              v-model.lazy.trim="new_note"
              placeholder="Введите заметку"
          ></textarea>
          <div class="button-group">
              <button
                  type="submit"
                  title="Добавить"
                  class="btn add-btn"
              >
                  Добавить
              </button>
              <button
                  type="button"
                  title="Отменить"
                  class="btn cancel-btn"
                  @click="onCancel"
              >
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
        locations: {
            type: Array,

        }
    },
    data() {
        return {
            new_name: '',
            new_alt_name: '',
            selectedLocation: null,
            new_note: ''
        };
    },
    methods: {
        onAdd() {
            if (this.new_name && this.selectedLocation) {
                this.$emit('add_item', {
                    name: this.new_name,
                    alt_name: this.new_alt_name,
                    spec_location: this.selectedLocation,
                    note: this.new_note
                });
                this.resetForm();
            } else {
                alert('Пожалуйста, введите название нового вида осложнений.');
            }
        },
        onCancel() {
            this.resetForm();
            this.$emit('cancel_add');
        },
        resetForm() {
            this.new_name = '';
            this.new_alt_name = '';
            this.selectedLocation = null;
            this.new_note = '';
        }
    }
};
</script>

<style scoped>

</style>
