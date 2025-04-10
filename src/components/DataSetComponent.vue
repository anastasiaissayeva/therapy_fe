<template>

    <!--<RouterLink :to="'/petsbreedslist/' + id" class="p-name">{{ name }}</RouterLink> -->
    <tr v-if='!edit_mode'>

      <td>{{ name_result }}</td>
      <td>{{ name_сlinical_сase }}</td>
      <td>{{ name_source }}</td>
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

  <data-set-edit-form v-else
  :id='this.id'
  :name_result="this.name_result"
  :name_сlinical_сase="this.name_сlinical_сase"
  :name_source="this.name_source"
  :note="this.note"
  @edit_item="edit_item"
  @cancel_edit="cancel_edit" />
</template>


<script>
import DataSetEditForm from './DataSetEditForm.vue';
export default {
  components: {
    DataSetEditForm
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name_result: {
      type: String,
      required: true,
    },
    name_сlinical_сase: {
      type: String,

    },
    name_source: {
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
    edit_item(id, name_result,name_сlinical_сase,name_source,note) {
      this.$emit("edit_item", id,name_result,name_сlinical_сase,name_source,note);
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
