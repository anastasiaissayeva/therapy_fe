<template>
<div>
    <div class="modal-overlay">
      <div class="modal">
        <h2>Редактировать элемент</h2>
        <form id="EditForm">
          <textarea form="EditForm" v-model.lazy.trim="new_code" placeholder="Код" rows="1" required/>

          <textarea form="EditForm" v-model.lazy.trim="new_description" placeholder="Описание" rows="2" />

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
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      
    },
    note: {
      type: String,
    },

  },
  data() {
    return {
      new_code: this.code,
      new_description: this.description,
      new_note: this.note,
    };
  },
  emits: ['edit_item', 'cancel_edit', 'delete_item'],
  methods: {

    onSave() {
      this.$emit('edit_item', this.id, this.new_code, this.new_description, this.new_note);

    },
    onCancel() {
      this.$emit('cancel_edit');

    },
  },


};
</script>

<style scoped>


</style>
