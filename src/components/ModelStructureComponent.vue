<template>

    <!--<RouterLink :to="'/petsbreedslist/' + id" class="p-name">{{ name }}</RouterLink> -->
    <tr v-if='!edit_mode'>

      <td>{{ name_model_name }}</td>
      <td>{{ name_parameter }}</td>
      <td>{{ note }}</td>
      <td>
      <div class="button-group">

        <button type="but" title="Редактировать" @click="onEdit" class="edit-button">
          <img alt="Редактировать" class="logo" src="@/assets/free-icon-pencil-650143.png" width="20" height="20" />
        </button>

        <button type="but" title="Удалить" @click="onDelete" class="delete-button">
          <img alt="Удалить" class="logo" src="@/assets/free-icon-delete-1214428.png" width="20" height="20" />
        </button>

      </div>
    </td>
    </tr>

  <model-structure-edit-form v-else
  :id='this.id'
  :name_model_name="this.name_model_name"
  :name_parameter="this.name_parameter"
  :note="this.note"
  @edit_item="edit_item"
  @cancel_edit="cancel_edit" />
</template>


<script>
import ModelStructureEditForm from './ModelStructureEditForm.vue';
export default {
  components: {
    ModelStructureEditForm
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name_model_name: {
      type: String,
      
    },
    name_parameter: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
  },
  data() {
    return {
      edit_mode: false
    }
  },
  methods: {
    onEdit() {
      this.edit_mode = true;
    },
    edit_item(id, name_model_name,name_parameter,note) {
      this.$emit("edit_item", id,  name_model_name,name_parameter,note);
      this.edit_mode = false;
    },
    cancel_edit() {
      this.edit_mode = false;
    },
    onDelete() {
      this.$emit('delete_item', this.id);
    }
  }
};
</script>

<style>

</style>
