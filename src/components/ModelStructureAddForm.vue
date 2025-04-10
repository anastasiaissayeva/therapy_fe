<template>
  <div class="add-item-form" v-if="showForm">
    <div class="modal-overlay">
      <div class="modal">
        <h2>Создать новый элемент</h2>
    <form @submit.prevent="onAdd">


          <select class="styled-select" v-model="selected_model_name" required>
              <option v-for="model_name in model_names" :key="model_name.id" :value="model_name.id">
                  {{ model_name.name }}
              </option>
          </select>
          <select class="styled-select" v-model="selected_parameter" required>
              <option v-for="parameter in parameters" :key="parameter.id" :value="parameter.id">
                  {{ parameter.name }}
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
        model_names: {
            type: Array,
            required: true
        },
        parameters: {
            type: Array,
            required: true
        }
    },
    data() {
        return {

          selected_model_name: null,
          selected_parameter: null,
          new_note: ''
        };
    },
    methods: {
        onAdd() {
            if (this.selected_parameter && this.selected_model_name) {
                this.$emit('add_item', {
                    name_model_name: this.selected_model_name,
                    name_parameter: this.selected_parameter,
                    note: this.new_note
                });
                this.resetForm();
            } else {
                alert('Пожалуйста, введите данные.');
            }
        },
        onCancel() {
            this.resetForm();
            this.$emit('cancel_add');
        },
        resetForm() {

            this.selected_model_name= null;
            this.selected_parameter= null;
            this.new_note = '';
        }
    }
};
</script>

<style scoped>

</style>
