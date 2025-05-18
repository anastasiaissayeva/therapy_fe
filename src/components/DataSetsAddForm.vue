<template>
  <div class="add-item-form" v-if="showForm">
    <div class="modal-overlay">
      <div class="modal">
        <h2>Создать новый элемент</h2>
    <form @submit.prevent="onAdd">


          <select class="styled-select" v-model="selected_result" required>
              <option v-for="result in results" :key="result.id" :value="result.id">
                  {{ result.name_model_structure }}{{ result.name_parameter }}={{ result.value }}({{ result.lower_value }}-{{ result.upper_value }}){{ result.name_unit }}
              </option>
          </select>
          <select class="styled-select" v-model="selected_сlinical_сase" >
              <option v-for="сlinical_сase in сlinical_сases" :key="сlinical_сase.id" :value="сlinical_сase.id">
                  {{ сlinical_сase.сlinical_сase_text }}
              </option>
          </select>
          <select class="styled-select" v-model="selected_source" >
              <option v-for="source in sources" :key="source.id" :value="source.id">
                  {{ source }}
              </option>
          </select>
          <textarea
              v-model.lazy.trim="new_note"
              placeholder="Введите заметку"
          ></textarea>
          <div class="button-group">
              <button
                  type="submit"
                  title="Добавить"
                  class="btn add-btn"
              >
                  Добавить
              </button>
              <button
                  type="button"
                  title="Отменить"
                  class="btn cancel-btn"
                  @click="onCancel"
              >
                  Отменить
              </button>
          </div>
      </form>

    </div>
  </div>
  </div>
</template>

<script>
export default {
    props: {
        showForm: {
            type: Boolean,
            default: true
        },
        results: {
            type: Array,
            required: true
        },
        сlinical_сases: {
            type: Array,

        },
        sources: {
            type: Array,

        }
    },
    data() {
        return {

          selected_result: null,
          selected_сlinical_сase: null,
          selected_source: null,
          new_note: ''
        };
    },
    methods: {
        onAdd() {
            if (this.selected_result) {
                this.$emit('add_item', {
                    name_result: this.selected_result,
                    name_сlinical_сase: this.selected_сlinical_сase,
                    name_source: this.selected_source,
                    note: this.new_note
                });
                this.resetForm();
            } else {
                alert('Пожалуйста, введите данные.');
            }
        },
        onCancel() {
            this.resetForm();
            this.$emit('cancel_add');
        },
        resetForm() {

            this.selected_result= null;
            this.selected_сlinical_сase= null;
            this.selected_source= null;
            this.new_note = '';
        }
    }
};
</script>

<style scoped>

</style>
