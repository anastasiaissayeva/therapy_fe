<template>
    <div class="add-item-form" v-if="showForm">
        <div class="modal-overlay">
            <div class="modal">
                <h2>Создать новый элемент</h2>
                <form @submit.prevent="onAdd">

                    <label for="data_set">Выберите набор данных</label>
                    <select class="styled-select" id="data_set" v-model="local_data_set_id" required>
                        <option v-for="dataSet in data_sets" :key="dataSet.id" :value="dataSet.id">
                            {{ dataSet.name_source }}
                        </option>
                    </select>

                    <select class="styled-select" v-model="selected_model_structure" required>
                        <option v-for="model_structure in model_structures" :key="model_structure.id"
                            :value="model_structure.id">
                            Модель: {{ model_structure.name_model_name }}
                            Параметр: {{ model_structure.name_parameter }} ({{ model_structure.name_unit }})
                        </option>
                    </select>

                    <label for="value">Значение</label>
                    <input type="number" id="value" v-model.lazy.trim="new_value" placeholder="Значение" step="0.01" />

                    <label for="lower_value">Нижняя граница</label>
                    <input type="number" id="lower_value" v-model.lazy.trim="new_lower_value"
                        placeholder="Нижняя граница" step="0.01" />

                    <label for="upper_value">Верхняя граница</label>
                    <input type="number" id="upper_value" v-model.lazy.trim="new_upper_value"
                        placeholder="Верхняя граница" step="0.01" />

                    <textarea v-model.lazy.trim="new_note" placeholder="Введите заметку"></textarea>

                    <div class="button-group">
                        <button type="submit" title="Добавить" class="btn add-btn">Добавить</button>
                        <button type="button" title="Отменить" class="btn cancel-btn"
                            @click="onCancel">Отменить</button>
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
        model_structures: {
            type: Array,
        },
        selected_clinical_case_id: {
            type: Number,
        },
        data_sets: {
            type: Array,
        }
    },
    data() {
        return {
            new_upper_value: null,
            new_lower_value: null,
            new_value: null,
            selected_model_structure: null,
            new_note: '',
            local_data_set_id: null,
        };
    },
    mounted() {
        console.log('Data sets:', this.data_sets);
        this.local_data_set_id = this.data_set_id;
    },
    methods: {
        onAdd() {
            if (this.selected_model_structure) {
                this.$emit('add_item', {
                    upper_value: this.new_upper_value || null,
                    lower_value: this.new_lower_value || null,
                    value: this.new_value || null,
                    name_model_structure: this.selected_model_structure,
                    note: this.new_note || "",
                    clinical_case: this.selected_clinical_case_id,
                    data_set: this.local_data_set_id,
                    name_source: this.getSelectedDataSetName(),
                });
                this.resetForm();
            } else {
                alert('Пожалуйста, выберите подходящую структуру.');
            }
        },
        onCancel() {
            this.resetForm();
            this.$emit('cancel_add');
        },
        resetForm() {
            this.new_upper_value = null;
            this.new_lower_value = null;
            this.new_value = null;
            this.selected_model_structure = null;
            this.new_note = '';
            this.local_data_set_id = null;
        },
        getSelectedDataSetName() {
            const selectedDataSet = this.data_sets.find(dataSet => dataSet.id === this.local_data_set_id);
            return selectedDataSet ? selectedDataSet.name_source : null;
        }
    }
};
</script>





<style scoped></style>
