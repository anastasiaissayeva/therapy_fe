<template>
  <div>
  
  <div class="modal-overlay">
    <div class="modal">
      <h2>Редактировать элемент</h2>
      <form id="EditForm">
        <textarea form="EditForm" v-model.lazy.trim="new_name" placeholder="Название" rows="2" required />
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
 export default{
      props:{
          id:{
              type: Number,
              required: true,
          },
          name:{
              type: String,
              required: true,
          },
          note:{
              type: String,

          },
      },
      data() {
          return {new_name: this.name, new_note: this.note}
      },
      methods: {
          onSave(){
              this.$emit('edit_item',this.id, this.new_name,this.new_note);
          },
          onCancel()
          {
              this.$emit('cancel_edit');
          },
      },
  };
</script>

<style scoped>

</style>
