<template>
  <li v-if='!edit_mode' class="p-item">
       <!--<RouterLink :to="'/petsbreedslist/' + id" class="p-name">{{ name }}</RouterLink> -->
      <span class="p-name">{{ name }}</span>
      <span class="p-note">{{ short_name }}</span>
      <span class="p-note">{{ note }}</span>

      <div class="button-group">
          <button
              type="but"
              title="Редактировать"
              @click="onEdit"
              class="edit-button"
          >
              <img alt="Редактировать" class="logo" src="@/assets/free-icon-pencil-650143.png" width="20" height="20" />
          </button>
          <button
              type="but"
              title="Удалить"
              @click="onDelete"
              class="delete-button"
          >
              <img alt="Удалить" class="logo" src="@/assets/free-icon-delete-1214428.png" width="20" height="20" />
          </button>
      </div>
  </li>
  <location-edit-form v-else
      :id='this.id'
      :name="this.name"
      :short_name="this.short_name"
      :note="this.note"
      @edit_item="edit_item"
      @cancel_edit="cancel_edit"
  />
</template>


<script>
  import LocationEditForm from './LocationEditForm.vue';
  export default{
      components:{
        LocationEditForm
      },
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
      data(){
          return {
              edit_mode:false
          }
      },
      methods:{
          onEdit(){
              this.edit_mode = true;
          },
          edit_item(id,name,short_name){
              this.$emit("edit_item",id,name,short_name );
              this.edit_mode=false;
          },
          cancel_edit(){
              this.edit_mode=false;
          },
          onDelete() {
          this.$emit('delete_item', this.id);
      }
      }
  };
</script>

<style>


</style>
