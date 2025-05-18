<template>
  <div class="add-item-form" v-if="showForm">
    <div class="modal-overlay">
      <div class="modal">
        <h2>Создать новый элемент</h2>
    <form @submit.prevent="onAdd">
          <textarea
              v-model.lazy.trim="new_name"
              placeholder="Введите название"
              required
          ></textarea>
          <textarea
              v-model.lazy.trim="new_full_name"
              placeholder="Введите полное название"

          ></textarea>

          <select class="styled-select" id="unitSelect" v-model="selectedUnit">
            <option v-for="unit in units" :key="unit.id" :value="unit.id">
              {{ unit.name }}
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
        units: {
            type: Array,

        }
    },
    data() {
        return {
            new_name: '',
            new_full_name: '',
            selectedUnit: null,
            new_note: ''
        };
    },
    methods: {
        onAdd() {
            if (this.new_name) {
                this.$emit('add_item', {
                    name: this.new_name,
                    full_name: this.new_full_name,
                    name_unit: this.selectedUnit|| null,
                    note: this.new_note
                });
                this.resetForm();
            } else {
                alert('Пожалуйста, введите название нового параметра');
            }
        },
        onCancel() {
            this.resetForm();
            this.$emit('cancel_add');
        },
        resetForm() {
            this.new_name = '';
            this.new_full_name = '';
            this.selectedUnit = null;
            this.new_note = '';
        }
    }
};
</script>

<style scoped>

</style>
