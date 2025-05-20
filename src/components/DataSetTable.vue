<template>
    <div class="sidebar">
        <h1 class="sidebar-title">
            Источники
        </h1>
        <input v-model="searchQuery" @input="onSearchChange" placeholder="Поиск..." />
        <table class="styled-table">
            <thead>
                <tr>
                    <th @click="sort('source')">Источник</th>
                    <th>Ссылка</th>
                    <th @click="sort('note')">Заметка</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                <data-set-component v-for="item in items" :key="item.id" :id='item.id' :name_source="item.name_source"
                    :url_source="item.url_source" :clinical_case_id="selected_clinical_case_id" :sources="sources"
                    :source="item.source" :note="item.note" @edit_item="edit_item"
                    @delete_item="confirmDelete(item.id)" />
            </tbody>


        </table>

        <button @click="toggleAddForm" class="add-button">
            Добавить
        </button>

        <data-set-add-form v-if="showAddForm" @add_item="addItem" @cancel_add="cancelAdd"
            :clinical_case_id="selected_clinical_case_id" :clinical_cases="clinical_cases" :sources="sources" />

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

import DataSetAddForm from './DataSetAddForm.vue';
import DataSetComponent from './DataSetComponent.vue';
export default {
    components: {
        DataSetComponent,
        DataSetAddForm,
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

            clinical_cases: [],
            sources: [],
            searchQuery: '', sortKey: '', sortOrder: 'asc',
        };
    },
    methods: {

        // async getClinical_сases() {
        //     try {
        //         const response = await this.$http.get("clinical-case/", {
        //             headers: { authorization: `Bearer ${localStorage.access_token}` },
        //         });
        //         this.clinical_cases = response.data;
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
        async getSources() {
            try {
                const response = await this.$http.get("source/", {
                    headers: { authorization: `Bearer ${localStorage.access_token}` },
                });
                this.sources = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getData() {

            // await this.getClinical_сases();
            await this.getSources();
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
                const response = await this.$http.get(`dataset/?${params.toString()}`,
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

        async editData(id, name_clinical_case_id, source, note) {
            try {
                const response = await this.$http.put(`dataset/${id}/`, {

                    clinical_case: name_clinical_case_id,
                    source: source,
                    note: note
                }, {
                    headers: { authorization: `Bearer ${localStorage.access_token}` },
                });
                console.log('Response:', response.data);
                this.getData();
            } catch (error) {
                console.error('Error saving data:', error);
            }
        },

        edit_item(id, new_clinical_case_id, new_source_id, new_note) {
            console.log('Editing item:', id, new_clinical_case_id, new_source_id, new_note);
            this.editData(id, new_clinical_case_id, new_source_id, new_note);
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
                await this.$http.delete("dataset/" + id + '/', {
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

                    clinical_case: this.selected_clinical_case_id,
                    source: item.name_source,
                    note: item.note,
                };

                await this.$http.post("dataset/", newItem, {
                    headers: {
                        authorization: `Bearer ${localStorage.access_token}`,
                    },
                });
                this.getData();
                this.showAddForm = false;
            } catch (error) {
                console.error("Ошибка при добавлении:", error);
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
    width: 80%;
}

.styled-table th:nth-child(2),
.styled-table td:nth-child(2) {
    width: 10%;
}

.styled-table th:nth-child(3),
.styled-table td:nth-child(3) {
    width: 10%;
}
</style>
