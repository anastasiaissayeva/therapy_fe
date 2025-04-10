<template>
  <li>
      <form id="EditForm">
          <textarea
              form="EditForm"
              v-model.lazy.trim="new_name"
              placeholder="Полное название"
              rows="2" required/>
          <textarea
              form="EditForm"
              v-model.lazy.trim="new_short_name"
              placeholder="Сокращенное название"
              rows="2" />
          <textarea
              form="EditForm"
              v-model.lazy.trim="new_note"
              placeholder="Заметка"
              rows="4"
              />
      </form>
      <button
          type="button"
          form="EditForm"
          title="Сохранить"
          @click="onSave"
          ><img alt="logo" class="logo" src="@/assets/free-icon-save-2550221.png" width="20" height="20" />
      </button>


  <button
          type="button"
          form="EditForm"
          title="Отменить"
          @click="onCancel"
          ><img alt="logo" class="logo" src="@/assets/free-icon-undo-7764412.png" width="20" height="20" />
  </button>
  </li>

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
          short_name:{
              type: String,
          },
          note:{
              type: String,

          },
      },
      data() {
          return {new_name: this.name, new_short_name: this.short_name,new_note: this.note}
      },
      methods: {
          onSave(){
              this.$emit('edit_item',this.id, this.new_name,this.new_short_name,this.new_note);
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
