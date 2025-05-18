<template>

    <!--<RouterLink :to="'/petsbreedslist/' + id" class="p-name">{{ name }}</RouterLink> -->
    <tr v-if='!edit_mode'>
      <td>{{ name }}</td>
      <td>{{ full_name }}</td>
      <td>{{ name_unit }}</td>
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

  <parameter-edit-form v-else
  :id='this.id'
  :name="this.name"
  :full_name="this.full_name"
  :name_unit="this.name_unit"
  :note="this.note"
  @edit_item="edit_item"
  @cancel_edit="cancel_edit" />
</template>


<script>
import ParameterEditForm from './ParameterEditForm.vue';
export default {
  components: {
    ParameterEditForm
  },
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
    name_unit: {
      type: String,
      
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
    edit_item(id, name,full_name, name_unit) {
      this.$emit("edit_item", id, name, full_name,name_unit);
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
