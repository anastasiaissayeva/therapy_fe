<template>

  <!--<RouterLink :to="'/petsbreedslist/' + id" class="p-name">{{ name }}</RouterLink> -->
  <div v-if='!edit_mode'>
    <div class="card">
      <h3 class="card-title">Клинический случай {{ id }}</h3>
      <div class="card-content">
        <p><strong>Возраст:</strong> {{ age }} ({{ age_min }} - {{ age_max }})</p>
        <p><strong>Количество:</strong> {{ quantity }}</p>
        <p><strong>Пол:</strong> {{ gender_display }}</p>
        <p><strong>Диагноз:</strong> {{ text_diagnosis }}</p>
        <p><strong>Подробный диагноз:</strong> {{ refined_diagnosis }}</p>
        <p><strong>Локализация:</strong> {{ text_location }}</p>
        <p><strong>Стадия:</strong> {{ name_stage }}</p>
        <p><strong>Группа риска:</strong> {{ name_risk_group }}</p>
        <p><strong>Тип лучевой терапии:</strong> {{ name_radiation_therapy_type }}</p>
        <p><strong>TNM: </strong> {{ name_tumor }} {{ name_node }} {{ name_metastasis }}</p>
        <p><strong>Гистология:</strong> {{ name_histology }}</p>
        <p><strong>Степень:</strong> {{ name_grade }}</p>
        <p><strong>Количество фракций:</strong> {{ number_of_fractions }}</p>
        <p><strong>Разовая доза:</strong> {{ single_dose }}</p>
        <p><strong>Длительность лечения:</strong> {{ treatment_duration }}</p>
        <p><strong>Заметка:</strong> {{ note }}</p>
      </div>

      <div class="button-group">
        <button type="but" title="Добавить источник" @click="openModal">
          Посмотреть/добавить источник
        </button>

        <button type="but" title="Добавить результат" @click="openModal2">
          Посмотреть/добавить результат
        </button>

        <button type="but" title="Добавить осложнение" @click="openModal3">
          Посмотреть/добавить осложнение
        </button>
      </div>

      <div class="button-group">
        <button type="but" title="Редактировать" @click="onEdit" class="edit-button">
          <img alt="Редактировать" class="logo" src="@/assets/free-icon-pencil-650143.png" width="20" height="20" />
        </button>

        <button type="but" title="Удалить" @click="onDelete" class="delete-button">
          <img alt="Удалить" class="logo" src="@/assets/free-icon-delete-1214428.png" width="20" height="20" />
        </button>
      </div>






    </div>
    <div v-if="showDataSetModal" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">×</button>
        <DataSetTable :selected_clinical_case_id='this.id' @close="closeModal" />
      </div>
    </div>

    <div v-if="showResultModal" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" @click="closeResultModal">×</button>
        <ResultTable :selected_clinical_case_id="id" :model_structures="modelStructures" @close="closeResultModal" />
      </div>
    </div>

    <div v-if="showComplicationCCModal" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" @click="closeComplicationCCModal">×</button>
        <ComplicationCCTable :selected_clinical_case_id='this.id' @close="closeModal" />
      </div>
    </div>
  </div>

  <clinical-case-edit-form v-else :id='this.id' :age="this.age" :age_min="this.age_min" :age_max="this.age_max"
    :quantity="this.quantity" :gender_display="this.gender_display" :name_diagnosis="this.name_diagnosis"
    :refined_diagnosis="this.refined_diagnosis" :name_location="this.name_location" :name_stage="this.name_stage"
    :name_risk_group="this.name_risk_group" :name_radiation_therapy_type="this.name_radiation_therapy_type"
    :name_tumor="this.name_tumor" :name_node="this.name_node" :name_metastasis="this.name_metastasis"
    :name_histology="this.name_histology" :name_grade="this.name_grade" :number_of_fractions="this.number_of_fractions"
    :single_dose="this.single_dose" :treatment_duration="this.treatment_duration" :note="this.note"
    @edit_item="edit_item" @cancel_edit="cancel_edit" />



</template>


<script>
import ClinicalCaseEditForm from './ClinicalCaseEditForm.vue';
import DataSetTable from './DataSetTable.vue';
import ResultTable from './ResultTable.vue';
import ComplicationCCTable from './ComplicationCCTable.vue';

export default {
  components: {
    ClinicalCaseEditForm,
    DataSetTable,
    ResultTable,
    ComplicationCCTable
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    age: { type: Number, },
    age_min: { type: Number, },
    age_max: { type: Number, },
    quantity: { type: Number, required: true, },
    gender_display: { type: String, },
    name_diagnosis: { type: String, },
    refined_diagnosis: { type: String, },
    name_location: { type: String, required: true, },

    name_stage: { type: String, },
    name_risk_group: { type: String, },
    name_radiation_therapy_type: { type: String, required: true, },
    name_tumor: { type: String, },
    name_node: { type: String, },
    name_metastasis: { type: String, },
    name_histology: { type: String, },
    name_grade: { type: String, },

    text_diagnosis: { type: String, },
    text_location: { type: String, },

    text_stage: { type: String, },
    text_risk_group: { type: String, },
    text_radiation_therapy_type: { type: String, },
    text_tumor: { type: String, },
    text_node: { type: String, },
    text_metastasis: { type: String, },
    text_histology: { type: String, },
    text_grade: { type: String, },

    number_of_fractions: { type: Number, },
    single_dose: { type: Number, },
    treatment_duration: { type: Number, },
    note: { type: String, },
  },
  data() {
    return {
      edit_mode: false,
      showDataSetModal: false,
      showComplicationCCModal: false,
      showResultModal: false,
      selectedDataSetId: null,
      modelStructures: []
    }
  },
  methods: {
    openModal() {
      this.showDataSetModal = true;
    },
    closeModal() {
      this.showDataSetModal = false;
    },
    openModal2() {
      this.showResultModal = true;
    },
    closeResultModal() {
      this.showResultModal = false;
    },
    openModal3() {
      this.showComplicationCCModal = true;
    },
    closeComplicationCCModal() {
      this.showComplicationCCModal = false;
    },
    onEdit() {
      this.edit_mode = true;
    },
    edit_item(id, age, age_min, age_max, quantity, gender_display, name_diagnosis, refined_diagnosis, name_location, name_stage, name_risk_group, name_radiation_therapy_type, name_tumor, name_node, name_metastasis, name_histology, name_grade, number_of_fractions, single_dose, treatment_duration, note) {
      this.$emit("edit_item", id, age, age_min, age_max, quantity, gender_display, name_diagnosis, refined_diagnosis, name_location, name_stage, name_risk_group, name_radiation_therapy_type, name_tumor, name_node, name_metastasis, name_histology, name_grade, number_of_fractions, single_dose, treatment_duration, note);
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
.card {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  margin: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
  width: 400px;
  /* Ширина карточки */
  position: relative;
  /* Для эффекта */
  z-index: 1;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.card-title {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
}

.card-content p {
  margin: 5px 0;
  color: #555;
}

strong {
  font-weight: bold;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 8px;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 5px;
  right: 10px;
  background: transparent;
  font-size: 24px;
  border: none;
  cursor: pointer;
}
</style>
