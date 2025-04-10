<template>
<div>
    <!-- Модальное окно -->
    <div class="modal-overlay">
      <div class="modal">
        <h2>Редактировать элемент</h2>
        <form id="EditForm">
          <textarea
              v-model.lazy.trim="new_name"
              placeholder="Введите название источника"
              required
          ></textarea>
          <textarea
              v-model.lazy.trim="new_full_name"
              placeholder="Введите полное название"

          ></textarea>
          <input
              type="url"
              v-model.lazy.trim="new_url"
              placeholder="Введите ссылку на источник"
              @input="validateUrl"
          />

          <textarea
              v-model.lazy.trim="new_note"
              placeholder="Введите заметку"
          ></textarea>
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
    url: {
      type: String,
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
      new_url: this.url,

    };
  },
  emits: ['edit_item', 'cancel_edit', 'delete_item'],
  methods: {

    onSave() {
      this.$emit('edit_item', this.id, this.new_name, this.new_full_name,this.new_url, this.new_note);

    },
    onCancel() {
      this.$emit('cancel_edit');

    },
  },


};
</script>

<style scoped>


</style>
