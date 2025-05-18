<template>
    <tr v-if='!edit_mode'>
      <td>{{ name }}</td>
      <td>{{ full_name }}</td>
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

  <unit-edit-form v-else
  :id='this.id'
  :name="this.name"
  :full_name="this.full_name"
  :note="this.note"
  @edit_item="edit_item"
  @cancel_edit="cancel_edit" />
</template>


<script>
import UnitEditForm from './UnitEditForm.vue';
export default {
  components: {
    UnitEditForm
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      
    },
    full_name: {
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
    edit_item(id,name, full_name) {
      this.$emit("edit_item", id, name,full_name);
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
