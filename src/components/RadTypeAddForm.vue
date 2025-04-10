<template>
  <div class="add-item-form" v-if="showForm" >
      <form @submit.prevent="onAdd">
          <textarea
              v-model.lazy.trim="new_name"
              placeholder="Введите название вида лучевой терапии"
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
</template>

<script>
 export default{
      props: {
          showForm: {
              type: Boolean,
              default: true
          }
      },
      data() {
          return {new_name: '',new_note: ''}
      },
      methods: {
          onAdd(){
              if (this.new_name) {
                  this.$emit('add_item', { name: this.new_name, note: this.new_note });
                  this.resetForm();
              } else {
                  alert('Пожалуйста, введите название нового вида терапии.');
              }
          },
          onCancel()
          {
              this.new_name = '';
              this.$emit('cancel_add')
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
