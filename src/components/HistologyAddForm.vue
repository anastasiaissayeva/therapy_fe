<template>
  <div class="add-item-form" v-if="showForm">
    <div class="modal-overlay">
      <div class="modal">
        <h2>Создать новый элемент</h2>
    <form @submit.prevent="onAdd">
          <textarea
              v-model.lazy.trim="new_name"
              placeholder="Введите гистологическую классификаццию"
              required
          ></textarea>

          <textarea
              v-model.lazy.trim="new_note"
              placeholder="Введите описание"
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
            new_name: '',

            new_note: ''
        };
    },
    methods: {
        onAdd() {
            if (this.new_name ) {
                this.$emit('add_item', {
                    name: this.new_name,
                    note: this.new_note
                });
                this.resetForm();
            } else {
                alert('Пожалуйста, введите название гистолгии.');
            }
        },
        onCancel() {
            this.resetForm();
            this.$emit('cancel_add');
        },
        resetForm() {
            this.new_name = '';
            this.new_note = '';
        }
    }
};
</script>

<style scoped>

</style>
