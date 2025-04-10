<template>
  <div class="add-item-form" v-if="showForm">
    <div class="modal-overlay">
      <div class="modal">
        <h2>Создать новый элемент</h2>
    <form @submit.prevent="onAdd">
          <textarea
              v-model.lazy.trim="new_code"
              placeholder="Введите код МКБ-10"
              required
          ></textarea>

          <textarea
              v-model.lazy.trim="new_description"
              placeholder="Введите описание"
              required
          ></textarea>

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

    },
    data() {
        return {
            new_code: '',
            new_description: '',
            new_note: ''
        };
    },
    methods: {
        onAdd() {
            if (this.new_code ) {
                this.$emit('add_item', {
                    code: this.new_code,
                    description: this.new_description,
                    note: this.new_note
                });
                this.resetForm();
            } else {
                alert('Пожалуйста, введите название новый код диагноза.');
            }
        },
        onCancel() {
            this.resetForm();
            this.$emit('cancel_add');
        },
        resetForm() {
            this.new_code = '';
            this.new_description = '';
            this.new_note = '';
        }
    }
};
</script>

<style scoped>

</style>
