<template>
<div>
    <!-- Модальное окно -->
    <div class="modal-overlay">
      <div class="modal">
        <h2>Редактировать элемент</h2>
        <form id="EditForm">
          <label for="age">Возраст</label>
          <input type="number" id="age" v-model.lazy.trim="new_age" placeholder="Возраст" />

          <label for="age_min">Минимальный возраст</label>
          <input type="number" id="age_min" v-model.lazy.trim="new_age_min" placeholder="Минимальный возраст" />

          <label for="age_max">Максимальный возраст</label>
          <input type="number" id="age_max" v-model.lazy.trim="new_age_max" placeholder="Максимальный возраст" />

          <label for="quantity">Количество *</label>
          <input type="number" id="quantity" v-model.lazy.trim="new_quantity" placeholder="Количество" required/>

          <label for="genderSelect">Пол</label>
          <select class="styled-select" id="genderSelect" v-model="new_gender_display">
              <option value="" disabled>Выберите пол</option>
              <option value="1">Мужской</option>
              <option value="2">Женский</option>
              <option value="3">Другой</option>
              <option value="0">Неизвестно</option>
          </select>

          <label for="diagnosisSelect">Диагноз</label>
          <select class="styled-select" id="diagnosisSelect" v-model="selectedDiagnosis">
            <option v-for="diagnosis in diagnosis_arr" :key="diagnosis.id" :value="diagnosis.id">
              {{ diagnosis.code }}
            </option>
          </select>

          <label for="refinedDiagnosis">Уточненный диагноз</label>
          <textarea id="refinedDiagnosis" v-model.lazy.trim="new_refined_diagnosis" placeholder="Уточненный диагноз" rows="2"></textarea>

          <label for="locationSelect">Локализация *</label>
          <select class="styled-select" id="locationSelect" v-model="selectedLocation" required>
            <option v-for="location in spec_location_arr" :key="location.id" :value="location.id">
              {{ location.name }}
            </option>
          </select>



          <label for="stageSelect">Стадия</label>
          <select class="styled-select" id="stageSelect" v-model="selectedStage">
            <option v-for="stage in stage_arr" :key="stage.id" :value="stage.id">
              {{ stage.name }}
            </option>
          </select>

          <label for="riskGroupSelect">Группа риска</label>
          <select class="styled-select" id="riskGroupSelect" v-model="selectedRiskGroup">
            <option v-for="riskGroup in risk_group_arr" :key="riskGroup.id" :value="riskGroup.id">
              {{ riskGroup.name }}
            </option>
          </select>

          <label for="radiationTherapyTypeSelect">Вид лучевой терапии *</label>
          <select class="styled-select" id="radiationTherapyTypeSelect" v-model="selectedRadiationTherapyType" required>
            <option v-for="therapyType in radiation_therapy_type_arr" :key="therapyType.id" :value="therapyType.id">
              {{ therapyType.name }}
            </option>
          </select>

          <label for="tumorSelect">Опухоль</label>
          <select class="styled-select" id="tumorSelect" v-model="selectedTumor">
            <option v-for="tumor in tumor_arr" :key="tumor.id" :value="tumor.id">
              {{ tumor.short_name }}
            </option>
          </select>

          <label for="nodeSelect">Узел</label>
          <select class="styled-select" id="nodeSelect" v-model="selectedNode">
            <option v-for="node in node_arr" :key="node.id" :value="node.id">
              {{ node.short_name }}
            </option>
          </select>

          <label for="metastasisSelect">Метастазы</label>
          <select class="styled-select" id="metastasisSelect" v-model="selectedMetastasis">
            <option v-for="metastasis in metastasis_arr" :key="metastasis.id" :value="metastasis.id">
              {{ metastasis.short_name }}
            </option>
          </select>

          <label for="histologySelect">Гистология</label>
          <select class="styled-select" id="histologySelect" v-model="selectedHistology">
            <option v-for="histology in histology_arr" :key="histology.id" :value="histology.id">
              {{ histology.name }}
            </option>
          </select>

          <label for="gradeSelect">Степень</label>
          <select class="styled-select" id="gradeSelect" v-model="selectedGrade">
            <option v-for="grade in grade_arr" :key="grade.id" :value="grade.id">
              {{ grade.name }}
            </option>
          </select>

          <label for="number_of_fractions">Количество фракций</label>
          <input type="number" id="number_of_fractions" v-model.lazy.trim="new_number_of_fractions" placeholder="Количество фракций" />

          <label for="single_dose">Разовая доза</label>
          <input type="number" id="single_dose" v-model.lazy.trim="new_single_dose" placeholder="Разовая доза" />

          <label for="treatment_duration">Длительность лечения</label>
          <input type="text" id="treatment_duration" v-model.lazy.trim="new_treatment_duration" placeholder="Длительность лечения" />

          <label for="note">Заметка</label>
          <textarea id="note" v-model.lazy.trim="new_note" placeholder="Заметка" rows="4"></textarea>


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
    age: {
      type: Number,

    },
    age_min: {
      type: Number,

    },
    age_max: {
      type: Number,

    },
    quantity: {
      type: Number,
      required: true,

    },
    gender_display: {
      type: String,

    },
    diagnosis: {
      type: String,

    },
    refined_diagnosis: {
      type: String,

    },
    name_location: {
      type: String,
      required: true,

    },

    name_stage: {
      type: String,

    },
    name_risk_group: {
      type: String,

    },
    name_radiation_therapy_type: {
      type: String,
      required: true,
    },
    name_tumor: {
      type: String,

    },
    name_node: {
      type: String,

    },
    name_metastasis: {
      type: String,

    },
    name_histology: {
      type: String,

    },
    name_grade: {
      type: String,

    },
    number_of_fractions: {
      type: Number,

    },
    single_dose: {
      type: Number,

    },
    treatment_duration: {
      type: Number,

    },
    note: {
      type: String,

    },
    diagnosis_arr: {
      type: Array,

    },
    spec_location_arr: {
      type: Array,

    },

    stage_arr: {
      type: Array,

    },
    risk_group_arr: {
      type: Array,

    },
    radiation_therapy_type_arr: {
      type: Array,

    },
    tumor_arr: {
      type: Array,

    },
    node_arr: {
      type: Array,

    },
    metastasis_arr: {
      type: Array,

    },
    histology_arr: {
      type: Array,

    },
    grade_arr: {
      type: Array,

    },
  },
  data() {
    return {
      selectedLocation: null,
        selectedDiagnosis: null,
        selectedRefinedDiagnosis: null,

        selectedStage: null,
        selectedRiskGroup: null,
        selectedRadiationTherapyType: null,
        selectedTumor: null,
        selectedNode: null,
        selectedMetastasis: null,
        selectedHistology: null,
        selectedGrade: null,


        new_age: this.age || null,
        new_age_min: this.age_min || null,
        new_age_max: this.age_max || null,
        new_quantity: this.quantity || null,
        new_gender_display: this.gender_display || '',
        new_number_of_fractions: this.number_of_fractions || null,
        new_single_dose: this.single_dose || null,
        new_treatment_duration: this.treatment_duration || null,


        new_refined_diagnosis: this.refined_diagnosis || '',
        new_note: '',


    };
  },
  emits: ['edit_item', 'cancel_edit', 'delete_item'],
  methods: {

    onSave() {
      this.$emit('edit_item', this.id,
                            this.new_age,
                            this.new_age_min,
                            this.new_age_max,
                            this.new_quantity,
                            this.new_gender_display,
                            this.selectedDiagnosis,
                            this.selectedRefinedDiagnosis,
                            this.selectedLocation,

                            this.selectedStage,
                            this.selectedRiskGroup,
                            this.selectedRadiationTherapyType,
                            this.selectedTumor,
                            this.selectedNode,
                            this.selectedMetastasis,
                            this.selectedHistology,
                            this.selectedGrade,
                            this.new_number_of_fractions,
                            this.new_single_dose,
                            this.new_treatment_duration,
                            this.new_note
                        );
                    },
    onCancel() {
      this.$emit('cancel_edit');

    },
  },

  mounted() {
    const foundLocation = this.spec_location_arr.find(location => location.name === this.name_location);
    this.selectedLocation = foundLocation ? foundLocation.id : null;

    const foundDiagnosis = this.diagnosis_arr.find(diagnosis => diagnosis.code === this.diagnosis);
    this.selectedDiagnosis = foundDiagnosis ? foundDiagnosis.id : null;

    this.new_gender_display = this.gender_display;

    

    const foundStage = this.stage_arr.find(stage => stage.name === this.name_stage);
    this.selectedStage = foundStage ? foundStage.id : null;

    const foundRiskGroup = this.risk_group_arr.find(riskGroup => riskGroup.name === this.name_risk_group);
    this.selectedRiskGroup = foundRiskGroup ? foundRiskGroup.id : null;

    const foundRadiationTherapyType = this.radiation_therapy_type_arr.find(type => type.name === this.name_radiation_therapy_type);
    this.selectedRadiationTherapyType = foundRadiationTherapyType ? foundRadiationTherapyType.id : null;

    const foundTumor = this.tumor_arr.find(tumor => tumor.short_name === this.name_tumor);
    this.selectedTumor = foundTumor ? foundTumor.id : null;

    const foundNode = this.node_arr.find(node => node.short_name === this.name_node);
    this.selectedNode = foundNode ? foundNode.id : null;

    const foundMetastasis = this.metastasis_arr.find(metastasis => metastasis.short_name === this.name_metastasis);
    this.selectedMetastasis = foundMetastasis ? foundMetastasis.id : null;

    const foundHistology = this.histology_arr.find(histology => histology.name === this.name_histology);
    this.selectedHistology = foundHistology ? foundHistology.id : null;

    const foundGrade = this.grade_arr.find(grade => grade.name === this.name_grade);
    this.selectedGrade = foundGrade ? foundGrade.id : null;
}
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  }

  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    max-height: 80vh; /* Максимальная высота 80% от высоты окна браузера */
    overflow-y: auto; /* Включает вертикальную прокрутку */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

</style>
