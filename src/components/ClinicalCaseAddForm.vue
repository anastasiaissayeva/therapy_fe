<template>
  <div class="add-item-form" v-if="showForm">
    <div class="modal-overlay">
      <div class="modal">
        <h2>Создать новый элемент</h2>
    <form @submit.prevent="onAdd">
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
              {{ tumor.name }}
            </option>
          </select>

          <label for="nodeSelect">Узел</label>
          <select class="styled-select" id="nodeSelect" v-model="selectedNode">
            <option v-for="node in node_arr" :key="node.id" :value="node.id">
              {{ node.name }}
            </option>
          </select>

          <label for="metastasisSelect">Метастазы</label>
          <select class="styled-select" id="metastasisSelect" v-model="selectedMetastasis">
            <option v-for="metastasis in metastasis_arr" :key="metastasis.id" :value="metastasis.id">
              {{ metastasis.name }}
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

        }
    },
    data() {
        return {
          new_age: null,
          new_age_min: null,
          new_age_max: null,
          new_quantity: null,
          new_gender_display: null,
          new_refined_diagnosis: '',
          selectedLocation: null,
          selectedDiagnosis: null,

          selectedStage: null,
          selectedRiskGroup: null,
          selectedRadiationTherapyType: null,
          selectedTumor: null,
          selectedNode: null,
          selectedMetastasis: null,
          selectedHistology: null,
          selectedGrade: null,
          new_number_of_fractions: null,
          new_single_dose: null,
          new_treatment_duration: '',
          new_note: ''
        };
    },
    methods: {
      onAdd() {
            const itemData = {
                age: this.new_age || null,
                age_min: this.new_age_min || null,
                age_max: this.new_age_max || null,
                quantity: this.new_quantity || 1,
                gender_display: this.new_gender_display || null,
                diagnosis: this.selectedDiagnosis || null,
                refined_diagnosis: this.new_refined_diagnosis || null,
                spec_location: this.selectedLocation || null,

                stage: this.selectedStage || null,
                risk_group: this.selectedRiskGroup || null,
                radiation_therapy_type: this.selectedRadiationTherapyType || null,
                tumor: this.selectedTumor || null,
                node: this.selectedNode || null,
                metastasis: this.selectedMetastasis || null,
                histology: this.selectedHistology || null,
                grade: this.selectedGrade || null,
                number_of_fractions: this.new_number_of_fractions || null,
                single_dose: this.new_single_dose || null,
                treatment_duration: this.new_treatment_duration || null,
                note: this.new_note || ''

              };

            if (this.selectedRadiationTherapyType && this.selectedLocation && this.new_quantity) {
                this.$emit('add_item', itemData);
                console.log('Отправляемые данные:', itemData);
                this.resetForm();
            } else {
                console.log('Ошибка: Не все обязательные поля заполнены');
                console.log('Отправляемые данные:', itemData);
            }
        },
        onCancel() {
            this.resetForm();
            this.$emit('cancel_add');
        },
        resetForm() {
          this.new_age = null;
          this.new_age_min = null;
          this.new_age_max = null;
          this.new_quantity = null;
          this.new_gender_display = null;
          this.new_refined_diagnosis = '';
          this.selectedLocation = null;
          this.selectedDiagnosis = null;
          
          this.selectedStage = null;
          this.selectedRiskGroup = null;
          this.selectedRadiationTherapyType = null;
          this.selectedTumor = null;
          this.selectedNode = null;
          this.selectedMetastasis = null;
          this.selectedHistology = null;
          this.selectedGrade = null;
          this.new_number_of_fractions = null;
          this.new_single_dose = null;
          this.new_treatment_duration = '';
          this.new_note = '';
        }
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
    width: 500px;
    max-height: 80vh; /* Максимальная высота 80% от высоты окна браузера */
    overflow-y: auto; /* Включает вертикальную прокрутку */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }


</style>
