<template>
<div>

    <div class="modal-overlay">
      <div class="modal">
        <h2>Редактировать элемент</h2>
        <form id="EditForm">
          <select class="styled-select" v-model="selected_model_name" required>
              <option v-for="model_name in model_names" :key="model_name.id" :value="model_name.id">
                  {{ model_name.name }}
              </option>
          </select>
          <select class="styled-select" v-model="selected_parameter" required>
              <option v-for="parameter in parameters" :key="parameter.id" :value="parameter.id">
                  {{ parameter.name }}
              </option>
          </select>

          <textarea form="EditForm" v-model.lazy.trim="new_note" placeholder="Заметка" rows="4" />
        </form>

        <div class="button-group">
          <button type="submit" form="EditForm" title="Сохранить" class="btn add-btn" @click="onSave">
            Сохранить
          </button>

          <button type="button" form="EditForm" title="Отменить" class="btn cancel-btn"  @click="onCancel">
            Отменить
          </button>
        </div>



      </div>
    </div>
  </div>
</template>



<script>
export default {
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
    },
    note: {
      type: String,
    },
    model_names: {
      type: Array,
      required: true
    },
    parameters: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

      new_note: this.note,
      selected_model_name: null,
      selected_parameter: null,

    };
  },
  emits: ['edit_item', 'cancel_edit', 'delete_item'],
  methods: {

    onSave() {
      this.$emit('edit_item', this.id, this.selected_model_name, this.selected_parameter, this.new_note);

    },
    onCancel() {
      this.$emit('cancel_edit');

    },
  },

  mounted() {
    const found_model_name = this.model_names.find(model_name => model_name.name === this.name_model_name);
    this.selected_model_name = found_model_name ? found_model_name.id : null;

    const found_parameter = this.parameters.find(parameter => parameter.name === this.name_parameter);
    this.selected_parameter = found_parameter ? found_parameter.id : null;
  }
};
</script>

<style scoped>


</style>
