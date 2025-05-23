<template>
  <div class="sidebar">
    <h1 class="sidebar-title">
      Результаты измерений
    </h1>
    <input v-model="searchQuery" @input="onSearchChange" placeholder="Поиск..." />
    <table class="styled-table">
      <thead>
        <tr>
          <th @click="sort('model_structure')">Модель</th>
          <th>Параметр</th>
          <th>Ед. изм.</th>
          <th @click="sort('value')">Значение(Нижняя граница - Верхняя граница)</th>
          <th @click="sort('note')">Заметка</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <result-component v-for="item in items" :key="item.id" :id='item.id' :value="item.value"
          :upper_value="item.upper_value" :lower_value="item.lower_value"
          :name_model_structure="item.name_model_structure" :name_parameter="item.name_parameter"
          :name_unit="item.name_unit" :note="item.note" :model_structures="modelStructures" :data_set="item.data_set"
          :data_sets="dataSets" :model_structure="item.model_structure" @edit_item="edit_item"
          @delete_item="confirmDelete(item.id)" />
      </tbody>
    </table>

    <button @click="toggleAddForm" class="add-button">
      Добавить
    </button>

    <result-add-form v-if="showAddForm" :selected_clinical_case_id="selected_clinical_case_id"
      :data_set_id="currentDataSetId" @add_item="addItem" @cancel_add="cancelAdd" :model_structures="modelStructures"
      :data_sets="dataSets" />

    <div v-if="pendingDeleteId !== null" class="confirmation">
      <div class="confirmation-content">
        <p>Вы уверены, что хотите удалить этот элемент?</p>
        <div class="confirmation-buttons">
          <button @click="deleteConfirmed" class="confirm-button">Да, удалить</button>
          <button @click="cancelDelete" class="cancel-button">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import ResultAddForm from './ResultAddForm.vue';
import ResultComponent from './ResultComponent.vue';
export default {
  components: {
    ResultComponent,
    ResultAddForm,
  },
  props: {
    selected_clinical_case_id: {
      type: Number,
      required: false
    },


  },
  data() {
    return {
      items: [],
      pendingDeleteId: null,
      deletedItem: null,
      showAddForm: false,
      searchQuery: '', sortKey: '', sortOrder: 'asc',
      currentDataSetId: this.selectedDataSetId,
      dataSets: [],
    };
  },
  methods: {
    async getDataSets() {
      try {
        const response = await this.$http.get("dataset/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });

        // Сохраняем все наборы данных
        const allDataSets = response.data;

        // Фильтруем наборы данных по текущему клиническому случаю
        this.dataSets = allDataSets.filter(dataSet => dataSet.clinical_case === this.selected_clinical_case_id);
      } catch (error) {
        console.error("Ошибка при загрузке наборов данных:", error);
      }
    },
    async getModelStructures() {
      try {
        const response = await this.$http.get("model-structure/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.modelStructures = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getData() {
      await this.getDataSets();
      await this.getModelStructures();
      try {
        const params = new URLSearchParams();

        if (this.searchQuery) {
          params.append('search', this.searchQuery);
        }
        if (this.sortKey) {
          params.append('ordering', (this.sortOrder === 'desc' ? '-' : '') + this.sortKey);
        }
        if (this.selected_clinical_case_id) {
          params.append('clinical_case', this.selected_clinical_case_id);
        }

        const response = await this.$http.get(`result/?${params.toString()}`,
          { headers: { authorization: `Bearer ${localStorage.access_token}`, }, },
        );
        this.items = response.data;
      }
      catch (error) {

        console.log(error);
        console.error("Ошибка при загрузке данных:", error);
      }
    },
    onSearchChange() {
      this.getData();
    },
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
      this.getData();
    },
    async editData(id, value, upper_value, lower_value, model_structure, note, data_set) {
      try {
        const response = await this.$http.put(`result/${id}/`, {
          value,
          upper_value,
          lower_value,
          model_structure,
          note,
          data_set,
        }, {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        console.log('Response:', response.data);
        this.getData();
      } catch (error) {
        console.error('Error saving data:', error);
      }
    },

    edit_item(id, new_value, new_upper_value, new_lower_value, new_model_structure_id, new_note, data_set) {
      console.log('Editing item:', id, new_value, new_upper_value, new_lower_value, new_model_structure_id, new_note, data_set);
      this.editData(id, new_value, new_upper_value, new_lower_value, new_model_structure_id, new_note, data_set);
      this.refresh();
    },

    refresh() {
      setTimeout(() => { this.getData(); }, 500);
    },

    confirmDelete(id) {
      this.pendingDeleteId = id;
    },
    deleteConfirmed() {
      if (this.pendingDeleteId !== null) {
        this.deleteData(this.pendingDeleteId);
        this.pendingDeleteId = null;
      }
    },
    cancelDelete() {
      this.pendingDeleteId = null;
    },
    async deleteData(id) {
      try {
        this.deletedItem = this.items.find(item => item.id === id);
        await this.$http.delete("result/" + id + '/', {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        this.getData();
        this.showUndoButton = true;
      } catch (error) {
        console.log(error);
        console.error("Ошибка при удалении данных:", error);
      }
    },
    delete_item(id) {
      console.log('Удаление элемента с id:', id);
      this.deleteData(id);
    },
    restoreDeletedItem() {
      if (this.deletedItem) {

        this.items.push(this.deletedItem);
        this.deletedItem = null;
        this.showUndoButton = false;
      }

    },


    async addItem(item) {

      try {

        const newItem = {
          ...(item.value !== null && { value: item.value }),
          ...(item.upper_value !== null && { upper_value: item.upper_value }),
          ...(item.lower_value !== null && { lower_value: item.lower_value }),

          model_structure: item.name_model_structure,
          clinical_case: item.clinical_case,
          data_set: item.data_set,
          ...(item.note !== "" && { note: item.note }),
        };
        console.log("Отправляемые данные:", newItem);
        await this.$http.post("result/", newItem, {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        this.getData();
        this.showAddForm = false;
      } catch (error) {
        console.error("Ошибка при добавлении:", error.response ? error.response.data : error.message);
      }
    },
    cancelAdd() {
      this.showAddForm = false;
    },
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
    },
    mounted() {
      this.getData();
    },



  },
  created() {
    this.getData()
  },
  computed: {
    logged_out: function () {
      return localStorage.access_token == null
    }
  }


};
</script>

<style scoped>
.styled-table th:nth-child(1),
.styled-table td:nth-child(1) {
  width: 20%;
}

.styled-table th:nth-child(2),
.styled-table td:nth-child(2) {
  width: 20%;
}

.styled-table th:nth-child(3),
.styled-table td:nth-child(3) {
  width: 15%;
}

.styled-table th:nth-child(4),
.styled-table td:nth-child(4) {
  width: 30%;
}

.styled-table th:nth-child(5),
.styled-table td:nth-child(5) {
  width: 20%;
}
</style>
