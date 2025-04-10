<template>

    <!--<RouterLink :to="'/petsbreedslist/' + id" class="p-name">{{ name }}</RouterLink> -->
    <tr v-if='!edit_mode'>


      
            <td>{{ name_model_structure }}</td>
            <td>{{ name_parameter }}</td>
            <td>{{ name_unit }}</td>



      <td>{{ value }} ({{ lower_value }} - {{ upper_value }})</td>
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

  <result-edit-form v-else
  :id='this.id'
  :value="this.value"
  :upper_value="this.upper_value"
  :lower_value="this.lower_value"
  :name_model_structure="this.name_model_structure"
  :name_parameter="this.name_parameter"
  :name_unit="this.name_unit"
  :note="this.note"
  @edit_item="edit_item"
  @cancel_edit="cancel_edit" />
</template>


<script>
import ResultEditForm from './ResultEditForm.vue';
export default {
  components: {
    ResultEditForm
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,

    },
    upper_value: {
      type: Number,

    },
    lower_value: {
      type: Number,

    },
    name_model_structure: {
      type: String,

    },
    name_parameter: {
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
    edit_item(id,name_model_structure, value, upper_value, lower_value, note) {
      this.$emit("edit_item", id, name_model_structure, value, upper_value, lower_value, note);
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
