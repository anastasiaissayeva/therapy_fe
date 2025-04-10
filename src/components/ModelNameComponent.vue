<template>

    <!--<RouterLink :to="'/petsbreedslist/' + id" class="p-name">{{ name }}</RouterLink> -->
    <tr v-if='!edit_mode'>
      <td>{{ name }}</td>
      <td>{{ full_name }}</td>
      <td>{{ getModelTypeText(model_type) }}</td>
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

  <model-name-edit-form v-else
  :id='this.id'
  :name="this.name"
  :full_name="this.full_name"
  :model_type="this.model_type"
  :note="this.note"
  @edit_item="edit_item"
  @cancel_edit="cancel_edit" />
</template>


<script>
import ModelNameEditForm from './ModelNameEditForm.vue';
export default {
  components: {
    ModelNameEditForm
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
    model_type: {
      type: Number,

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
    edit_item(id, name,full_name, model_type,note) {
      this.$emit("edit_item", id, name, full_name,model_type,note);
      this.edit_mode = false;
    },
    cancel_edit() {
      this.edit_mode = false;
    },
    onDelete() {
      this.$emit('delete_item', this.id);
    },
    getModelTypeText(type) {
      switch (type) {
        case 1:
          return 'Tumor Control Probability (TCP)';
        case 2:
          return 'Normal Tissue Complication Probability (NTCP)';
        case 3:
          return 'Другой';
        default:
          return 'Неизвестно';
      }
    }

  }

};
</script>

<style>

</style>
