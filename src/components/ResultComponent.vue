<template>
  <tr v-if="!edit_mode">
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

  <result-edit-form
    v-else
    :id="id"
    :value="value"
    :upper_value="upper_value"
    :lower_value="lower_value"
    :name_model_structure="name_model_structure"
    :name_parameter="name_parameter"
    :name_unit="name_unit"
    :data_set="data_set"
    :note="note"
    :model_structures="model_structures"
    :data_sets="data_sets"
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
    model_structures: {
      type: Array,
      required: true,
    },
    data_sets: {
      type: Array,
      required: true
    },
    data_set: {
      type: [Number],
      required: true
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
    edit_item(id,  value, upper_value, lower_value,model_structure, note, data_set) {
      console.log('Редактируемый элемент:', { id,  value, upper_value, lower_value, model_structure,note, data_set });
      this.$emit("edit_item", id,  value, upper_value, lower_value, model_structure, note, data_set);
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
