<template>
    <tr v-if='!edit_mode'>
      <td>{{ code }}</td>
      <td>{{ description }}</td>
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

  <diagnosis-edit-form v-else
  :id='this.id'
  :code="this.code"
  :description="this.description"
  :note="this.note"
  @edit_item="edit_item"
  @cancel_edit="cancel_edit" />
</template>


<script>
import DiagnosisEditForm from './DiagnosisEditForm.vue';
export default {
  components: {
    DiagnosisEditForm
  },
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
      edit_mode: false
    }
  },
  methods: {
    onEdit() {
      this.edit_mode = true;
    },
    edit_item(id, code, description) {
      this.$emit("edit_item", id, code, description);
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
