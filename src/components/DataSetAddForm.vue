<template>
    <div class="add-item-form" v-if="showForm">
        <div class="modal-overlay">
            <div class="modal">
                <h2>Создать новый элемент</h2>
                <form @submit.prevent="onAdd">

                    <input type="text" v-model="searchQuery" placeholder="Поиск источника..." class="search-input" />
                    <select class="styled-select" v-model="selected_source">
                        <option v-for="source in filteredSources" :key="source.id" :value="source.id">
                            {{ source.name }}
                        </option>
                    </select>
                    <textarea v-model.lazy.trim="new_note" placeholder="Введите заметку"></textarea>
                    <div class="button-group">
                        <button type="submit" title="Добавить" class="btn add-btn">
                            Добавить
                        </button>
                        <button type="button" title="Отменить" class="btn cancel-btn" @click="onCancel">
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


        // clinical_cases: {
        //     type: Array,

        // },
        clinical_case_id: {
            type: Number,
            required: true
        },
        sources: {
            type: Array,

        }
    },
    data() {
        return {
            searchQuery: '',
            selected_source: null,
            new_note: ''
        };
    },
    computed: {
        filteredSources() {
            if (!this.searchQuery) return this.sources;
            const q = this.searchQuery.toLowerCase();
            return this.sources.filter(source => source.name.toLowerCase().includes(q));
        },
    },
    methods: {
        onAdd() {

            this.$emit('add_item', {
                clinical_case_id: this.clinical_case_id,
                // name_clinical_case: this.selected_clinical_case,
                name_source: this.selected_source,
                note: this.new_note
            });
            this.resetForm();

        },
        onCancel() {
            this.resetForm();
            this.$emit('cancel_add');
        },
        resetForm() {


            // this.selected_clinical_case= null;
            this.selected_source = null;
            this.new_note = '';
        }
    }
};
</script>

<style scoped>
.search-input {
    width: 100%;
    padding: 5px 8px;
    margin-bottom: 8px;
    box-sizing: border-box;
}
</style>
